import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Star, ShoppingBag, Heart, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) {
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Bloquear el scroll de la página de fondo cuando el modal esté abierto
    if (product) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  if (!product || !mounted) return null;

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

  const modalContent = (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999, // Se superpone a absolutamente todo en el teléfono
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        {/* Fondo oscuro difuminado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        />

        {/* Tarjeta del Modal con límites de pantalla para móvil */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            zIndex: 10,
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "500px",
            maxHeight: "85vh", // Limita la altura para que NUNCA se salga del teléfono
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            overflow: "hidden", // Mantiene las esquinas redondeadas visibles
            boxSizing: "border-box",
          }}
        >
          {/* Botón X de Cierre siempre visible en la esquina superior derecha */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              zIndex: 50,
            }}
          >
            <X size={20} color="#374151" />
          </button>

          {/* ÁREA CON SCROLL INTERNO PARA MÓVILES */}
          <div
            style={{
              overflowY: "auto",
              WebkitOverflowScrolling: "touch", // Scroll fluido nativo en teléfonos
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Imagen del Producto adaptada */}
            <div
              style={{
                width: "100%",
                height: "180px",
                borderRadius: "14px",
                backgroundColor: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "10px",
              }}
            >
              <img
                src={image}
                alt={name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  padding: "8px",
                }}
              />
            </div>

            {/* Categoría y Favoritos */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: "32px",
              }}
            >
              <span
                style={{
                  textTransform: "uppercase",
                  fontSize: "0.68rem",
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

              <button
                onClick={() => onToggleWishlist(id)}
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
                  size={16}
                  style={{ fill: isWishlisted ? "#ff3b30" : "transparent" }}
                />
                <span>{isWishlisted ? "Favorito" : "Guardar"}</span>
              </button>
            </div>

            {/* Título y Precio */}
            <div>
              <h2
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: "6px",
                  lineHeight: "1.3",
                }}
              >
                {name}
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        color={i < Math.floor(rating) ? "#f59e0b" : "#d1d5db"}
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
            </div>

            {/* Descripción */}
            <p
              style={{
                fontSize: "0.85rem",
                color: "#4b5563",
                lineHeight: "1.4",
                margin: 0,
              }}
            >
              {description}
            </p>

            {/* Especificaciones */}
            {features && features.length > 0 && (
              <div>
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
                      <Check size={14} color="#10b981" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fila Inferior: Contador y Botón de Compra */}
            <div
              style={{
                borderTop: "1px solid #f3f4f6",
                paddingTop: "12px",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden",
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

              <button
                onClick={handleAddToCart}
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
                <ShoppingBag size={16} />
                <span>Añadir — ${(price * quantity).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  // Renderiza el modal directamente en el body usando un Portal
  return createPortal(modalContent, document.body);
}
