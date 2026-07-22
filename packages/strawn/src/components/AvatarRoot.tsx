import { styled } from "../stitches";

export const AvatarRoot = styled("span", {
    alignItems: "center",
    backgroundColor: "$muted",
    border: "1px solid $border",
    borderRadius: "$pill",
    color: "$foreground",
    display: "inline-flex",
    flexShrink: 0,
    fontFamily: "$ui",
    fontWeight: "$semibold",
    justifyContent: "center",
    overflow: "hidden",
    textTransform: "uppercase",
    variants: {
        size: {
            sm: { fontSize: "$xs", height: "2rem", width: "2rem" },
            md: { fontSize: "$sm", height: "2.5rem", width: "2.5rem" },
            lg: { fontSize: "$md", height: "3rem", width: "3rem" },
        },
    },
    defaultVariants: { size: "md" },
});
