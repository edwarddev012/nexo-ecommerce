import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Trash2, Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Variantes elásticas de panel lateral idénticas al CartDrawer
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

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems = [],
  onRemove,
  onMoveToCart,
}) {
  const drawerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Asegura renderizado solo en cliente (evita pantallas en blanco y errores SSR)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Manejo de clic afuera, tecla Escape y bloqueo de scroll
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

  if (!isMounted || typeof document === "undefined" || !document.body) {
    return null;
  }

  const totalItems = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

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
          {/* Overlay / Fondo oscuro idéntico al carrito */}
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
            className="wishlist-drawer"
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
            {/* Header de la Lista de Deseos */}
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
                    scale: [1, 1.25, 1],
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Heart size={20} style={{ color: "#111", fill: "#111" }} />
                </motion.div>

                <h3
                  style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}
                >
                  Tu Lista de Deseos
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
                aria-label="Cerrar lista de deseos"
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

            {/* Cuerpo de la Lista de Deseos */}
            <div
              className="drawer-body"
              style={{
                flex: 1,
                overflowY: "auto",
                overscrollBehavior:
                  "contain" /* <--- IMPIDE que el scroll traspase al fondo */,
                WebkitOverflowScrolling:
                  "touch" /* <--- Scroll suave y nativo en iOS */,
                padding: "20px",
                position: "relative",
              }}
            >
              <AnimatePresence mode="popLayout">
                {totalItems === 0 ? (
                  <motion.div
                    key="empty-wishlist-state"
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
                    <Heart
                      strokeWidth={1}
                      size={48}
                      style={{ marginBottom: "16px", color: "#ccc" }}
                    />
                    <h4 style={{ margin: "0 0 8px 0", color: "#222" }}>
                      Tu lista está vacía
                    </h4>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        margin: "0 0 20px 0",
                        color: "#666",
                      }}
                    >
                      Toca el icono de corazón en cualquier producto para
                      guardarlo aquí.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={onClose}
                      style={{ padding: "10px 20px", fontSize: "0.9rem" }}
                    >
                      Explorar Productos
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="wishlist-items-container"
                    className="wishlist-items-list"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {wishlistItems.map((product) => (
                      <motion.div
                        key={product.id}
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
                        className="wishlist-item"
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
                          src={product.image}
                          alt={product.name}
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
                            {product.name}
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
                            ${product.price ? product.price.toFixed(2) : "0.00"}
                          </span>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            {/* Botón para mover al carrito */}
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onMoveToCart(product)}
                              className="btn btn-primary"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 14px",
                                fontSize: "0.8rem",
                                borderRadius: "9999px",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              <ShoppingCart size={13} />
                              <span>Añadir</span>
                            </motion.button>

                            {/* Botón de eliminar */}
                            <motion.button
                              whileHover={{ scale: 1.15, color: "#ff4b4b" }}
                              whileTap={{ scale: 0.85 }}
                              onClick={() => onRemove(product.id)}
                              aria-label="Remove item"
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
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
