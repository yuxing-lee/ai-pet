/**
 * Design tokens — the single source of truth for colors, fonts and spacing.
 * Keeping these here (instead of inline in components) means a re-skin only
 * touches this file. (Single Responsibility)
 */
export const theme = {
  bg:       "#05080f",
  bgCard:   "#0b1120",
  bgTile:   "#0e1628",
  border:   "#1a2540",
  cyan:     "#00ffe7",
  pink:     "#ff4fc8",
  yellow:   "#ffe566",
  blue:     "#4fa3ff",
  text:     "#e8f0ff",
  muted:    "#4a5878",
  fontPx:   "'Press Start 2P', 'Courier New', monospace",
  fontBody: "'M PLUS Rounded 1c', 'Segoe UI', sans-serif",
};

// Short alias kept for ergonomic use inside style objects.
export const T = theme;
export default theme;
