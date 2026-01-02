export interface PerWindowProps {
  cssVariables: Record<string, string>;
  bodyAttrs: Record<string, string>;
  bodyClasses: string[]; // all active classes
  persistentBodyClasses: string[];
  allBodyClasses: string[]; // All classes that can be active or not
}
