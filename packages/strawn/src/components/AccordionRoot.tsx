import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { styled } from "../stitches";

export const AccordionRoot = styled(AccordionPrimitive.Root, {
    border: "1px solid $border",
    borderRadius: "$lg",
    overflow: "hidden",
});
