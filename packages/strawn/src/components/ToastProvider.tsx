import { useMemo, useState, type ReactNode } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import type { ToastContextValue, ToastMessage } from "../types/primitives";
import { Toast } from "./Toast";
import { ToastContext } from "./ToastContext";
import { ToastViewport } from "./ToastViewport";

export function ToastProvider({ children }: {
    children: ReactNode;
}) {
    const [messages, setMessages] = useState<ToastMessage[]>([]);
    const contextValue = useMemo<ToastContextValue>(() => ({
        showToast(message) {
            const id = message.id ?? `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            setMessages((current) => [...current.filter((item) => item.id !== id), { ...message, id }]);
            return id;
        },
        dismissToast(id) {
            setMessages((current) => current.filter((item) => item.id !== id));
        },
    }), []);
    return (<ToastContext.Provider value={contextValue}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {messages.map((message) => (<Toast key={message.id} {...message} onOpenChange={(open) => {
                if (!open)
                    contextValue.dismissToast(message.id);
            }}/>))}
        <ToastViewport />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>);
}
