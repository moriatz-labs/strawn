import type { AvatarProps } from "../types/primitives";
import { AvatarImage } from "./AvatarImage";
import { AvatarRoot } from "./AvatarRoot";
import { getInitials } from "../helpers/getInitials";

export function Avatar({ src, name, initials, size = "md", decorative = false, css }: AvatarProps) {
    return (<AvatarRoot size={size} css={css} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : name}>
      {src ? <AvatarImage src={src} alt=""/> : initials ?? getInitials(name)}
    </AvatarRoot>);
}
