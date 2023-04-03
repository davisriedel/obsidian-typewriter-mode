import * as CodeMirror from "codemirror";

declare module "@types/codemirror" {
  interface EditorConfiguration {
    typewriterScrolling?: boolean;
  }

  interface CommandActions {
    scrollSelectionToCenter: (cm: CodeMirror.Editor) => void;
  }
}
