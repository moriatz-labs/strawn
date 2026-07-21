import { type ElementType } from "react";
import type { AccordionProps } from "../types/primitives";
import { AccordionContent } from "./AccordionContent";
import { AccordionContentInner } from "./AccordionContentInner";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionItemRoot } from "./AccordionItemRoot";
import { AccordionRoot } from "./AccordionRoot";
import { AccordionTrigger } from "./AccordionTrigger";
import { Box } from "./Box";

export function Accordion({ items, type = "single", defaultValue, value, onValueChange, css, }: AccordionProps) {
    const RootComponent = AccordionRoot as unknown as ElementType;
    return (<RootComponent type={type} collapsible={type === "single" ? true : undefined} defaultValue={defaultValue} value={value} onValueChange={onValueChange} css={css}>
      {items.map((item) => (<AccordionItemRoot key={item.value} value={item.value} disabled={item.disabled}>
          <AccordionHeader>
            <AccordionTrigger>
              {item.title}
              <Box as="span" aria-hidden="true" data-chevron="true" css={{
                borderBottom: "1px solid $mutedForeground",
                borderRight: "1px solid $mutedForeground",
                flexShrink: 0,
                height: "0.45rem",
                transition: "transform $base",
                transform: "rotate(45deg)",
                width: "0.45rem",
            }}/>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentInner>{item.content}</AccordionContentInner>
          </AccordionContent>
        </AccordionItemRoot>))}
    </RootComponent>);
}
