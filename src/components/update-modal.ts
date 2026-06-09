// Adapted from https://github.com/chhoumann/quickadd/blob/master/src/gui/UpdateModal/UpdateModal.ts

/// <reference types="bun-types" />

import {
  type App,
  Component,
  MarkdownRenderer,
  Modal,
  requestUrl,
} from "obsidian";
import fundingText from "@/texts/Funding.md" with { type: "text" };
import updateNotice from "@/texts/UpdateNotice.md" with { type: "text" };

interface Release {
  body: string;
  draft: boolean;
  prerelease: boolean;
  tag_name: string;
}

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
  includePreReleases: boolean
): Promise<Release[]> {
  const response = await requestUrl(
    `https://api.github.com/repos/${repoOwner}/${repoName}/releases`
  );
  const releases = response.json as Release[] | { message: string };

  if (!Array.isArray(releases)) {
    throw new Error(
      `Failed to fetch releases: ${"message" in releases ? releases.message : "Unknown error"}`
    );
  }

  // If releaseTagName is null show all release notes
  if (releaseTagName == null) {
    return releases.filter((release) => !(release.draft || release.prerelease));
  }

  const startReleaseIdx = releases.findIndex(
    (release) => release.tag_name === releaseTagName
  );

  if (startReleaseIdx === -1) {
    throw new Error(`Could not find release with tag ${releaseTagName}`);
  }

  return releases
    .slice(0, startReleaseIdx)
    .filter(
      (release) => !release.draft && (includePreReleases || !release.prerelease)
    );
}

export class UpdateModal extends Modal {
  private readonly currentVersion: string;
  private readonly previousVersion: string | null;

  constructor(
    app: App,
    currentVersion: string,
    previousVersion: string | null
  ) {
    super(app);
    this.currentVersion = currentVersion;
    this.previousVersion = previousVersion;
  }

  private fetchAndDisplayReleaseNotes() {
    const isCurrentVersionBeta = this.currentVersion.includes("-");
    getReleaseNotesAfter(
      "davisriedel",
      "obsidian-typewriter-mode",
      this.previousVersion,
      isCurrentVersionBeta // if the current version is a beta version, include pre-releases
    )
      .then((releases) => {
        if (releases.length === 0) {
          this.displayError(new Error("No new releases found"));
        } else {
          this.displayReleaseNotes(releases);
        }
      })
      .catch((err) => {
        this.displayError(err);
      });
  }

  override onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", {
      text: "Fetching release notes...",
    });

    this.fetchAndDisplayReleaseNotes();
  }

  private displayReleaseNotes(releases: Release[]): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.classList.add("ptm-update-modal");
    const contentDiv = contentEl.createDiv();

    const releaseNotes = releases
      .map((release) => `### ${release.tag_name}\n\n${release.body}`)
      .join("\n---\n");

    const markdownStr = updateNotice
      .replace("{{tag-name}}", releases[0].tag_name)
      .replace("{{funding}}", fundingText)
      .replace("{{release-notes}}", releaseNotes);

    const component = new Component();
    component.load();
    MarkdownRenderer.render(
      this.app,
      markdownStr,
      contentDiv,
      this.app.vault.getRoot().path,
      component
    ).catch((error) => {
      console.error("Failed to render markdown:", error);
    });
  }

  private displayError(error: Error): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.classList.add("ptm-update-modal");
    const contentDiv = contentEl.createDiv();

    contentDiv.createEl("h2", { text: error.message });
  }
}
