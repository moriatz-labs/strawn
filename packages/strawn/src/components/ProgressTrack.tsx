import { styled } from "../stitches";

export const ProgressTrack = styled("div", {
    backgroundColor: "$muted",
    border: "1px solid $border",
    borderRadius: "$pill",
    overflow: "hidden",
    variants: {
        size: {
            sm: { height: "0.5rem" },
            md: { height: "0.75rem" },
        },
    },
    defaultVariants: { size: "md" },
});
