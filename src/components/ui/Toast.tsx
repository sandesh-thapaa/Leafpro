"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  undoAction?: () => void;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, undoAction?: () => void) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
};

const iconColors = {
  success: "text-green-500",
  error: "text-red-500",
  info: "text-blue-500",
  warning: "text-amber-500",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", undoAction?: () => void) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, type, message, undoAction }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-60 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const Icon = icons[toast.type];
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`
                  pointer-events-auto flex items-start gap-3 px-4 py-3
                  rounded-xl border shadow-lg
                  min-w-[320px] max-w-[420px]
                  ${colors[toast.type]}
                `}
              >
                <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${iconColors[toast.type]}`} />
                <p className="text-sm font-medium flex-1">{toast.message}</p>
                <div className="flex items-center gap-2 shrink-0">
                  {toast.undoAction && (
                    <button
                      onClick={() => {
                        toast.undoAction!();
                        removeToast(toast.id);
                      }}
                      className="text-xs font-semibold underline hover:no-underline"
                    >
                      Undo
                    </button>
                  )}
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="p-0.5 rounded hover:bg-black/5 transition-colors"
                    aria-label="Dismiss"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
