import { styled } from "../stitches";

export const SpinnerSlot = styled("span", {
    alignItems: "center",
    display: "inline-flex",
    inset: 0,
    justifyContent: "center",
    opacity: 1,
    pointerEvents: "none",
    position: "absolute",
    transition: "opacity $fast",
    "@starting-style": { opacity: 0 },
});
