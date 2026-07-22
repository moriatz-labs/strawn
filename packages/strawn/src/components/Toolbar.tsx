import { styled } from "../stitches";

export const Toolbar = styled("div", {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: "$2",
  minHeight: "$controlDefault",
  variants: {
    tone: {
      transparent: { backgroundColor: "transparent" },
      surface: { backgroundColor: "$surface", borderRadius: "$md", boxShadow: "$hairline", padding: "$2" },
      inset: { backgroundColor: "$surfaceInset", borderRadius: "$md", padding: "$2" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      between: { justifyContent: "space-between" },
      end: { justifyContent: "flex-end" },
    },
  },
  defaultVariants: { tone: "transparent", justify: "start" },
});
