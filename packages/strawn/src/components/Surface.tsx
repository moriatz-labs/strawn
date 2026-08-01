import { styled } from "../stitches";

export const Surface = styled("div", {
  border: "1px solid transparent",
  color: "$foreground",
  minWidth: 0,
  variants: {
    tone: {
      default: { backgroundColor: "$surface", borderColor: "$border" },
      raised: { backgroundColor: "$surfaceRaised", borderColor: "$borderStrong" },
      inset: { backgroundColor: "$surfaceInset", borderColor: "$border" },
      inverse: { backgroundColor: "$inverse", borderColor: "transparent", color: "$inverseForeground" },
      transparent: { backgroundColor: "transparent", borderColor: "transparent" },
    },
    radius: {
      none: { borderRadius: 0 },
      sm: { borderRadius: "$sm" },
      md: { borderRadius: "$md" },
      lg: { borderRadius: "$lg" },
      xl: { borderRadius: "$xl" },
      "2xl": { borderRadius: "$2xl" },
    },
    padding: {
      none: { padding: 0 },
      sm: { padding: "$3" },
      md: { padding: "$5" },
      lg: { padding: "$6", "@md": { padding: "$8" } },
    },
    interactive: {
      true: {
        "&:is(button, a[href])": {
          cursor: "pointer",
          transition: "background-color $fast, border-color $fast",
          "&:focus-visible": { outline: "2px solid $ring", outlineOffset: 2 },
        },
        "@media (hover: hover) and (pointer: fine)": {
          "&:is(button, a[href]):hover": { backgroundColor: "$muted", borderColor: "$borderStrong" },
        },
      },
    },
  },
  defaultVariants: { tone: "default", radius: "md", padding: "md" },
});
