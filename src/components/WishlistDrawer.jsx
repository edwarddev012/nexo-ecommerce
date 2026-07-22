import React, { useRef, useEffect } from "react";
import { X, Trash2, Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Variantes elásticas premium idénticas al CartDrawer
const drawerVariants = {
  hidden: {
    opacity: 0,
    x: "100%", // Sincronizado para que entre limpiamente desde afuera de la pantalla
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      ease: [0.25, 1, 0.5, 1], // Curva de velocidad "Quint" idéntica para consistencia total
      duration: 0.35,
    },
  },
};

// Sincronizado exactamente con el CartDrawer para el fundido del fondo oscuro
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Variantes para el descarte lateral físico de cada producto
const itemVariants = {
  initial: { opacity: 0, x: 20, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: {
    opacity: 0,
    x: 60,
    scale: 0.92,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems = [],
  onRemove,
  onMoveToCart,
}) {
  // Referencia física para el panel lateral
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        if (event.target.closest(".header-btn") || event.target.closest(".btn-icon")) {
          return;
        }
        onClose();
      }
    };

    // Escuchamos los clics en toda la pantalla (fase de captura para máxima precisión)
    document.addEventListener("mousedown", handleOutsideClick, true);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        /* CONTENEDOR MAESTRO: Desactivado pointerEvents ("none") para dejar pasar el mouse al fondo */
        <div
          className="drawer-manager"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          {/* OVERLAY SUTIL: Animado pero traspasable al mouse */}
          <motion.div
            className="drawer-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.2)", // Bajado a 0.2 para mejor visibilidad del contenido trasero interactivo
              pointerEvents: "none", // 👈 El mouse ignora esta capa por completo
            }}
          />

          {/* PANEL LATERAL: Recupera el control del mouse ("auto") y detecta clics externos */}
          <motion.aside
            ref={drawerRef} // 👈 Conectamos la referencia aquí
            className="wishlist-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()} // Evita burbujeos accidentales
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
              pointerEvents: "auto", // 👈 ¡CLAVE! El mouse interactúa normalmente dentro de la lista
            }}
          >
            {/* Drawer Header */}
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
                className="drawer-title"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Heart
                  size={20}
                  className="icon-heart-filled"
                  style={{ fill: "#111111" }}
                />
                <h3
                  style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}
                >
                  Tu Lista de Deseos
                </h3>
                <span
                  className="wishlist-items-count"
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    fontWeight: "500",
                  }}
                >
                  ({wishlistItems ? wishlistItems.length : 0})
                </span>
              </div>
              <button
                className="btn-icon drawer-close-btn"
                onClick={onClose}
                aria-label="Close wishlist"
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

            {/* Drawer Body */}
            <div
              className="drawer-body"
              style={{ flex: 1, overflowY: "auto", padding: "20px" }}
            >
              {!wishlistItems || wishlistItems.length === 0 ? (
                <div
                  className="empty-drawer-state"
                  style={{
                    textAlign: "center",
                    color: "#888",
                    marginTop: "40px",
                  }}
                >
                  <Heart
                    size={48}
                    strokeWidth={1}
                    style={{ marginBottom: "16px" }}
                  />
                  <h3>Tu lista está vacía</h3>
                  <p style={{ fontSize: "0.9rem", marginBottom: "20px" }}>
                    Toca el icono de corazón en cualquier producto para
                    guardarlo aquí.
                  </p>
                  <button className="btn btn-primary" onClick={onClose}>
                    Explorar Productos
                  </button>
                </div>
              ) : (
                <div
                  className="wishlist-items-list"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    position: "relative",
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    {wishlistItems.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        variants={itemVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="wishlist-item"
                        style={{
                          display: "flex",
                          gap: "16px",
                          padding: "12px",
                          background: "#f9f9f9",
                          borderRadius: "12px",
                          alignItems: "center",
                          border: "1px solid #eee",
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="wishlist-item-image"
                          style={{
                            width: "72px",
                            height: "72px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="wishlist-item-info" style={{ flex: 1 }}>
                          <h4
                            style={{ margin: "0 0 2px 0", fontSize: "0.95rem" }}
                          >
                            {product.name}
                          </h4>
                          <span
                            className="wishlist-item-category"
                            style={{
                              display: "block",
                              fontSize: "0.8rem",
                              color: "#777",
                              marginBottom: "6px",
                            }}
                          >
                            {product.category}
                          </span>
                          <span
                            className="wishlist-item-price"
                            style={{
                              display: "block",
                              fontWeight: "600",
                              fontSize: "0.9rem",
                              color: "#111",
                            }}
                          >
                            ${product.price ? product.price.toFixed(2) : "0.00"}
                          </span>

                          <div
                            className="wishlist-item-actions"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              marginTop: "8px",
                            }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="btn btn-primary btn-sm btn-move-cart"
                              onClick={() => onMoveToCart(product)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 14px",
                                fontSize: "0.8rem",
                                borderRadius: "9999px",
                              }}
                            >
                              <ShoppingCart size={12} />
                              Añadir
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.15, color: "#ff4b4b" }}
                              whileTap={{ scale: 0.85 }}
                              className="btn-delete-item"
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
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
