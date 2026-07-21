import { styled } from "../stitches";

export const CardMedia = styled("div", {
  display: "block",
  flexShrink: 0,
  minWidth: 0,
  overflow: "hidden",
  "& > img, & > picture, & > video": { display: "block", height: "auto", maxWidth: "100%", width: "100%" },
});
