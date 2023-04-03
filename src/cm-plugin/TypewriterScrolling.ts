// all credit to azu: https://github.com/azu/codemirror-typewriter-scrolling/blob/b0ac076d72c9445c96182de87d974de2e8cc56e2/typewriter-scrolling.js
let movedByMouse = false;

CodeMirror.commands.scrollSelectionToCenter = (cm: CodeMirror.Editor) => {
  const cursor = cm.getCursor("head");
  const charCoords = cm.charCoords(cursor, "local");
  const top = charCoords.top;
  const halfLineHeight = (charCoords.bottom - top) / 2;
  const halfWindowHeight = cm.getWrapperElement().offsetHeight / 2;
  const scrollTo = Math.round(top - halfWindowHeight + halfLineHeight);
  cm.scrollTo(null, scrollTo);
};

CodeMirror.defineOption(
  "typewriterScrolling",
  false,
  (
    cm: CodeMirror.Editor,
    val: CodeMirror.EditorConfiguration,
    old: CodeMirror.EditorConfiguration
  ) => {
    if (old) {
      const linesEl = cm
        .getScrollerElement()
        .querySelector(".CodeMirror-lines") as HTMLElement;
      linesEl.style.paddingTop = null;
      linesEl.style.paddingBottom = null;
      cm.off("cursorActivity", onCursorActivity);
      cm.off("refresh", onRefresh);
      cm.off("mousedown", onMouseDown);
      cm.off("keydown", onKeyDown);
      cm.off("beforeChange", onBeforeChange);
    }
    if (val) {
      onRefresh(cm);
      cm.on("cursorActivity", onCursorActivity);
      cm.on("refresh", onRefresh);
      cm.on("mousedown", onMouseDown);
      cm.on("keydown", onKeyDown);
      cm.on("beforeChange", onBeforeChange);
    }
  }
);

function onMouseDown() {
  movedByMouse = true;
}

const modiferKeys = [
  "Alt",
  "AltGraph",
  "CapsLock",
  "Control",
  "Fn",
  "FnLock",
  "Hyper",
  "Meta",
  "NumLock",
  "ScrollLock",
  "Shift",
  "Super",
  "Symbol",
  "SymbolLock",
];

function onKeyDown(_cm: CodeMirror.Editor, e: KeyboardEvent) {
  if (!modiferKeys.includes(e.key)) {
    movedByMouse = false;
  }
}

function onBeforeChange() {
  movedByMouse = false;
}

function onCursorActivity(cm: CodeMirror.Editor) {
  const linesEl = cm.getScrollerElement().querySelector(".CodeMirror-lines");
  if (cm.getSelection().length !== 0) {
    linesEl.classList.add("selecting");
  } else {
    linesEl.classList.remove("selecting");
  }

  if (!movedByMouse) {
    cm.execCommand("scrollSelectionToCenter");
  }
}

function onRefresh(cm: CodeMirror.Editor) {
  const halfWindowHeight = cm.getWrapperElement().offsetHeight / 2;
  const linesEl = cm
    .getScrollerElement()
    .querySelector(".CodeMirror-lines") as HTMLElement;
  linesEl.style.paddingTop = `${halfWindowHeight}px`;
  linesEl.style.paddingBottom = `${halfWindowHeight}px`; // Thanks @walulula!
  if (cm.getSelection().length === 0) {
    cm.execCommand("scrollSelectionToCenter");
  }
}
