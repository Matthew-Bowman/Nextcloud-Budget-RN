//
// Color Tokens
//

export type ColorTokens = {
  background: string;
  surface: string;
  decoration: string;

  accent: string;
  accentLight: string;
  accentDark: string;
  onAccent: string;

  mainText: string;
  mutedText: string;
  disabled: string;

  // Semantic states
  danger: string;
  onDanger: string;

  success: string;
  onSuccess: string;

  warning: string;
  onWarning: string;

  info: string;
  onInfo: string;
};

const light: ColorTokens = {
  background: "#F7F8FA",
  surface: "#FFFFFF",
  decoration: "#E9ECF1",

  accent: "#8B5CF6",
  accentLight: "#B14CFF",
  accentDark: "#7E2DC7",
  onAccent: "#FFFFFF",

  mainText: "#1B1E21",
  mutedText: "#5F6368",
  disabled: "#C6C6C6",

  // Semantic
  danger: "#E5484D",
  onDanger: "#FFFFFF",

  success: "#2E9B4B",
  onSuccess: "#FFFFFF",

  warning: "#F5A524",
  onWarning: "#1B1E21",

  info: "#3B82F6",
  onInfo: "#FFFFFF",
};

const dark: ColorTokens = {
  background: "#1B1E21",
  surface: "#26292C",
  decoration: "#313437",

  accent: "#8B5CF6",
  accentLight: "#B14CFF",
  accentDark: "#7E2DC7",
  onAccent: "#FFFFFF",

  mainText: "#E4E4E4",
  mutedText: "#A0A0A0",
  disabled: "#5E5E5E",

  // Semantic
  danger: "#FF6369",
  onDanger: "#1B1E21",

  success: "#4CD964",
  onSuccess: "#1B1E21",

  warning: "#FFB84D",
  onWarning: "#1B1E21",

  info: "#60A5FA",
  onInfo: "#1B1E21",
};

export const colors = { light, dark };

//
// Spacing Tokens
//

export const spacing = {
  /** xs - 4px */
  xs: 4,
  /** sm - 8px */
  sm: 8,
  /** md - 16px */
  md: 16,
  /** lg - 24px */
  lg: 24,
  /** xl - 32px */
  xl: 32,
  /** xxl - 40px */
  xxl: 40,
};

export type SpacingTokens = keyof typeof spacing;