// src/components/ToastNotification.jsx
import React from "react";
import { createPortal } from "react-dom"; // 👈 Importamos el portal de React
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";

export const ToastNotification = ({ message, type = "success", onClose }) => {
  // Configuración de estilos según el tipo de notificación (Mantenemos tus estilos idénticos)
  const toastStyles = {
    success: {
      bg: "bg-zinc-950/95 border-emerald-500/30 text-emerald-400",
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    },
    error: {
      bg: "bg-zinc-950/95 border-rose-500/30 text-rose-400",
      icon: <XCircle className="w-5 h-5 text-rose-400" />,
    },
    warning: {
      bg: "bg-zinc-950/95 border-amber-500/30 text-amber-400",
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    },
  };

  const currentStyle = toastStyles[type] || toastStyles.success;

  // Creamos la estructura exacta de tu diseño favorito
  const toastElement = (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        x: 40,
        scale: 0.95,
      }} /* Salida sutil hacia la derecha */
      transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1.0] }}
      className={`fixed bottom-6 right-6 z-[99999] flex items-center gap-3 px-4 py-3.5 rounded-xl border backdrop-blur-md shadow-2xl shadow-black/50 min-w-[300px] max-w-sm ${currentStyle.bg}`}
    >
      {/* Icono de Estado */}
      <div className="flex-shrink-0">{currentStyle.icon}</div>

      {/* Mensaje */}
      <p className="text-xs font-medium tracking-wide text-zinc-200 flex-grow pr-2">
        {message}
      </p>

      {/* Botón Cerrar */}
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );

  // 🚀 Teletransportamos el elemento directamente al body del HTML para escapar de cualquier contenedor rebelde
  return createPortal(toastElement, document.body);
};
