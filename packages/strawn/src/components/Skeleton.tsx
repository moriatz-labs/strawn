import type { SkeletonProps } from "../types/primitives";
import { SkeletonBlock } from "./SkeletonBlock";
import { Stack } from "./Stack";

export function Skeleton({ variant = "block", width = "100%", height, lines = 1, css }: SkeletonProps) {
    if (variant === "text" && lines > 1) {
        return (<Stack gap="$2" aria-hidden="true" css={css}>
        {Array.from({ length: lines }).map((_, index) => (<SkeletonBlock key={index} variant="text" css={{ width: index === lines - 1 ? "72%" : width, height }}/>))}
      </Stack>);
    }
    return <SkeletonBlock aria-hidden="true" variant={variant} css={{ width, height, ...css }}/>;
}
