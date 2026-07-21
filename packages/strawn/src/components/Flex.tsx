import type { FlexProps } from "../types/primitives";
import { StyledFlex } from "./StyledFlex";

export function Flex({ align, alignItems, justifyContent, flexDirection, wrap, gap, css, ...props }: FlexProps) {
    return (<StyledFlex css={{
            alignItems: align ?? alignItems,
            justifyContent,
            flexDirection,
            flexWrap: wrap,
            gap,
            ...css,
        }} {...props}/>);
}
