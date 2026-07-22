import { styled } from "../stitches";

export const Spinner = styled("span", {
    width: "1em",
    height: "1em",
    borderRadius: "$pill",
    border: "2px solid currentColor",
    borderTopColor: "transparent",
    animation: "strawn-spin var(--motion-duration-deliberate) linear infinite",
    "@media (prefers-reduced-motion: reduce)": {
        animation: "none",
    },
});
