import type { ChangeEventHandler, ComponentPropsWithoutRef, ElementType, MouseEventHandler, ReactNode, RefObject } from "react";
import type { CSS } from "../stitches";

export type ResponsiveValue<T> = T | Partial<Record<"initial" | "sm" | "md" | "lg" | "xl", T>>;

export type BoxProps = ComponentPropsWithoutRef<"div"> & {
  as?: ElementType;
  css?: CSS;
};

export type FlexProps = BoxProps & {
  align?: CSS["alignItems"];
  alignItems?: CSS["alignItems"];
  justifyContent?: CSS["justifyContent"];
  flexDirection?: CSS["flexDirection"];
  wrap?: CSS["flexWrap"];
  gap?: CSS["gap"];
};

export type GridProps = BoxProps & {
  columns?: ResponsiveValue<string>;
  gap?: CSS["gap"];
};

export type StackProps = BoxProps & {
  gap?: CSS["gap"];
};

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";
export type HeadingSize = "h1" | "h2" | "h3" | "h6";

export type TextProps = Omit<BoxProps, "as"> & {
  size?: TextSize;
  color?: CSS["color"];
};

export type HeadingProps = Omit<BoxProps, "as"> & {
  size?: HeadingSize;
  color?: CSS["color"];
};

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonTone = "black" | "white" | "blue" | "teal" | "amber" | "rose" | "plum";

export type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  css?: CSS;
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
};

export type IconButtonProps = Omit<ButtonProps, "leftIcon" | "rightIcon" | "children" | "size"> & {
  label: string;
  icon: ReactNode;
  size?: "xs" | ButtonSize;
};

export type TextFieldProps = Omit<ComponentPropsWithoutRef<"input">, "prefix"> & {
  label: string;
  description?: ReactNode;
  error?: ReactNode;
  css?: CSS;
};

export type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  hideLabel?: boolean;
  description?: ReactNode;
  error?: ReactNode;
  css?: CSS;
};

export type SearchFieldProps = Omit<TextFieldProps, "type"> & {
  clearLabel?: string;
  onClear?: MouseEventHandler<HTMLButtonElement>;
};

export type DrawerProps = {
  trigger: ReactNode;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  side?: "start" | "end" | "bottom";
  closeLabel?: string;
  css?: CSS;
};

export type SelectOption = {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
};

export type SelectProps = {
  id?: string;
  label: string;
  options: SelectOption[];
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onValueChange?: (value: string) => void;
  css?: CSS;
};

export type CheckboxGroupOption = SelectOption;

export type CheckboxGroupProps = {
  label: string;
  options: CheckboxGroupOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  description?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  css?: CSS;
};

export type SwitchProps = {
  label: string;
  hideLabel?: boolean;
  accentColor?: string;
  description?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  css?: CSS;
};

export type SliderProps = {
  label: string;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  description?: ReactNode;
  disabled?: boolean;
  css?: CSS;
};

export type DropdownMenuItem =
  | {
      type?: "item";
      label: string;
      onSelect?: () => void;
      disabled?: boolean;
      destructive?: boolean;
    }
  | {
      type: "separator";
    };

export type DropdownMenuProps = {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  label?: string;
  css?: CSS;
};

export type AccordionItem = {
  title: ReactNode;
  value: string;
  content: ReactNode;
  disabled?: boolean;
};

export type AccordionProps = {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  css?: CSS;
};

export type SegmentedControlOption = SelectOption & {
  icon?: ReactNode;
};

export type SegmentedControlProps = {
  label: string;
  options: SegmentedControlOption[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  css?: CSS;
};

export type TabsItem = {
  label: string;
  value: string;
  content: ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabsItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  css?: CSS;
};

export type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  label?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  css?: CSS;
};

export type DialogProps = {
  trigger: ReactNode;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  headerAlign?: "start" | "center";
  hideHeaderText?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeLabel?: string;
  css?: CSS;
};

export type ToastVariant = "info" | "success" | "error";

export type ToastMessage = {
  id: string;
  title: string;
  description?: ReactNode;
  variant?: ToastVariant;
};

export type ToastProps = ToastMessage & {
  onOpenChange?: (open: boolean) => void;
};

export type ToastContextValue = {
  showToast: (message: Omit<ToastMessage, "id"> & { id?: string }) => string;
  dismissToast: (id: string) => void;
};

export type AvatarProps = {
  src?: string;
  name: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
  decorative?: boolean;
  css?: CSS;
};

export type BadgeTone = "neutral" | "info" | "success" | "warning" | "error";

export type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  leadingIcon?: ReactNode;
  disabled?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
  css?: CSS;
};

export type ProgressProps = {
  label: string;
  value?: number;
  max?: number;
  indeterminate?: boolean;
  size?: "sm" | "md";
  css?: CSS;
};

export type SkeletonProps = {
  variant?: "text" | "block" | "avatar";
  width?: CSS["width"];
  height?: CSS["height"];
  lines?: number;
  css?: CSS;
};

export type AlertTone = "info" | "success" | "warning" | "error";

export type AlertProps = {
  title?: ReactNode;
  children: ReactNode;
  tone?: AlertTone;
  icon?: ReactNode;
  action?: ReactNode;
  css?: CSS;
};

export type FormFieldProps = {
  label: ReactNode;
  children: (field: { id: string; describedBy?: string; invalid?: boolean; required?: boolean }) => ReactNode;
  id?: string;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  css?: CSS;
};
