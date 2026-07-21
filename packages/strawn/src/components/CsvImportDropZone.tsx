import { styled } from "../stitches";

export const CsvImportDropZone = styled("button", {
  appearance: "none",
  alignItems: "center",
  backgroundColor: "$surfaceInset",
  border: "1px dashed $borderStrong",
  borderRadius: "$md",
  color: "$foreground",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  gap: "$2",
  justifyContent: "center",
  minHeight: "12rem",
  padding: "$6",
  textAlign: "center",
  width: "100%",
  transition: "background-color $fast, border-color $fast, box-shadow $fast, transform $fast",
  "&:hover:not(:disabled)": {
    backgroundColor: "$accent",
    borderColor: "$accentForeground",
  },
  "&:active:not(:disabled)": {
    transform: "scale(0.96)",
  },
  "&:focus-visible": {
    boxShadow: "$focus",
    outline: "none",
  },
  '&[data-dragging="true"]': {
    backgroundColor: "$accent",
    borderColor: "$accentForeground",
    boxShadow: "$focus",
  },
  "&:disabled": {
    cursor: "wait",
    opacity: 0.62,
  },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
  },
});
