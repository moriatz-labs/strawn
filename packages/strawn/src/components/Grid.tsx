import type { GridProps } from "../types/primitives";
import { StyledGrid } from "./StyledGrid";

export function Grid({ columns, gap, css, ...props }: GridProps) {
    const columnCss = typeof columns === "object"
        ? {
            gridTemplateColumns: columns.initial,
            "@sm": { gridTemplateColumns: columns.sm },
            "@md": { gridTemplateColumns: columns.md },
            "@lg": { gridTemplateColumns: columns.lg },
            "@xl": { gridTemplateColumns: columns.xl },
        }
        : { gridTemplateColumns: columns };
    return (<StyledGrid css={{
            gap,
            ...columnCss,
            ...css,
        }} {...props}/>);
}
