import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Variantes elásticas premium para consistencia total
const drawerVariants = {
  hidden: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      ease: [0.25, 1, 0.5, 1],
      duration: 0.35,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

const itemVariants = {
  initial: { opacity: 0, x: 20, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: {
    opacity: 0,
    x: 60,
    scale: 0.92,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemove,
  totalAmount = 0,
  onCheckout,
  isProcessing = false,
}) {
  const drawerRef = useRef(null);
  const isInitialMount = useRef(true);

  // SOLUCIÓN A LA PANTALLA EN BLANCO: Estado para verificar si ya estamos en el cliente
  const [isMounted, setIsMounted] = useState(false);

  // Cálculo seguro del total de productos
  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
    : 0;

  // Garantizar que el componente solo intente renderizar en el navegador
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Efecto 1: Notificar cambios al Navbar para la animación "shake"
  useEffect(() => {
    if (!isMounted) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (totalItems > 0 && typeof window !== "undefined") {
      const event = new CustomEvent("shakeNavbarCart");
      window.dispatchEvent(event);
    }
  }, [totalItems, isMounted]);

  // Efecto 2: Controlar clics fuera, tecla Escape y scroll
  useEffect(() => {
    if (!isOpen || !isMounted) return;

    const handleOutsideClick = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        if (
          event.target.closest(".header-btn") ||
          event.target.closest(".btn-icon")
        ) {
          return;
        }
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick, true);
    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, isMounted]);

  // Si no está montado en el cliente o no hay body, no renderizamos absolutamente nada todavía
  if (!isMounted || typeof document === "undefined" || !document.body) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="drawer-manager"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "auto",
          }}
        >
          {/* Overlay / Fondo oscuro */}
          <motion.div
            className="drawer-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              cursor: "pointer",
            }}
          />

          {/* Contenedor principal del Drawer */}
          <motion.aside
            ref={drawerRef}
            className="cart-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "400px",
              maxWidth: "100%",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-8px 0 32px rgba(0, 0, 0, 0.15)",
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
              zIndex: 10000,
            }}
          >
            {/* Header del Carrito */}
            <div
              className="drawer-header"
              style={{
                padding: "20px",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <motion.div
                  key={totalItems}
                  animate={{
                    x: [0, -6, 6, -6, 6, 0],
                    rotate: [0, -8, 8, -8, 8, 0],
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <ShoppingBag size={20} style={{ color: "#111" }} />
                </motion.div>

                <h3
                  style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}
                >
                  Tu Carrito
                </h3>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    fontWeight: "500",
                  }}
                >
                  ({totalItems})
                </span>
              </div>

              <button
                className="btn-icon drawer-close-btn"
                onClick={onClose}
                aria-label="Cerrar carrito"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Cuerpo del Carrito */}
            <div
              className="drawer-body"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                position: "relative",
              }}
            >
              <AnimatePresence mode="popLayout">
                {totalItems === 0 ? (
                  <motion.div
                    key="empty-cart-state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      textAlign: "center",
                      color: "#888",
                      marginTop: "40px",
                    }}
                  >
                    <ShoppingBag
                      strokeWidth={1}
                      size={48}
                      style={{ marginBottom: "16px", color: "#ccc" }}
                    />
                    <h4 style={{ margin: "0 0 8px 0", color: "#222" }}>
                      Tu carrito está vacío
                    </h4>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        margin: "0 0 20px 0",
                        color: "#666",
                      }}
                    >
                      Parece que aún no has añadido productos.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={onClose}
                      style={{ padding: "10px 20px", fontSize: "0.9rem" }}
                    >
                      Continuar Comprando
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="cart-items-container"
                    className="cart-items-list"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        variants={itemVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                          type: "tween",
                          ease: [0.25, 1, 0.5, 1],
                          duration: 0.35,
                        }}
                        className="cart-item"
                        style={{
                          display: "flex",
                          gap: "16px",
                          padding: "12px",
                          background: "#f9f9f9",
                          borderRadius: "12px",
                          alignItems: "center",
                          border: "1px solid #eee",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "72px",
                            height: "72px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4
                            style={{
                              margin: "0 0 2px 0",
                              fontSize: "0.95rem",
                              fontWeight: "500",
                              color: "#111",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.name}
                          </h4>
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.9rem",
                              fontWeight: "600",
                              color: "#111",
                              marginBottom: "8px",
                            }}
                          >
                            $
                            {((item.price || 0) * (item.quantity || 1)).toFixed(
                              2,
                            )}
                          </span>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            {/* Selector de cantidad micro-animado */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                background: "#fff",
                                border: "1px solid #e5e5e5",
                                borderRadius: "9999px",
                                padding: "2px 6px",
                                overflow: "hidden",
                              }}
                            >
                              <motion.button
                                whileHover={
                                  item.quantity > 1
                                    ? {
                                        scale: 1.15,
                                        backgroundColor: "#f5f5f5",
                                      }
                                    : {}
                                }
                                whileTap={
                                  item.quantity > 1 ? { scale: 0.85 } : {}
                                }
                                onClick={() =>
                                  item.quantity > 1 &&
                                  onUpdateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor:
                                    item.quantity <= 1
                                      ? "not-allowed"
                                      : "pointer",
                                  padding: "6px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: item.quantity <= 1 ? "#ccc" : "#111",
                                }}
                              >
                                <Minus size={12} strokeWidth={2.5} />
                              </motion.button>

                              <div
                                style={{
                                  overflow: "hidden",
                                  height: "20px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <motion.span
                                  key={item.quantity}
                                  initial={{ y: 6, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                  }}
                                  style={{
                                    padding: "0 8px",
                                    fontSize: "0.85rem",
                                    fontWeight: "600",
                                    minWidth: "18px",
                                    textAlign: "center",
                                    display: "inline-block",
                                  }}
                                >
                                  {item.quantity}
                                </motion.span>
                              </div>

                              <motion.button
                                whileHover={{
                                  scale: 1.15,
                                  backgroundColor: "#f5f5f5",
                                }}
                                whileTap={{ scale: 0.85 }}
                                onClick={() =>
                                  onUpdateQuantity(item.id, item.quantity + 1)
                                }
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  padding: "6px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#111",
                                }}
                              >
                                <Plus size={12} strokeWidth={2.5} />
                              </motion.button>
                            </div>

                            {/* Botón de eliminar */}
                            <motion.button
                              whileHover={{ scale: 1.15, color: "#ff4b4b" }}
                              whileTap={{ scale: 0.85 }}
                              onClick={() => onRemove(item.id)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#888",
                                cursor: "pointer",
                                padding: "4px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Trash2 size={15} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Fijo */}
            {totalItems > 0 && (
              <div
                style={{
                  padding: "20px",
                  borderTop: "1px solid #eee",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#111",
                  }}
                >
                  <span>Total:</span>
                  <span>${(totalAmount || 0).toFixed(2)}</span>
                </div>
                <motion.button
                  whileHover={!isProcessing ? { scale: 1.01 } : {}}
                  whileTap={!isProcessing ? { scale: 0.99 } : {}}
                  onClick={onCheckout}
                  disabled={isProcessing}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "9999px",
                    fontWeight: "500",
                    fontSize: "0.95rem",
                    cursor: isProcessing ? "not-allowed" : "pointer",
                    opacity: isProcessing ? 0.7 : 1,
                  }}
                >
                  {isProcessing ? "Procesando..." : "Proceder al Pago"}
                </motion.button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
