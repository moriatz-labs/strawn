export const cardStyles = {
  backgroundColor: "$card",
  border: "1px solid $border",
  borderRadius: "$md",
  boxShadow: "none",
  color: "$cardForeground",
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  overflow: "hidden",
  position: "relative",
  textDecoration: "none",
  transition: "background-color $fast, border-color $fast",
  variants: {
    interactive: {
      true: {
        cursor: "pointer",
        "&:focus-visible": { outline: "2px solid $ring", outlineOffset: 2 },
        "&:active:not(:disabled):not([aria-disabled='true'])": { backgroundColor: "$surfaceInset" },
        "&:disabled, &[aria-disabled='true']": { cursor: "not-allowed", opacity: 0.55 },
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover:not(:disabled):not([aria-disabled='true'])": {
            borderColor: "$foreground",
            backgroundColor: "$surfaceRaised",
          },
        },
      },
    },
  },
  "@media (prefers-reduced-motion: reduce)": {
    transitionDuration: "var(--motion-duration-immediate)",
  },
} as const;
