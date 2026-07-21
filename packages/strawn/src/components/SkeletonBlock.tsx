import { styled } from "../stitches";

export const SkeletonBlock = styled("span", {
    backgroundColor: "$muted",
    borderRadius: "$md",
    display: "block",
    overflow: "hidden",
    position: "relative",
    "&::after": {
        animation: "strawn-skeleton var(--motion-duration-deliberate) linear infinite",
        background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--background) 64%, transparent), transparent)",
        content: "",
        inset: 0,
        position: "absolute",
        transform: "translateX(-100%)",
    },
    "@media (prefers-reduced-motion: reduce)": { "&::after": { animation: "none" } },
    variants: {
        variant: {
            text: { height: "0.875rem" },
            block: { minHeight: "5rem" },
            avatar: { borderRadius: "$pill", height: "2.5rem", width: "2.5rem" },
        },
    },
    defaultVariants: { variant: "block" },
});
