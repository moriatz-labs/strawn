import { Slot } from "@radix-ui/react-slot";
import { styled } from "../stitches";
import { cardStyles } from "./cardStyles";

export const CardArticle = styled("article", cardStyles);
export const CardSlot = styled(Slot, cardStyles);
