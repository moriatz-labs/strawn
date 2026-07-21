import type { StackProps } from "../types/primitives";
import { Flex } from "./Flex";

export function Stack({ gap = "$4", css, ...props }: StackProps) {
    return (<Flex flexDirection="column" gap={gap} css={css} {...props}/>);
}
