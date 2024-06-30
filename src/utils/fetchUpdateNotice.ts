export async function fetchUpdateNotice() {
	const response = await fetch(
		"https://raw.githubusercontent.com/davisriedel/obsidian-typewriter-mode/main/src/UpdateNotice.md",
	);
	return await response.text();
}
