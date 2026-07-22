import type { BadgeProps } from "../types/primitives";
import { BadgeRemove } from "./BadgeRemove";
import { BadgeRoot } from "./BadgeRoot";
import { badgeToneStyles } from "../constants/badgeToneStyles";

export function Badge({ children, tone = "neutral", leadingIcon, disabled, onRemove, removeLabel = "Remove", css }: BadgeProps) {
    return (<BadgeRoot disabled={disabled} css={{ ...badgeToneStyles[tone], ...css }}>
      {leadingIcon}
      {children}
      {onRemove ? <BadgeRemove type="button" aria-label={removeLabel} disabled={disabled} onClick={onRemove}>x</BadgeRemove> : null}
    </BadgeRoot>);
}
