import { useId } from "react";
import type { CheckboxGroupProps } from "../types/primitives";
import { CheckboxIndicator } from "./CheckboxIndicator";
import { CheckboxRoot } from "./CheckboxRoot";
import { ChoiceRow } from "./ChoiceRow";
import { FieldDescription } from "./FieldDescription";
import { FieldError } from "./FieldError";
import { FieldLabel } from "./FieldLabel";
import { FieldRoot } from "./FieldRoot";
import { Stack } from "./Stack";
import { describedBy } from "../helpers/describedBy";

export function CheckboxGroup({ label, options, value, onValueChange, description, error, disabled, css, }: CheckboxGroupProps) {
    const groupId = useId();
    const descriptionId = `${groupId}-description`;
    const errorId = `${groupId}-error`;
    const hasError = Boolean(error);
    const hasDescription = Boolean(description);
    function toggle(nextValue: string, checked: boolean | "indeterminate") {
        const isChecked = checked === true;
        const next = isChecked ? [...new Set([...value, nextValue])] : value.filter((item) => item !== nextValue);
        onValueChange(next);
    }
    return (<FieldRoot as="fieldset" aria-describedby={describedBy(descriptionId, errorId, hasDescription, hasError)} css={{ border: 0, margin: 0, padding: 0, ...css }}>
      <FieldLabel as="legend">{label}</FieldLabel>
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      <Stack gap="$3" css={{ marginTop: "$2" }}>
        {options.map((option) => {
            const checked = value.includes(option.value);
            return (<ChoiceRow key={option.value}>
              <CheckboxRoot checked={checked} disabled={disabled || option.disabled} aria-invalid={hasError || undefined} onCheckedChange={(nextChecked) => toggle(option.value, nextChecked)}>
                <CheckboxIndicator />
              </CheckboxRoot>
              <span>{option.label}</span>
            </ChoiceRow>);
        })}
      </Stack>
      {error ? <FieldError id={errorId} role="alert">{error}</FieldError> : null}
    </FieldRoot>);
}
