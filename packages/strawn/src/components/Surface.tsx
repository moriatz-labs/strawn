import { styled } from "../stitches";

export const Surface = styled("div", {
  color: "$foreground",
  minWidth: 0,
  variants: {
    tone: {
      default: { backgroundColor: "$surface", boxShadow: "$hairline" },
      raised: { backgroundColor: "$surfaceRaised", boxShadow: "$card" },
      inset: { backgroundColor: "$surfaceInset", boxShadow: "inset 0 0 0 1px var(--border)" },
      inverse: { backgroundColor: "$inverse", color: "$inverseForeground" },
      transparent: { backgroundColor: "transparent" },
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
        transition: "box-shadow $fast, transform $fast",
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover": { boxShadow: "$elevated", transform: "translateY(-2px)" },
        },
        "&:active": { transform: "scale(var(--motion-scale-press))" },
        "@media (prefers-reduced-motion: reduce)": { transform: "none !important" },
      },
    },
  },
  defaultVariants: { tone: "default", radius: "lg", padding: "md" },
});
