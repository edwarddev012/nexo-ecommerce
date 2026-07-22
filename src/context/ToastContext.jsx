import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const ToastContext = createContext(null);

// Animaciones fluidas para los Toasts (Aparecen desde la esquina superior derecha)
const toastVariants = {
  initial: { opacity: 0, y: -20, scale: 0.9, x: 50 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    x: 0,
    transition: { type: "spring", stiffness: 350, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    x: 80,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Función global para disparar alertas
  const showToast = useCallback(
    (message, type = "success", duration = 4000) => {
      const id = Date.now() + Math.random().toString(36).substr(2, 5);

      // Agregamos el nuevo toast a la lista
      setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

      // Auto-eliminar después del tiempo especificado
      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id),
        );
      }, duration);
    },
    [],
  );

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Configuración de estilos e iconos por tipo de alerta
  const getToastStyles = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "#f0fdf4",
          border: "#bbf7d0",
          text: "#166534",
          icon: <CheckCircle size={18} color="#15803d" />,
        };
      case "error":
        return {
          bg: "#fef2f2",
          border: "#fecaca",
          text: "#991b1b",
          icon: <AlertCircle size={18} color="#b91c1c" />,
        };
      case "info":
      default:
        return {
          bg: "#eff6ff",
          border: "#bfdbfe",
          text: "#1e40af",
          icon: <Info size={18} color="#1d4ed8" />,
        };
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Renderizamos los Toasts flotantes usando un Portal al final del <body> */}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            className="toast-container"
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 100000,
              display: "flex",
              flexDirection: "column-reverse",
              gap: "12px",
              pointerEvents: "none", // Permite clicks detrás del contenedor vacío
            }}
          >
            <AnimatePresence mode="popLayout">
              {toasts.map((toast) => {
                const styles = getToastStyles(toast.type);
                return (
                  <motion.div
                    key={toast.id}
                    layout
                    variants={toastVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                      pointerEvents: "auto", // Reactiva clicks dentro de la tarjeta
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 18px",
                      backgroundColor: styles.bg,
                      border: `1px solid ${styles.border}`,
                      borderRadius: "12px",
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                      minWidth: "280px",
                      maxWidth: "420px",
                      boxSizing: "border-box",
                    }}
                  >
                    {/* Icono del tipo */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {styles.icon}
                    </div>

                    {/* Mensaje */}
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: styles.text,
                        flex: 1,
                        lineHeight: "1.4",
                      }}
                    >
                      {toast.message}
                    </p>

                    {/* Botón de cerrar manual */}
                    <button
                      onClick={() => removeToast(toast.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                        color: styles.text,
                        opacity: 0.6,
                        borderRadius: "50%",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "0.6")
                      }
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

// Hook personalizado para usarlo limpiamente en tus componentes
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe ser usado dentro de un ToastProvider");
  }
  return context;
}
