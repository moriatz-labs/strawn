import { styled } from "../stitches";

export const BareTextarea = styled("textarea", {
  backgroundColor: "transparent",
  border: 0,
  color: "$foreground",
  fieldSizing: "content",
  fontFamily: "$ui",
  fontSize: "$md",
  lineHeight: "$base",
  minHeight: "6rem",
  minWidth: 0,
  outline: 0,
  paddingBlock: "$3",
  resize: "vertical",
  width: "100%",
  "&::placeholder": { color: "$mutedForeground", opacity: 1 },
  "&:disabled": { cursor: "not-allowed" },
});
