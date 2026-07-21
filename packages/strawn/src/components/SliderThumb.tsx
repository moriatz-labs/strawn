import * as SliderPrimitive from "@radix-ui/react-slider";
import { styled } from "../stitches";

export const SliderThumb = styled(SliderPrimitive.Thumb, {
    backgroundColor: "$background",
    border: "1px solid $primary",
    borderRadius: "$pill",
    boxShadow: "$soft",
    cursor: "grab",
    display: "block",
    height: "1.25rem",
    transition: "box-shadow $base, transform $fast",
    width: "1.25rem",
    "&:active": { cursor: "grabbing", transform: "scale(1.08)" },
    "@media (hover: hover) and (pointer: fine)": {
        "&:hover": { boxShadow: "$elevated", transform: "scale(1.06)" },
    },
    "@media (prefers-reduced-motion: reduce)": { transform: "none !important" },
    "&:focus-visible": {
        outline: "2px solid $ring",
        outlineOffset: 2,
    },
    '&[data-disabled]': {
        cursor: "not-allowed",
    },
});
