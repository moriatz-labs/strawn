import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { styled } from "../stitches";

export const AccordionTrigger = styled(AccordionPrimitive.Trigger, {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    border: 0,
    color: "$foreground",
    cursor: "pointer",
    display: "flex",
    fontFamily: "$ui",
    fontSize: "$sm",
    fontWeight: "$semibold",
    justifyContent: "space-between",
    lineHeight: "$snug",
    minHeight: "2.75rem",
    padding: "$3 $4",
    textAlign: "left",
    width: "100%",
    "&:focus-visible": {
        outline: "2px solid $ring",
        outlineOffset: -2,
    },
    "&:disabled": {
        color: "$mutedForeground",
        cursor: "not-allowed",
    },
    '&[data-state="open"] span[data-chevron="true"]': {
        transform: "rotate(180deg)",
    },
});
