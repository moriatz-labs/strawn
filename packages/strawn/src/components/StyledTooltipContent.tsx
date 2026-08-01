import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { styled } from "../stitches";

export const StyledTooltipContent = styled(TooltipPrimitive.Content, {
    zIndex: "$tooltip",
    width: "fit-content",
    maxWidth: "20rem",
    borderRadius: "$sm",
    border: "1px solid $border",
    backgroundColor: "$foreground",
    color: "$background",
    padding: "$2 $3",
    fontFamily: "$ui",
    fontSize: "$xs",
    lineHeight: "$snug",
    textWrap: "balance",
    boxShadow: "$soft",
    transformOrigin: "var(--radix-tooltip-content-transform-origin)",
    opacity: 1,
    transform: "scale(1)",
    transition: "opacity $enter, transform $enter",
    "@starting-style": { opacity: 0, transform: "scale(0.98)" },
    '&[data-state="closed"]': {
        opacity: 0,
        transform: "scale(0.98)",
        transition: "opacity $immediate, transform $immediate",
    },
    '&[data-state="instant-open"]': { transition: "none" },
    "@media (prefers-reduced-motion: reduce)": {
        transform: "none",
        transitionProperty: "opacity",
        '&[data-state="closed"]': { transform: "none" },
    },
});
