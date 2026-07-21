import { CloseIcon, SearchIcon } from "strawn-icons";
import type { SearchFieldProps } from "../types/primitives";
import { BareInput } from "./BareInput";
import { Box } from "./Box";
import { ControlFrame } from "./ControlFrame";
import { FieldDescription } from "./FieldDescription";
import { FieldError } from "./FieldError";
import { FieldLabel } from "./FieldLabel";
import { FieldRoot } from "./FieldRoot";
import { IconButton } from "./IconButton";
import { describedBy } from "../helpers/describedBy";
import { useFieldIds } from "../helpers/useFieldIds";

export function SearchField({ id, label, description, error, disabled, required, css, clearLabel = "Clear search", onClear, ...props }: SearchFieldProps) {
  const { inputId, descriptionId, errorId } = useFieldIds(id);
  const hasDescription = Boolean(description);
  const hasError = Boolean(error);

  return (
    <FieldRoot css={css}>
      <FieldLabel htmlFor={inputId}>
        {label}
        {required ? " *" : null}
      </FieldLabel>
      <ControlFrame invalid={hasError} aria-disabled={disabled}>
        <Box as="span" css={{ color: "$mutedForeground", display: "inline-flex", flexShrink: 0 }}>
          <SearchIcon aria-hidden="true" size={16} />
        </Box>
        <BareInput
          id={inputId}
          type="search"
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy(descriptionId, errorId, hasDescription, hasError)}
          {...props}
        />
        {onClear ? (
        <IconButton
          aria-controls={inputId}
          label={clearLabel}
          icon={<CloseIcon aria-hidden="true" size={14} />}
          size="xs"
          variant="ghost"
          disabled={disabled}
          onClick={onClear}
        />
        ) : null}
      </ControlFrame>
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      {error ? <FieldError id={errorId} role="alert">{error}</FieldError> : null}
    </FieldRoot>
  );
}
