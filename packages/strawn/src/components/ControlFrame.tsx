import { styled } from "../stitches";

export const ControlFrame = styled("div", {
    alignItems: "center",
    backgroundColor: "$surface",
    border: "1px solid $input",
    borderRadius: "$sm",
    boxShadow: "none",
    color: "$foreground",
    display: "flex",
    gap: "$2",
    minHeight: "$controlDefault",
    paddingInline: "$3",
    transition: "border-color $fast, box-shadow $fast",
    "&:hover": { borderColor: "$borderStrong" },
    "&:focus-within": {
        borderColor: "$ring",
        boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 24%, transparent)",
    },
    variants: {
        invalid: {
            true: {
                borderColor: "$destructive",
            },
        },
    },
});
