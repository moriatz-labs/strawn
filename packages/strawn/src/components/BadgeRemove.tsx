import { styled } from "../stitches";

export const BadgeRemove = styled("button", {
    appearance: "none",
    background: "transparent",
    border: 0,
    borderRadius: "$pill",
    color: "inherit",
    cursor: "pointer",
    display: "inline-flex",
    font: "inherit",
    height: "$hitTarget",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    marginRight: "-0.25rem",
    minHeight: "$hitTarget",
    minWidth: "$hitTarget",
    padding: 0,
    width: "$hitTarget",
    "&:focus-visible": { outline: "2px solid $ring", outlineOffset: 1 },
});
