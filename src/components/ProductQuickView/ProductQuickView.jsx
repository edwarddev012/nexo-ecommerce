import React from "react";
import { X, ShoppingBag, Check, Heart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./QuickView.css";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.93, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 28,
      mass: 0.9,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 12,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export default function ProductQuickView({
  isOpen,
  product,
  onClose,
  onAddToCart,
  cart = [], // 🚀 Recibimos el estado global del carrito
  isFavorite,
  onToggleWishlist,
}) {
  if (!product) return null;

  // Sincronización instantánea con el estado global de App.jsx
  const isAdded = cart.some((item) => item?.product?.id === product.id);

  const handleAddToCart = () => {
    if (!isAdded) {
      onAddToCart(product);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="quickview-manager"
          style={{ position: "fixed", inset: 0, zIndex: 2000 }}
        >
          <motion.div
            className="quickview-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              pointerEvents: "none",
            }}
          >
            <motion.div
              className="quickview-modal-card"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ pointerEvents: "auto" }}
            >
              <button
                className="quickview-close-btn"
                onClick={onClose}
                aria-label="Cerrar vista rápida"
              >
                <X size={20} />
              </button>

              <div className="quickview-grid-content">
                <div className="quickview-image-column">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="quickview-details-column">
                  <div className="quickview-meta">
                    <span className="quickview-tag">{product.category}</span>
                    <div className="quickview-rating">
                      <Star size={14} className="star-filled" />
                      <span>4.8 (24 reviews)</span>
                    </div>
                  </div>

                  <h2 className="quickview-title">{product.name}</h2>
                  <p className="quickview-price">
                    ${Number(product.price).toFixed(2)}
                  </p>

                  <p className="quickview-description">
                    {product.description ||
                      "Este producto de edición limitada redefine el minimalismo urbano, combinando materiales de primera calidad con una funcionalidad excepcional para tu día a día."}
                  </p>

                  <div
                    className="quickview-actions-footer"
                    style={{ display: "flex", gap: "12px", marginTop: "24px" }}
                  >
                    <motion.button
                      whileHover={
                        !isAdded
                          ? { scale: 1.02, backgroundColor: "#f9f9f9", y: -1 }
                          : {}
                      }
                      whileTap={!isAdded ? { scale: 0.97, y: 1 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                      onClick={handleAddToCart}
                      disabled={isAdded}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        borderRadius: "9999px",
                        padding: "14px 28px",
                        cursor: isAdded ? "default" : "pointer",
                        backgroundColor: isAdded ? "#10b981" : "#ffffff",
                        border: isAdded
                          ? "1px solid #10b981"
                          : "1px solid rgba(0, 0, 0, 0.08)",
                        transition:
                          "background-color 0.2s ease, border 0.2s ease",
                      }}
                    >
                      {isAdded ? (
                        <>
                          <Check size={18} style={{ color: "#ffffff" }} />
                          <span
                            style={{
                              fontWeight: "600",
                              color: "#ffffff",
                              fontSize: "0.95rem",
                            }}
                          >
                            ¡Añadido al Carrito!
                          </span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={18} style={{ color: "#111111" }} />
                          <span
                            style={{
                              fontWeight: "600",
                              color: "#111111",
                              fontSize: "0.95rem",
                            }}
                          >
                            Añadir al Carrito
                          </span>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      className={`btn-icon btn-wishlist-qv ${isFavorite ? "active" : ""}`}
                      onClick={() => onToggleWishlist(product.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.85 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                      aria-label="Añadir a lista de deseos"
                      style={{
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        border: "1px solid rgba(0,0,0,0.08)",
                        background: isFavorite ? "#fff0f0" : "#fff",
                        color: isFavorite ? "#ff4b4b" : "#666",
                        cursor: "pointer",
                        transition: "background 0.3s ease, color 0.3s ease",
                      }}
                    >
                      <motion.div
                        key={isFavorite ? "qv-active" : "qv-inactive"}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 12,
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Heart
                          size={20}
                          fill={isFavorite ? "#ff4b4b" : "none"}
                          strokeWidth={isFavorite ? 1.5 : 2}
                        />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
