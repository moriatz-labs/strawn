import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { styled } from "../stitches";

export const DropdownSeparator = styled(DropdownMenuPrimitive.Separator, {
    backgroundColor: "$border",
    height: 1,
    margin: "$2 0",
});
