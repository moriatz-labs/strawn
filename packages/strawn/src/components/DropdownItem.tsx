import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { styled } from "../stitches";

export const DropdownItem = styled(DropdownMenuPrimitive.Item, {
    borderRadius: "$sm",
    color: "$foreground",
    cursor: "pointer",
    fontFamily: "$body",
    fontSize: "$sm",
    lineHeight: "$snug",
    outline: 0,
    padding: "$2 $3",
    userSelect: "none",
    '&[data-highlighted]': {
        backgroundColor: "$muted",
    },
    '&[data-disabled]': {
        color: "$mutedForeground",
        cursor: "not-allowed",
    },
    variants: {
        destructive: {
            true: {
                color: "$destructive",
                '&[data-highlighted]': {
                    backgroundColor: "color-mix(in srgb, var(--destructive) 8%, var(--background))",
                },
            },
        },
    },
});
