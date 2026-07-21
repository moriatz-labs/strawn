import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "../stitches";

export const TabsTrigger = styled(TabsPrimitive.Trigger, {
    appearance: "none",
    backgroundColor: "transparent",
    border: 0,
    borderBottom: "2px solid transparent",
    color: "$mutedForeground",
    cursor: "pointer",
    fontFamily: "$ui",
    fontSize: "$sm",
    fontWeight: "$medium",
    minHeight: "2.75rem",
    padding: "$2 $3",
    transition: "border-color $base, color $base, transform $fast",
    whiteSpace: "nowrap",
    "&:active:not(:disabled)": { transform: "translateY(1px)" },
    "@media (prefers-reduced-motion: reduce)": { transform: "none !important" },
    '&[data-state="active"]': {
        borderBottomColor: "$foreground",
        color: "$foreground",
    },
    "&:focus-visible": {
        outline: "2px solid $ring",
        outlineOffset: -2,
    },
    "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.55,
    },
});
