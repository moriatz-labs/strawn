import { styled } from "../stitches";

export const ProgressFill = styled("div", {
    backgroundColor: "$primary",
    borderRadius: "$pill",
    height: "100%",
    transformOrigin: "left center",
    transition: "transform $base",
    width: "100%",
    variants: {
        indeterminate: {
            true: {
                animation: "strawn-progress var(--motion-duration-deliberate) linear infinite",
                transform: "scaleX(0.35)",
                "@media (prefers-reduced-motion: reduce)": { animation: "none", transform: "scaleX(1)" },
            },
        },
    },
});
