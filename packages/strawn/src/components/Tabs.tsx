import type { TabsProps } from "../types/primitives";
import { TabsContent } from "./TabsContent";
import { TabsList } from "./TabsList";
import { TabsRoot } from "./TabsRoot";
import { TabsTrigger } from "./TabsTrigger";

export function Tabs({ items, defaultValue, value, onValueChange, label, css }: TabsProps) {
    const firstValue = items[0]?.value;
    return (<TabsRoot defaultValue={defaultValue ?? (value ? undefined : firstValue)} value={value} onValueChange={onValueChange} css={css}>
      <TabsList aria-label={label}>
        {items.map((item) => (<TabsTrigger key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </TabsTrigger>))}
      </TabsList>
      {items.map((item) => (<TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>))}
    </TabsRoot>);
}
