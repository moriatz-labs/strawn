export const responsiveBreakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
} as const;

export const spaceScale = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
} as const;

export const buttonSizeStyles = {
  sm: {
    minHeight: "2rem",
    paddingInline: "$3",
    fontSize: "$xs",
  },
  md: {
    minHeight: "2.5rem",
    paddingInline: "$6",
    fontSize: "$md",
  },
  lg: {
    minHeight: "3.5rem",
    paddingInline: "$9",
    fontSize: "$lg",
  },
} as const;

export const buttonToneStyles = {
  black: {
    "--button-tone-surface": "#000000",
    "--button-tone-text": "#ffffff",
    "--button-tone-hover": "#1f1f1f",
    "--button-tone-muted": "color-mix(in srgb, #000000 10%, var(--background))",
  },
  white: {
    "--button-tone-surface": "#ffffff",
    "--button-tone-text": "#000000",
    "--button-tone-hover": "#f2f2f2",
    "--button-tone-muted": "color-mix(in srgb, #000000 6%, var(--background))",
  },
  blue: {
    "--button-tone-surface": "#315fbd",
    "--button-tone-text": "#ffffff",
    "--button-tone-hover": "#244c99",
    "--button-tone-muted": "color-mix(in srgb, #315fbd 10%, var(--background))",
  },
  teal: {
    "--button-tone-surface": "#28766a",
    "--button-tone-text": "#ffffff",
    "--button-tone-hover": "#1f5f55",
    "--button-tone-muted": "color-mix(in srgb, #28766a 10%, var(--background))",
  },
  amber: {
    "--button-tone-surface": "#9a6815",
    "--button-tone-text": "#ffffff",
    "--button-tone-hover": "#7a520f",
    "--button-tone-muted": "color-mix(in srgb, #9a6815 12%, var(--background))",
  },
  rose: {
    "--button-tone-surface": "#87384c",
    "--button-tone-text": "#ffffff",
    "--button-tone-hover": "#6c2b3b",
    "--button-tone-muted": "color-mix(in srgb, #87384c 10%, var(--background))",
  },
  plum: {
    "--button-tone-surface": "#765092",
    "--button-tone-text": "#ffffff",
    "--button-tone-hover": "#5f4076",
    "--button-tone-muted": "color-mix(in srgb, #765092 12%, var(--background))",
  },
} as const;

export const iconButtonSizeStyles = {
  xs: {
    width: "1.875rem",
    height: "1.875rem",
  },
  sm: {
    width: "2.5rem",
    height: "2.5rem",
  },
  md: {
    width: "2.75rem",
    height: "2.75rem",
  },
  lg: {
    width: "3.25rem",
    height: "3.25rem",
  },
} as const;
