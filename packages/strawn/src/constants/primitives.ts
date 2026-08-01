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
    minHeight: "$controlDefault",
    paddingInline: "$3",
    fontSize: "$xs",
  },
  md: {
    minHeight: "$controlDefault",
    paddingInline: "$4",
    fontSize: "$sm",
  },
  lg: {
    minHeight: "$controlDefault",
    paddingInline: "$5",
    fontSize: "$md",
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
    "--button-tone-surface": "#245d7a",
    "--button-tone-text": "#ffffff",
    "--button-tone-hover": "#194a64",
    "--button-tone-muted": "color-mix(in srgb, #245d7a 10%, var(--background))",
  },
  teal: {
    "--button-tone-surface": "#0b514b",
    "--button-tone-text": "#ffffff",
    "--button-tone-hover": "#083f3a",
    "--button-tone-muted": "color-mix(in srgb, #0b514b 10%, var(--background))",
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
    "--button-tone-surface": "#62506f",
    "--button-tone-text": "#ffffff",
    "--button-tone-hover": "#4d3d58",
    "--button-tone-muted": "color-mix(in srgb, #62506f 12%, var(--background))",
  },
} as const;

export const iconButtonSizeStyles = {
  xs: {
    width: "$controlDefault",
    height: "$controlDefault",
  },
  sm: {
    width: "$controlDefault",
    height: "$controlDefault",
  },
  md: {
    width: "2.75rem",
    height: "2.75rem",
  },
  lg: {
    width: "$controlDefault",
    height: "$controlDefault",
  },
} as const;
