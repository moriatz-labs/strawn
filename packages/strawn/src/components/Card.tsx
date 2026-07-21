import { forwardRef, type ComponentRef } from "react";
import { CardArticle, CardSlot } from "../constants/cardRoots";
import type { CardProps } from "../types/card";

export const Card = forwardRef<ComponentRef<"article">, CardProps>(
  ({ asChild = false, interactive = false, ...props }, ref) => {
    const sharedProps = { interactive, "data-interactive": interactive || undefined, ...props };
    if (asChild) return <CardSlot ref={ref} {...sharedProps} />;
    return <CardArticle ref={ref} {...sharedProps} />;
  },
);

Card.displayName = "Card";
