// Adapted from https://github.com/chhoumann/quickadd/blob/master/src/gui/UpdateModal/UpdateModal.ts

/// <reference types="bun-types" />

import fundingText from "@/texts/Funding.md" with { type: "text" };
import updateNotice from "@/texts/UpdateNotice.md" with { type: "text" };
import { type App, Component } from "obsidian";
import { MarkdownRenderer, Modal } from "obsidian";

type Release = {
	tag_name: string;
	body: string;
	draft: boolean;
	prerelease: boolean;
};

/**
 * Fetches the releases for a repository on GitHub and returns the release notes for every release
 * that comes after a specific release.
 *
 * @param repoOwner The owner of the repository.
 * @param repoName The name of the repository.
 * @param releaseTagName The tag name of the release to start getting release notes from.
 * @returns An array of Release objects, each containing the tag name and release notes for a single release.
 * @throws An error if there was an error fetching the releases or if the release with the specified tag name
 *         could not be found.
 */
async function getReleaseNotesAfter(
	repoOwner: string,
	repoName: string,
	releaseTagName: string | null,
): Promise<Release[]> {
	const response = await fetch(
		`https://api.github.com/repos/${repoOwner}/${repoName}/releases`,
	);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const releases: Release[] | { message: string } = await response.json();

	if ((!response.ok && "message" in releases) || !Array.isArray(releases)) {
		throw new Error(
			`Failed to fetch releases: ${releases.message ?? "Unknown error"}`,
		);
	}

	// If releaseTagName is null show all release notes
	if (releaseTagName == null) {
		return releases.filter((release) => !release.draft && !release.prerelease);
	}

	const startReleaseIdx = releases.findIndex(
		(release) => release.tag_name === releaseTagName,
	);

	if (startReleaseIdx === -1) {
		throw new Error(`Could not find release with tag ${releaseTagName}`);
	}

	return releases
		.slice(0, startReleaseIdx)
		.filter((release) => !release.draft && !release.prerelease);
}

export class UpdateModal extends Modal {
	releases: Release[] = [];
	previousQAVersion: string;

	constructor(app: App, previousQAVersion: string) {
		super(app);
		this.previousQAVersion = previousQAVersion;
	}

	private fetchReleaseNotes() {
		getReleaseNotesAfter(
			"davisriedel",
			"obsidian-typewriter-mode",
			this.previousQAVersion,
		)
			.then((releases) => {
				this.releases = releases;

				if (this.releases.length === 0) {
					this.close();
					return;
				}

				this.display();
			})
			.catch((err) => {
				console.error(`Failed to fetch release notes: ${err as string}`);
				this.close();
			});
	}

	override onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl("h1", {
			text: "Fetching release notes...",
		});

		this.fetchReleaseNotes();
	}

	override onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}

	private display(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.classList.add("ptm-update-modal-container");
		const contentDiv = contentEl.createDiv("ptm-update-modal");

		const releaseNotes = this.releases
			.map((release) => `### ${release.tag_name}\n\n${release.body}`)
			.join("\n---\n");

		const markdownStr = updateNotice
			.replace("{{tag_name}}", this.releases[0].tag_name)
			.replace("{{funding}}", fundingText)
			.replace("{{release_notes}}", releaseNotes);

		MarkdownRenderer.render(
			this.app,
			markdownStr,
			contentDiv,
			this.app.vault.getRoot().path,
			new Component(),
		);
	}
}
