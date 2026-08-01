import * as SelectPrimitive from "@radix-ui/react-select";
import { styled } from "../stitches";

export const SelectTrigger = styled(SelectPrimitive.Trigger, {
    alignItems: "center",
    backgroundColor: "$surface",
    border: "1px solid $input",
    borderRadius: "$sm",
    boxShadow: "none",
    color: "$foreground",
    display: "flex",
    fontFamily: "$ui",
    fontSize: "$sm",
    gap: "$2",
    justifyContent: "space-between",
    minHeight: "$controlDefault",
    minWidth: 0,
    outline: 0,
    paddingInline: "$4",
    textAlign: "left",
    transition: "background-color $fast, border-color $fast, box-shadow $fast",
    width: "100%",
    '&[data-placeholder]': {
        color: "$mutedForeground",
    },
    "&:hover:not(:disabled)": {
        borderColor: "$borderStrong",
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
