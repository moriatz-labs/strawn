import * as SelectPrimitive from "@radix-ui/react-select";
import { styled } from "../stitches";

export const SelectItem = styled(SelectPrimitive.Item, {
    alignItems: "center",
    borderRadius: "$md",
    color: "$foreground",
    cursor: "pointer",
    display: "grid",
    fontFamily: "$ui",
    fontSize: "$sm",
    gap: "$2",
    gridTemplateColumns: "minmax(0, 1fr) 1.25rem",
    minHeight: "2.75rem",
    outline: 0,
    paddingBlock: "$2",
    paddingInline: "$3",
    userSelect: "none",
    '&[data-has-icon="true"]': {
        gridTemplateColumns: "1.25rem minmax(0, 1fr) 1.25rem",
    },
    '&[data-highlighted]': {
        backgroundColor: "$muted",
    },
    '&[data-state="checked"]': {
        backgroundColor: "color-mix(in srgb, var(--accent) 72%, var(--background))",
        color: "$accentForeground",
        fontWeight: "$medium",
    },
    '&[data-disabled]': {
        color: "$mutedForeground",
        cursor: "not-allowed",
        opacity: 0.72,
    },
});
