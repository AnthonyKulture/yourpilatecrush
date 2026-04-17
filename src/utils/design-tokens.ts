/**
 * Candice Pilates Design System Tokens
 * Extracted from candice-pilates-design-system.md
 */

export const COLORS = {
  burgundy: {
    deep: "#4A1613",
    maroon: "#5B0F0F",
  },
  red: {
    primary: "#7A1616",
    bright: "#951D1E",
    accent: "#AE3134",
  },
  gold: {
    champagne: "#E4C898",
  },
  neutral: {
    sand: "#E9DDD1",
    cream: "#F7EEE5",
  },
} as const;

export const SPACING = {
  xs: "8px",
  sm: "16px",
  md: "24px",
  lg: "48px",
  xl: "80px",
  xxl: "120px",
  xxxl: "160px",
} as const;

export const LAYOUT = {
  maxContent: "1180px",
  maxProse: "720px",
  gutterDesktop: "48px",
  gutterMobile: "24px",
} as const;

export const FONTS = {
  display: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
} as const;
