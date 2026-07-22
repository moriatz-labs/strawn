import { styled } from "../stitches";

export const SelectChevron = styled("span", {
    alignItems: "center",
    color: "$mutedForeground",
    display: "inline-flex",
    flex: "0 0 auto",
    height: "1.25rem",
    justifyContent: "center",
    lineHeight: 1,
    transition: "transform $base",
    width: "1.25rem",
    '[data-state="open"] &': {
        transform: "rotate(180deg)",
    },
});
