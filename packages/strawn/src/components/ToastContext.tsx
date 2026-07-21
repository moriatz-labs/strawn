import { createContext } from "react";
import type { ToastContextValue } from "../types/primitives";

export const ToastContext = createContext<ToastContextValue | null>(null);
