import { type KeyboardEvent } from "react";
import type { SegmentedControlProps } from "../types/primitives";
import { FieldLabel } from "./FieldLabel";
import { FieldRoot } from "./FieldRoot";
import { SegmentButton } from "./SegmentButton";
import { SegmentRoot } from "./SegmentRoot";

export function SegmentedControl({ label, options, value, onValueChange, disabled, css, }: SegmentedControlProps) {
    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
        const movement = event.key === "ArrowRight" || event.key === "ArrowDown"
            ? 1
            : event.key === "ArrowLeft" || event.key === "ArrowUp"
                ? -1
                : 0;
        if (!movement)
            return;
        const buttons = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)') ?? []);
        const currentIndex = buttons.indexOf(event.currentTarget);
        const nextButton = buttons[(currentIndex + movement + buttons.length) % buttons.length];
        const nextValue = nextButton?.dataset.value;
        if (!nextButton || !nextValue)
            return;
        event.preventDefault();
        nextButton.focus();
        onValueChange(nextValue);
    }
    return (<FieldRoot css={css}>
      <FieldLabel as="span">{label}</FieldLabel>
      <SegmentRoot role="radiogroup" aria-label={label}>
        {options.map((option) => (<SegmentButton key={option.value} type="button" role="radio" active={option.value === value} aria-checked={option.value === value} data-value={option.value} tabIndex={option.value === value ? 0 : -1} disabled={disabled || option.disabled} onClick={() => onValueChange(option.value)} onKeyDown={handleKeyDown}>
            {option.icon}
            {option.label}
          </SegmentButton>))}
      </SegmentRoot>
    </FieldRoot>);
}
