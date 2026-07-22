import { type ElementType } from "react";
import type { ButtonProps } from "../types/primitives";
import { ButtonContent } from "./ButtonContent";
import { Spinner } from "./Spinner";
import { SpinnerSlot } from "./SpinnerSlot";
import { StyledButton } from "./StyledButton";

export function Button({ children, leftIcon, rightIcon, loading = false, disabled, ...props }: ButtonProps) {
    const ButtonComponent = StyledButton as unknown as ElementType;
    return (<ButtonComponent disabled={disabled || loading} aria-busy={loading || undefined} data-loading={loading || undefined} {...props}>
      <ButtonContent data-button-content="true">
        {leftIcon ? <span data-button-icon="left">{leftIcon}</span> : null}
        {children}
        {rightIcon ? <span data-button-icon="right">{rightIcon}</span> : null}
      </ButtonContent>
      {loading ? <SpinnerSlot><Spinner aria-hidden="true"/></SpinnerSlot> : null}
    </ButtonComponent>);
}
