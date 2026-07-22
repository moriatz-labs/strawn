export const cardStyles = {
  backgroundColor: "$card",
  border: "1px solid $border",
  borderRadius: "$lg",
  boxShadow: "$card",
  color: "$cardForeground",
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  overflow: "hidden",
  position: "relative",
  textDecoration: "none",
  transition: "border-color $base, box-shadow $base, transform $fast",
  variants: {
    interactive: {
      true: {
        cursor: "pointer",
        "&:focus-visible": { outline: "2px solid $ring", outlineOffset: 2 },
        "&:active:not(:disabled):not([aria-disabled='true'])": { boxShadow: "$soft", transform: "translateY(1px)" },
        "&:disabled, &[aria-disabled='true']": { cursor: "not-allowed", opacity: 0.55 },
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover:not(:disabled):not([aria-disabled='true'])": {
            borderColor: "$foreground",
            boxShadow: "$elevated",
            transform: "translateY(-2px)",
          },
        },
      },
    },
  },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "border-color $base, box-shadow $base",
    transform: "none !important",
  },
} as const;
