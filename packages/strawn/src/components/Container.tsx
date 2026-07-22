import { styled } from "../stitches";

export const Container = styled("div", {
  marginInline: "auto",
  paddingInline: "$4",
  width: "100%",
  "@md": { paddingInline: "$8" },
  variants: {
    size: {
      reading: { maxWidth: "$reading" },
      default: { maxWidth: "$container" },
      wide: { maxWidth: "$containerWide" },
      full: { maxWidth: "none" },
    },
  },
  defaultVariants: { size: "default" },
});
