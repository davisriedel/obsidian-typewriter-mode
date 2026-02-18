export interface PerWindowProps {
  allBodyClasses: string[]; // All classes that can be active or not
  bodyAttrs: Record<string, string>;
  bodyClasses: string[]; // all active classes
  cssVariables: Record<string, string>;
  persistentBodyClasses: string[];
}
