import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled } from "../stitches";

export const DialogTitle = styled(DialogPrimitive.Title, {
    color: "$foreground",
    fontFamily: "$heading",
    fontSize: "$xl",
    lineHeight: "$tight",
    margin: 0,
});
