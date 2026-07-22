import * as SelectPrimitive from "@radix-ui/react-select";
import { styled } from "../stitches";

export const SelectViewport = styled(SelectPrimitive.Viewport, {
    display: "grid",
    gap: "$1",
    maxHeight: "min(var(--radix-select-content-available-height), 16rem)",
    overflowY: "auto",
    paddingLeft: "$2",
    paddingRight: "$1",
    scrollbarWidth: "thin",
    scrollbarColor: "color-mix(in srgb, var(--foreground) 28%, transparent) transparent",
    "&::-webkit-scrollbar": {
        width: "0.625rem",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "color-mix(in srgb, var(--foreground) 24%, transparent)",
        borderRadius: "$full",
        border: "2px solid transparent",
        backgroundClip: "content-box",
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
    },
});
