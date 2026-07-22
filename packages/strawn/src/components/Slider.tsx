import { useState } from "react";
import type { SliderProps } from "../types/primitives";
import { FieldDescription } from "./FieldDescription";
import { FieldLabel } from "./FieldLabel";
import { FieldRoot } from "./FieldRoot";
import { Flex } from "./Flex";
import { SliderRange } from "./SliderRange";
import { SliderRoot } from "./SliderRoot";
import { SliderThumb } from "./SliderThumb";
import { SliderTrack } from "./SliderTrack";
import { TextStyle } from "./TextStyle";
import { useFieldIds } from "../helpers/useFieldIds";

export function Slider({ label, value, defaultValue, onValueChange, min = 0, max = 100, step = 1, description, disabled, css, }: SliderProps) {
    const { inputId, descriptionId } = useFieldIds(undefined);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? [min]);
    const currentValue = value ?? uncontrolledValue;
    const visibleValue = currentValue[0] ?? min;
    const handleValueChange = (nextValue: number[]) => {
      if (value === undefined) setUncontrolledValue(nextValue);
      onValueChange?.(nextValue);
    };
    return (<FieldRoot css={css}>
      <Flex alignItems="center" justifyContent="space-between" gap="$3">
        <FieldLabel id={inputId}>{label}</FieldLabel>
        <TextStyle as="span" textStyle="label" tone="muted" css={{ fontFamily: "$mono" }}>
          {visibleValue}
        </TextStyle>
      </Flex>
      <SliderRoot value={currentValue} onValueChange={handleValueChange} min={min} max={max} step={step} disabled={disabled}>
        <SliderTrack data-slider-track="">
          <SliderRange />
        </SliderTrack>
        <SliderThumb aria-labelledby={inputId} aria-describedby={description ? descriptionId : undefined} />
      </SliderRoot>
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
    </FieldRoot>);
}
