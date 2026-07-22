import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "../stitches";

export const TabsContent = styled(TabsPrimitive.Content, {
    color: "$foreground",
    outline: 0,
    '&[data-state="inactive"]': {
        display: "none",
    },
});
