import React, { useState } from "react";
import { X, Star, ShoppingBag, Heart, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const {
    id,
    name,
    price,
    category,
    rating,
    reviewsCount,
    image,
    description,
    features = [],
  } = product;

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div style={{ position: "relative", zIndex: 1100 }}>
        {/* Fondo oscuro con toque táctil directo */}
        <motion.div
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100dvh", // 🟢 1. Usamos dvh (Dynamic Viewport Height) para corregir la barra del navegador móvil
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px", // Reducimos un poco el padding en pantallas chicas
            boxSizing: "border-box",
            overflow: "hidden", // Previene scroll no deseado en el fondo
          }}
        >
          <motion.div
            className="product-modal-card"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "800px",
              maxHeight: "85dvh", // 🟢 2. Control de altura segura para móviles
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {/* Botón de cierre flotante */}
            <motion.button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
              whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "white",
                border: "none",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 30,
              }}
            >
              <X size={18} color="#374151" />
            </motion.button>

            {/* Layout Interno con Flexbox responsivo sin romper el ancho */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch", // 🟢 3. Scroll suave nativo en iOS/Android
                padding: "20px 16px",
                gap: "16px",
              }}
            >
              {/* Contenedor adaptativo flexible */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column", // 🟢 4. Flex por defecto (columna en móviles)
                  gap: "16px",
                  width: "100%",
                }}
              >
                {/* Imagen */}
                <div
                  style={{
                    width: "100%",
                    height: "220px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={image}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: "12px",
                    }}
                  />
                </div>

                {/* Detalles */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                      paddingRight: "36px",
                    }}
                  >
                    <span
                      style={{
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        color: "#059669",
                        backgroundColor: "#ecfdf5",
                        padding: "4px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      {category}
                    </span>

                    <motion.button
                      onClick={() => onToggleWishlist(id)}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        background: isWishlisted
                          ? "rgba(255, 59, 48, 0.08)"
                          : "transparent",
                        border: "none",
                        color: isWishlisted ? "#ff3b30" : "#6b7280",
                        cursor: "pointer",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                      }}
                    >
                      <Heart
                        size={15}
                        style={{
                          fill: isWishlisted ? "#ff3b30" : "transparent",
                        }}
                      />
                      <span>{isWishlisted ? "Favorito" : "Guardar"}</span>
                    </motion.button>
                  </div>

                  <h2
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "8px",
                      lineHeight: "1.3",
                      wordBreak: "break-word", // Evita que textos largos rompan el ancho
                    }}
                  >
                    {name}
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            color={
                              i < Math.floor(rating) ? "#f59e0b" : "#d1d5db"
                            }
                            fill={
                              i < Math.floor(rating) ? "#f59e0b" : "transparent"
                            }
                          />
                        ))}
                      </div>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          color: "#111827",
                        }}
                      >
                        {rating ? rating.toFixed(1) : "5.0"}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                        ({reviewsCount})
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        color: "#10b981",
                      }}
                    >
                      ${price ? price.toFixed(2) : "0.00"}
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#4b5563",
                      lineHeight: "1.4",
                      marginBottom: "12px",
                    }}
                  >
                    {description}
                  </p>

                  {features && features.length > 0 && (
                    <div style={{ marginBottom: "12px" }}>
                      <h4
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: "6px",
                        }}
                      >
                        Especificaciones:
                      </h4>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                      >
                        {features.map((feature, i) => (
                          <li
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "0.8rem",
                              color: "#4b5563",
                            }}
                          >
                            <Check size={13} color="#10b981" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Controles del Carrito */}
              <div
                style={{
                  borderTop: "1px solid #f3f4f6",
                  paddingTop: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "nowrap", // Mantiene todo en una sola fila compacta
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={decrementQty}
                    style={{
                      padding: "8px 12px",
                      border: "none",
                      background: "#f9fafb",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      padding: "0 8px",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQty}
                    style={{
                      padding: "8px 12px",
                      border: "none",
                      background: "#f9fafb",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    +
                  </button>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    backgroundColor: "#10b981",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <ShoppingBag size={15} />
                  <span>Añadir — ${(price * quantity).toFixed(2)}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
