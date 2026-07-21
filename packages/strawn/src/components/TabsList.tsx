import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "../stitches";

export const TabsList = styled(TabsPrimitive.List, {
    alignItems: "center",
    borderBottom: "1px solid $border",
    display: "flex",
    gap: "$1",
    overflowX: "auto",
});
