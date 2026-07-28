import { getLanguage as getObsidianLanguage } from "obsidian";

type Replacement = Record<string, string | number>;

/**
 * Typewriter Mode keeps English as the source language and follows Obsidian's
 * configured language for the translated UI. Unknown strings deliberately fall
 * back to English so a newly added setting never renders blank text.
 */
const ZH_CN: Record<string, string> = {
  Typewriter: "打字机模式",
  'Not available if "keep lines above and below" is activated':
    "启用“保持当前行上下行数”后不可用",
  "Not available if typewriter scrolling is activated":
    "启用打字机滚动后不可用",
  "Keep lines above and below": "保持当前行上下行数",
  "Highlight current line": "高亮当前行",
  "Highlights the line that the cursor is currently on": "高亮光标所在的行",
  "Limit line width": "限制行宽",
  Dimming: "淡化",
  "Writing focus": "专注写作",
  "Hemingway mode": "海明威模式",
  "Prevents editing previously written text. Blocks navigation keys (arrows, Home, End, Page Up/Down), Delete key, and undo operations to enforce forward-only writing.":
    "禁止编辑已经写过的文本。屏蔽方向键、Home、End、Page Up/Down、Delete 和撤销操作，以强制向前写作。",
  Hemingway: "海明威",
  "Update notice and funding": "更新提示与赞助",
  "Activate Typewriter Mode": "启用打字机模式",
  "This enables or disables all the features below.":
    "启用或停用下方的所有功能。",
  "Enable on platforms": "启用平台",
  "Select on which platforms Typewriter Mode should be active":
    "选择在哪些平台上启用打字机模式",
  "All platforms": "所有平台",
  "Desktop only": "仅桌面端",
  "Mobile only (tablet and phone)": "仅移动端（平板和手机）",
  "Tablet only": "仅平板",
  "Phone only": "仅手机",
  "Desktop and tablet": "桌面端和平板",
  "Only activate after first interaction": "首次交互后才启用",
  "Activate the focused line highlight and paragraph dimming only after the first interaction with the editor":
    "仅在首次与编辑器交互后启用当前行高亮和段落淡化",
  "Typewriter scrolling": "打字机滚动",
  "Typewriter offset": "打字机偏移",
  "Positions the typewriter line at the specified percentage of the screen":
    "将打字机行定位在屏幕指定的百分比位置",
  "Turns typewriter scrolling on or off": "开启或关闭打字机滚动",
  "Only maintain typewriter offset when reached": "仅在到达后保持打字机偏移",
  "The line that the cursor is on will not be scrolled to the center of the editor until it the specified typewriter offset is reached. This removes the additional space at the top of the editor.":
    "光标所在行在到达指定的打字机偏移前不会滚动到编辑器中央，从而移除编辑器顶部的额外空白。",
  "Do not snap typewriter with arrow keys": "使用方向键时不吸附打字机位置",
  "The typewriter will only snap when using this plugin's move commands. It will not snap when using the arrow keys. The move commands are by default Cmd/Ctrl+ArrowUp/ArrowDown, but you can assign your own hotkeys for the move commands in Obsidian's settings.":
    "仅使用本插件的移动命令时才吸附打字机位置，使用方向键时不会吸附。移动命令默认为 Cmd/Ctrl+向上键/向下键，也可以在 Obsidian 设置中为其指定自己的快捷键。",
  "Amount of lines above and below the current line": "当前行上下保留的行数",
  "The amount of lines to always keep above and below the current line":
    "始终在当前行上方和下方保留的行数",
  "When enabled, always keeps the specified amount of lines above and below the current line in view":
    "启用后，始终在视图中保留当前行上方和下方指定数量的行",
  "Dimming behavior in unfocused notes": "未聚焦笔记中的淡化行为",
  "How to dim paragraphs / sentences in notes / editors that your cursor is not on (e.g. if you have multiple notes open in split panes)":
    "如何淡化光标不在其中的笔记/编辑器里的段落或句子（例如打开了多个分屏笔记时）",
  "Do not dim anything": "不淡化任何内容",
  "Dim all but the previously focused paragraph / sentence":
    "淡化除上次聚焦段落/句子以外的所有内容",
  "Dim everything": "淡化全部内容",
  "Dim unfocused mode": "未聚焦淡化模式",
  "Choose to dim unfocused paragraphs or sentences":
    "选择淡化未聚焦的段落或句子",
  Paragraphs: "段落",
  Sentences: "句子",
  "Dim unfocused": "淡化未聚焦内容",
  "Dim unfocused paragraphs / sentences": "淡化未聚焦的段落/句子",
  "Opacity of dimmed elements": "淡化元素的不透明度",
  "The opacity of dimmed elements": "淡化元素的不透明度",
  "Highlight list parents": "高亮列表父项",
  "If this is enabled, the parent items of the active list item are not dimmed":
    "启用后，当前列表项的父项不会被淡化",
  "Undim all table cells when editing": "编辑时取消淡化表格中的所有单元格",
  "If this is enabled, all table cells are shown/not dimmed when you edit a table. If this is disabled, only the current table cell that you are editing is shown, while the other cells remain dimmed.":
    "启用后，编辑表格时显示所有单元格而不淡化。停用后，仅显示正在编辑的单元格，其他单元格保持淡化。",
  "Pause dimming while scrolling": "滚动时暂停淡化",
  "If this is enabled, paragraphs / sentences are not dimmed while scrolling":
    "启用后，滚动时不会淡化段落/句子",
  "Pause dimming while selecting text": "选择文本时暂停淡化",
  "If this is enabled, paragraphs / sentences are not dimmed while selecting text":
    "启用后，选择文本时不会淡化段落/句子",
  "Dim unfocused only in writing focus mode":
    "仅在专注写作模式下淡化未聚焦内容",
  "Only dim unfocused paragraphs / sentences when writing focus mode is active":
    "仅在专注写作模式启用时淡化未聚焦的段落/句子",
  "Highlight current line only in focused note": "仅在聚焦笔记中高亮当前行",
  "Only show highlighted line in the note your cursor is on (e.g. if you have multiple notes open in split panes)":
    "仅在光标所在的笔记中显示高亮行（例如打开了多个分屏笔记时）",
  "Highlight current line only in writing focus mode":
    "仅在专注写作模式下高亮当前行",
  "Only show the highlighted line when writing focus mode is active":
    "仅在专注写作模式启用时显示高亮行",
  "Pause current line highlight while scrolling": "滚动时暂停当前行高亮",
  "If enabled, the current line highlight is hidden while scrolling":
    "启用后，滚动时隐藏当前行高亮",
  "Pause current line highlight while selecting text":
    "选择文本时暂停当前行高亮",
  "If enabled, the current line highlight is hidden while selecting text":
    "启用后，选择文本时隐藏当前行高亮",
  "Fade lines": "淡化行",
  "This places a gradient on the lines above and below the current line, making the text fade out more and more towards the top and bottom of the editor.":
    "在当前行上下的行上添加渐变，使文本向编辑器顶部和底部逐渐淡出。",
  "Fade lines only in writing focus mode": "仅在专注写作模式下淡化行",
  "Only show the fade lines effect when writing focus mode is active":
    "仅在专注写作模式启用时显示淡化行效果",
  "Intensity of the fade lines gradient": "淡化行渐变强度",
  "How soon lines shall be faded out": "行开始淡出的速度",
  "Current line highlight style": "当前行高亮样式",
  "The style of the current line highlight": "当前行高亮的样式",
  Box: "方框",
  Underline: "下划线",
  "Current line underline thickness": "当前行下划线粗细",
  "The thickness of the underline that highlights the current line":
    "高亮当前行的下划线粗细",
  "Current line highlight color in {{theme}} themes":
    "{{theme}}主题中的当前行高亮颜色",
  "The color and opacity of the current line highlight in {{theme}} themes":
    "{{theme}}主题中的当前行高亮颜色和不透明度",
  light: "浅色",
  dark: "深色",
  "Limit maximum number of characters per line": "限制每行最大字符数",
  "Limits the maximum number of characters per line": "限制每行最大字符数",
  "Maximum number of characters per line": "每行最大字符数",
  "The maximum number of characters per line": "每行最大字符数",
  "Writing focus vignette": "专注写作暗角",
  "Add a vignette to the edges of the screen in writing focus":
    "在专注写作时为屏幕边缘添加暗角",
  "Writing focus vignette style": "专注写作暗角样式",
  "The style of the vignette in writing focus mode": "专注写作模式下暗角的样式",
  Column: "列",
  "Make Obsidian fullscreen in writing focus": "专注写作时让 Obsidian 全屏",
  "If enabled, the Obsidian window will toggle to fullscreen when entering writing focus":
    "启用后，进入专注写作时 Obsidian 窗口会切换为全屏",
  "Show header in writing focus": "专注写作时显示页眉",
  "If enabled, the header will be shown in writing focus":
    "启用后，专注写作时显示页眉",
  "Show status bar in writing focus": "专注写作时显示状态栏",
  "If enabled, the status bar will be shown in writing focus":
    "启用后，专注写作时显示状态栏",
  "Writing focus font size": "专注写作字体大小",
  "Custom font size in points for writing focus mode (0 = use default font size)":
    "专注写作模式的自定义字体大小（磅，0 = 使用默认字体大小）",
  "Hemingway mode only in writing focus mode":
    "仅在专注写作模式下启用海明威模式",
  "Only enforce Hemingway mode when writing focus mode is active":
    "仅在专注写作模式启用时强制使用海明威模式",
  "Allow using Backspace key in Hemingway mode": "海明威模式允许使用退格键",
  "Allows deleting text with Backspace when Hemingway mode is active. Useful for fixing typos while maintaining forward-only writing flow.":
    "海明威模式启用时允许使用退格键删除文本，适合在保持向前写作流程的同时修正错字。",
  "Show status bar indicator": "显示状态栏指示器",
  "Shows an indicator in the status bar when Hemingway mode is active.":
    "海明威模式启用时在状态栏显示指示器。",
  "Status bar text": "状态栏文本",
  "Text to display in the status bar when Hemingway mode is active.":
    "海明威模式启用时在状态栏显示的文本。",
  "Announce updates": "通知更新",
  "If enabled you will get a notice with release notes whenever you install a new version of Typewriter Mode":
    "启用后，每次安装新版本的打字机模式时都会收到包含发行说明的通知",
  "Restore cursor position": "恢复光标位置",
  "Restore the last cursor position when opening files":
    "打开文件时恢复上次的光标位置",
  "File paths": "文件路径",
  "Configure which files or folders the plugin is enabled or disabled in.":
    "配置在哪些文件或文件夹中启用或停用本插件。",
  Configure: "配置",
  "Enabled paths": "启用路径",
  "Only enable the plugin for these files or folders. If empty, the plugin is active in all files.":
    "仅在这些文件或文件夹中启用本插件。留空则在所有文件中启用。",
  "Disabled paths": "停用路径",
  "Always disable the plugin for these files or folders, overriding the enabled paths.":
    "始终在这些文件或文件夹中停用本插件，并覆盖启用路径设置。",
  "Type to search vault paths…": "输入以搜索仓库路径…",
  "No paths configured.": "尚未配置路径。",
  Remove: "移除",
  "Toggle Writing Focus": "切换专注写作",
  "Move typewriter up": "向上移动打字机位置",
  "Move typewriter down": "向下移动打字机位置",
  "Move typewriter {{direction}}": "向{{direction}}移动打字机位置",
  up: "上",
  down: "下",
  "Toggle {{command}}": "切换{{command}}",
  "Enable {{command}}": "启用{{command}}",
  "Disable {{command}}": "停用{{command}}",
  "typewriter mode plugin": "打字机模式插件",
  "typewriter scrolling": "打字机滚动",
  dimming: "淡化",
  "typewriter scrolling and paragraph dimming": "打字机滚动和段落淡化",
  "limit maximum characters per line": "限制每行最大字符数",
  "Fetching release notes...": "正在获取发行说明…",
  "No new releases found": "没有找到新版本发行说明",
  "Could not find release with tag {{tag}}": "找不到标签为 {{tag}} 的版本",
  "Unknown error": "未知错误",
  "Failed to fetch releases: {{message}}": "获取发行版本失败：{{message}}",
};

// Obsidian does not expose a separate translation bundle for plugins. Keep a
// small character map here so the same complete source dictionary can serve
// both Simplified Chinese and Traditional Chinese without drifting apart.
const ZH_TW_CHARACTER_MAP: Record<string, string> = {
  与: "與",
  专: "專",
  个: "個",
  为: "為",
  义: "義",
  仅: "僅",
  从: "從",
  仓: "倉",
  体: "體",
  关: "關",
  内: "內",
  写: "寫",
  划: "劃",
  则: "則",
  删: "刪",
  动: "動",
  单: "單",
  发: "發",
  变: "變",
  后: "後",
  启: "啟",
  图: "圖",
  复: "復",
  夹: "夾",
  宽: "寬",
  将: "將",
  并: "並",
  库: "庫",
  开: "開",
  强: "強",
  当: "當",
  径: "徑",
  态: "態",
  择: "擇",
  换: "換",
  数: "數",
  时: "時",
  显: "顯",
  暂: "暫",
  机: "機",
  标: "標",
  栏: "欄",
  样: "樣",
  没: "沒",
  浅: "淺",
  渐: "漸",
  滚: "滾",
  状: "狀",
  盖: "蓋",
  笔: "筆",
  签: "簽",
  线: "線",
  细: "細",
  终: "終",
  经: "經",
  编: "編",
  缘: "緣",
  获: "獲",
  装: "裝",
  视: "視",
  认: "認",
  让: "讓",
  记: "記",
  许: "許",
  设: "設",
  误: "誤",
  说: "說",
  败: "敗",
  赞: "讚",
  辑: "輯",
  输: "輸",
  边: "邊",
  达: "達",
  过: "過",
  进: "進",
  适: "適",
  选: "選",
  销: "銷",
  错: "錯",
  键: "鍵",
  闭: "閉",
  隐: "隱",
  页: "頁",
  顶: "頂",
  项: "項",
  题: "題",
  颜: "顏",
  额: "額",
};

const toTraditionalChinese = (value: string): string =>
  [...value]
    .map((character) => ZH_TW_CHARACTER_MAP[character] ?? character)
    .join("");

const getLanguageCode = () => getObsidianLanguage().toLowerCase();

const isSimplifiedChinese = () => {
  const language = getLanguageCode();
  return (
    language === "zh" || language === "zh-hans" || language.startsWith("zh-cn")
  );
};

const isTraditionalChinese = () => {
  const language = getLanguageCode();
  return (
    language === "zh-tw" ||
    language === "zh-hant" ||
    language.startsWith("zh-hk") ||
    language.startsWith("zh-mo")
  );
};

export function t(source: string, replacements: Replacement = {}): string {
  const isTraditional = isTraditionalChinese();
  let result =
    isSimplifiedChinese() || isTraditional ? (ZH_CN[source] ?? source) : source;
  if (isTraditional) {
    result = toTraditionalChinese(result);
  }
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replaceAll(`{{${key}}}`, String(value));
  }
  return result;
}

export function localizedMarkdown(
  english: string,
  simplifiedChinese: string
): string {
  if (isTraditionalChinese()) {
    return toTraditionalChinese(simplifiedChinese);
  }
  return isSimplifiedChinese() ? simplifiedChinese : english;
}
