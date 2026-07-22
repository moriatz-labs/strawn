import { useState, type ChangeEvent } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon } from "strawn-icons";
import type { SelectProps } from "../types/primitives";
import { FieldDescription } from "./FieldDescription";
import { FieldError } from "./FieldError";
import { FieldLabel } from "./FieldLabel";
import { FieldRoot } from "./FieldRoot";
import { describedBy } from "../helpers/describedBy";
import { useFieldIds } from "../helpers/useFieldIds";
import { SelectChevron } from "./SelectChevron";
import { SelectContent } from "./SelectContent";
import { SelectItem } from "./SelectItem";
import { SelectItemIndicator } from "./SelectItemIndicator";
import { SelectOptionIcon } from "./SelectOptionIcon";
import { SelectTrigger } from "./SelectTrigger";
import { SelectValueContent } from "./SelectValueContent";
import { SelectViewport } from "./SelectViewport";

export function Select({ id, label, options, description, error, placeholder, disabled, required, css, value, defaultValue, name, onChange, onValueChange }: SelectProps) {
    const { inputId, descriptionId, errorId } = useFieldIds(id);
    const hasError = Boolean(error);
    const hasDescription = Boolean(description);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const selectedValue = value ?? internalValue;
    const selectedOption = options.find((option) => option.value === selectedValue);
    const handleValueChange = (nextValue: string) => {
        if (value === undefined) setInternalValue(nextValue);
        onValueChange?.(nextValue);
        onChange?.({ currentTarget: { value: nextValue }, target: { value: nextValue } } as ChangeEvent<HTMLSelectElement>);
    };
    return (<FieldRoot css={css}>
      <FieldLabel htmlFor={inputId}>
        {label}
        {required ? " *" : null}
      </FieldLabel>
      <SelectPrimitive.Root name={name} value={value} defaultValue={defaultValue} required={required} disabled={disabled} onValueChange={handleValueChange}>
        <SelectTrigger id={inputId} invalid={hasError} aria-invalid={hasError || undefined} aria-describedby={describedBy(descriptionId, errorId, hasDescription, hasError)}>
          <SelectValueContent>
            {selectedOption?.icon ? <SelectOptionIcon aria-hidden="true">{selectedOption.icon}</SelectOptionIcon> : null}
            <SelectPrimitive.Value placeholder={placeholder}/>
          </SelectValueContent>
          <SelectPrimitive.Icon asChild>
            <SelectChevron aria-hidden="true">
              <ChevronDownIcon aria-hidden="true" size={16} strokeWidth={2.25} />
            </SelectChevron>
          </SelectPrimitive.Icon>
        </SelectTrigger>
        <SelectPrimitive.Portal>
          <SelectContent position="popper" sideOffset={6} collisionPadding={16}>
            <SelectViewport>
              {options.map((option) => (<SelectItem key={option.value} value={option.value} disabled={option.disabled} data-has-icon={option.icon ? "true" : undefined}>
                  {option.icon ? <SelectOptionIcon aria-hidden="true">{option.icon}</SelectOptionIcon> : null}
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectItemIndicator/>
                </SelectItem>))}
            </SelectViewport>
          </SelectContent>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      {error ? <FieldError id={errorId} role="alert">{error}</FieldError> : null}
    </FieldRoot>);
}
