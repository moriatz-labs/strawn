import * as SelectPrimitive from "@radix-ui/react-select";
import { styled } from "../stitches";

export const SelectTrigger = styled(SelectPrimitive.Trigger, {
    alignItems: "center",
    backgroundColor: "$background",
    border: "1px solid $border",
    borderRadius: "$md",
    boxShadow: "inset 0 1px 0 color-mix(in srgb, var(--foreground) 3%, transparent)",
    color: "$foreground",
    display: "flex",
    fontFamily: "$ui",
    fontSize: "$sm",
    gap: "$2",
    justifyContent: "space-between",
    minHeight: "3rem",
    minWidth: 0,
    outline: 0,
    paddingInline: "$4",
    textAlign: "left",
    transition: "background-color $base, border-color $base, box-shadow $base",
    width: "100%",
    '&[data-placeholder]': {
        color: "$mutedForeground",
    },
    "&:hover:not(:disabled)": {
        backgroundColor: "$muted",
    },
    "&:focus-visible": {
        borderColor: "$ring",
        boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 24%, transparent)",
    },
    '&[data-state="open"]': {
        borderColor: "$ring",
        boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 18%, transparent)",
    },
    "&:disabled": {
        color: "$mutedForeground",
        cursor: "not-allowed",
        opacity: 0.72,
    },
    variants: {
        invalid: {
            true: {
                borderColor: "$destructive",
            },
        },
    },
});
