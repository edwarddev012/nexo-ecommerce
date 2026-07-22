import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, CreditCard, ShieldCheck } from "lucide-react";

export default function CheckoutModal({
  isOpen,
  onClose,
  totalAmount,
  onPaymentSuccess,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulamos una carga de red premium de 2 segundos
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (onPaymentSuccess) onPaymentSuccess();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Fondo difuminado premium */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isProcessing ? onClose : undefined}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Tarjeta del Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            style={{
              position: "relative",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              width: "100%",
              maxWidth: "440px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              zIndex: 10001,
              overflow: "hidden",
            }}
          >
            {/* Botón Cerrar (Solo si no está procesando o si ya terminó) */}
            {!isProcessing && (
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#888",
                }}
              >
                <X size={20} />
              </button>
            )}

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                // --- VISTA 1: FORMULARIO DE PAGO ---
                <motion.div
                  key="checkout-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "1.3rem",
                      fontWeight: "600",
                      color: "#111",
                    }}
                  >
                    Pago Express
                  </h3>
                  <p
                    style={{
                      margin: "0 0 20px 0",
                      fontSize: "0.85rem",
                      color: "#666",
                    }}
                  >
                    Demostración de flujo de un checkout rápido.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          color: "#444",
                          marginBottom: "4px",
                          textTransform: "uppercase",
                        }}
                      >
                        Nombre en la tarjeta
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        disabled={isProcessing}
                        style={{
                          width: "100%",
                          padding: "12px",
                          borderRadius: "8px",
                          border: "1px solid #e5e5e5",
                          fontSize: "0.9rem",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          color: "#444",
                          marginBottom: "4px",
                          textTransform: "uppercase",
                        }}
                      >
                        Número de Tarjeta
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type="text"
                          required
                          maxLength="19"
                          placeholder="4242 4242 4242 4242"
                          disabled={isProcessing}
                          style={{
                            width: "100%",
                            padding: "12px 12px 12px 40px",
                            borderRadius: "8px",
                            border: "1px solid #e5e5e5",
                            fontSize: "0.9rem",
                            boxSizing: "border-box",
                          }}
                        />
                        <CreditCard
                          size={16}
                          style={{
                            position: "absolute",
                            left: "14px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#999",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
                      <div style={{ flex: 1 }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            color: "#444",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                          }}
                        >
                          Expiración
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/AA"
                          maxLength="5"
                          disabled={isProcessing}
                          style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #e5e5e5",
                            fontSize: "0.9rem",
                            boxSizing: "border-box",
                            textAlign: "center",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            color: "#444",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                          }}
                        >
                          CVC
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="•••"
                          maxLength="3"
                          disabled={isProcessing}
                          style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #e5e5e5",
                            fontSize: "0.9rem",
                            boxSizing: "border-box",
                            textAlign: "center",
                          }}
                        />
                      </div>
                    </div>

                    {/* Resumen de Pago */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "10px",
                        padding: "12px",
                        background: "#f9f9f9",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                      }}
                    >
                      <span style={{ color: "#555" }}>Total a pagar:</span>
                      <span style={{ color: "#111" }}>
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>

                    {/* Botón de Acción Principal */}
                    <motion.button
                      type="submit"
                      disabled={isProcessing}
                      whileHover={!isProcessing ? { scale: 1.02 } : {}}
                      whileTap={!isProcessing ? { scale: 0.98 } : {}}
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "9999px",
                        border: "none",
                        background: "#111",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "0.95rem",
                        cursor: isProcessing ? "not-allowed" : "pointer",
                        position: "relative",
                        marginTop: "10px",
                      }}
                    >
                      {isProcessing ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                          style={{
                            display: "inline-block",
                            width: "18px",
                            height: "18px",
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTopColor: "#fff",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        `Pagar $${totalAmount.toFixed(2)}`
                      )}
                    </motion.button>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        color: "#888",
                        fontSize: "0.75rem",
                        marginTop: "4px",
                      }}
                    >
                      <ShieldCheck size={14} style={{ color: "#10b981" }} />{" "}
                      Entorno de simulación seguro
                    </div>
                  </form>
                </motion.div>
              ) : (
                // --- VISTA 2: PANTALLA DE ÉXITO ANIMADA ---
                <motion.div
                  key="checkout-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "20px 0 10px 0" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    style={{
                      color: "#10b981",
                      display: "inline-block",
                      marginBottom: "16px",
                    }}
                  >
                    <CheckCircle size={64} strokeWidth={1.5} />
                  </motion.div>

                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "1.4rem",
                      fontWeight: "600",
                      color: "#111",
                    }}
                  >
                    ¡Compra Completada!
                  </h3>
                  <p
                    style={{
                      margin: "0 0 24px 0",
                      fontSize: "0.9rem",
                      color: "#666",
                      lineHeight: "1.4",
                    }}
                  >
                    El pago se ha procesado con éxito. Las micro-transacciones
                    han finalizado.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onClose();
                      // Pequeño delay para resetear el estado después de cerrar
                      setTimeout(() => setIsSuccess(false), 300);
                    }}
                    style={{
                      padding: "10px 24px",
                      borderRadius: "9999px",
                      border: "1px solid #eee",
                      background: "#fff",
                      color: "#111",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  >
                    Volver a la Tienda
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
