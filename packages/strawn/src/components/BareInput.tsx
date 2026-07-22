import { styled } from "../stitches";

export const BareInput = styled("input", {
    appearance: "none",
    backgroundColor: "transparent",
    border: 0,
    color: "$foreground",
    flex: 1,
    fontFamily: "$ui",
    fontSize: "$sm",
    minWidth: 0,
    outline: 0,
    paddingBlock: "$3",
    "&::placeholder": {
        color: "$mutedForeground",
    },
    "&:disabled": {
        cursor: "not-allowed",
    },
    "&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration": {
        appearance: "none",
        display: "none",
    },
});
