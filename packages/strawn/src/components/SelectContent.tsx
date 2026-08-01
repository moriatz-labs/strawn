import * as SelectPrimitive from "@radix-ui/react-select";
import { styled } from "../stitches";

export const SelectContent = styled(SelectPrimitive.Content, {
    backgroundColor: "$card",
    border: "1px solid color-mix(in srgb, var(--border) 82%, var(--foreground))",
    borderRadius: "$md",
    boxShadow: "$elevated",
    color: "$foreground",
    height: "auto",
    maxHeight: "min(var(--radix-select-content-available-height), 16rem)",
    minWidth: "var(--radix-select-trigger-width)",
    overflow: "hidden",
    paddingBlock: "$2",
    transformOrigin: "var(--radix-select-content-transform-origin)",
    zIndex: "$dropdown",
    '&[data-state="open"]': {
        animation: "selectMenuIn $enter cubic-bezier(0.2, 0, 0, 1)",
    },
    '&[data-state="closed"]': {
        animation: "selectMenuOut $exit cubic-bezier(0.4, 0, 1, 1)",
    },
    "@keyframes selectMenuIn": {
        from: { opacity: 0, transform: "scaleY(0.96)" },
        to: { opacity: 1, transform: "scaleY(1)" },
    },
    "@keyframes selectMenuOut": {
        from: { opacity: 1, transform: "scaleY(1)" },
        to: { opacity: 0, transform: "scaleY(0.98)" },
    },
    "@media (prefers-reduced-motion: reduce)": {
        animation: "none !important",
    },
});
