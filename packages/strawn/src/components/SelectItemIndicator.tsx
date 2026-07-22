import * as SelectPrimitive from "@radix-ui/react-select";
import { styled } from "../stitches";

export const SelectItemIndicator = styled(SelectPrimitive.ItemIndicator, {
    alignItems: "center",
    display: "inline-flex",
    height: "1.25rem",
    justifyContent: "center",
    position: "relative",
    width: "1.25rem",
    "&::before": {
        borderBottom: "2px solid currentColor",
        borderRight: "2px solid currentColor",
        content: "",
        height: "0.65rem",
        transform: "rotate(45deg) translateY(-1px)",
        width: "0.35rem",
    },
});
