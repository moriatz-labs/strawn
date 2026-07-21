import type { ReactNode } from "react";
import type { CSS } from "../stitches";

export type CsvImportDialogProps = {
  trigger: ReactNode;
  title?: string;
  description?: ReactNode;
  chooseFileLabel?: string;
  closeLabel?: string;
  accept?: string;
  maxSizeBytes?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onFileSelect: (file: File) => void | Promise<void>;
  css?: CSS;
};
