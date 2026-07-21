import type { CSSProperties } from "react";
import type { SwitchProps } from "../types/primitives";
import { FieldDescription } from "./FieldDescription";
import { FieldLabel } from "./FieldLabel";
import { FieldRoot } from "./FieldRoot";
import { SwitchCopy } from "./SwitchCopy";
import { SwitchRoot } from "./SwitchRoot";
import { SwitchRow } from "./SwitchRow";
import { SwitchThumb } from "./SwitchThumb";
import { useFieldIds } from "../helpers/useFieldIds";

export function Switch({ label, hideLabel = false, accentColor, description, checked, defaultChecked, onCheckedChange, disabled, css, }: SwitchProps) {
    const { inputId, descriptionId } = useFieldIds(undefined);
    const switchStyle = accentColor ? ({ "--switch-accent-color": accentColor } as CSSProperties) : undefined;
    return (<FieldRoot css={css}>
      <SwitchRow css={hideLabel ? { justifyContent: "center" } : undefined}>
        {hideLabel ? null : (<SwitchCopy>
            <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
            {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
          </SwitchCopy>)}
        <SwitchRoot id={inputId} aria-label={hideLabel ? label : undefined} checked={checked} defaultChecked={defaultChecked} onCheckedChange={onCheckedChange} disabled={disabled} aria-describedby={!hideLabel && description ? descriptionId : undefined} style={switchStyle}>
          <SwitchThumb />
        </SwitchRoot>
      </SwitchRow>
    </FieldRoot>);
}
