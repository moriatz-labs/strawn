import { styled } from "../stitches";

export const BareSelect = styled("select", {
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
    "&:disabled": {
        cursor: "not-allowed",
    },
});
