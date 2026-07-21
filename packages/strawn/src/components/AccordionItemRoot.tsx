import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { styled } from "../stitches";

export const AccordionItemRoot = styled(AccordionPrimitive.Item, {
    backgroundColor: "$card",
    '& + &': {
        borderTop: "1px solid $border",
    },
});
