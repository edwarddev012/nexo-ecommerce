// src/components/ProductCard.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Check } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { getProductImage } from "../utils/imageHelper"; // 👈 IMPORTAMOS

export default function ProductCard({
  product,
  isWishlisted,
  cart = [],
  onProductClick,
  onAddToCart,
  onToggleWishlist,
}) {
  const { showToast } = useToast();
  const isAdded = cart.some((item) => item?.product?.id === product.id);
  const [isFlying, setIsFlying] = useState(false);

  // 👇 GENERAMOS LA IMAGEN CON NUESTRO HELPER
  const imageUrl = product.image;

  // Estado para manejar errores de imagen
  const [imgError, setImgError] = useState(false);

  // Si la imagen falla, usamos un fallback de Picsum
  const finalImageUrl = imgError ? "/images/placeholder.jpg" : imageUrl;

  const handleAddToCart = (e) => {
    if (!isAdded) {
      setIsFlying(true);
      if (window.triggerCartBounce) {
        window.triggerCartBounce();
      }
      onAddToCart(product, 1);
      showToast(
        `¡Excelente elección! "${product.name}" se sumó al carrito.`,
        "success",
      );
    }
  };

  const handleWishlistToggle = () => {
    onToggleWishlist(product.id);
    if (!isWishlisted) {
      showToast(`Añadido a tu lista de deseos ❤️`, "info");
    } else {
      showToast(`Eliminado de tu lista de deseos`, "info");
    }
  };

  return (
    <div
      className="product-card"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#fff",
        padding: "16px",
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.04)",
        boxSizing: "border-box",
      }}
    >
      <AnimatePresence>
        {isFlying && (
          <motion.img
            src={finalImageUrl} // 👈 USAMOS LA IMAGEN GENERADA
            alt="flying-item"
            style={{
              position: "absolute",
              top: "70%",
              left: "40%",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              zIndex: 99,
              objectFit: "cover",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
            animate={{
              top: "-180px",
              left: "110%",
              scale: 0.1,
              opacity: [1, 0.9, 0],
              rotate: 270,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.8,
              ease: "easeOut",
            }}
            onAnimationComplete={() => setIsFlying(false)}
          />
        )}
      </AnimatePresence>

      <div
        className="product-card-image-container"
        onClick={() => onProductClick(product)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={finalImageUrl} // 👈 USAMOS LA IMAGEN GENERADA
          alt={product.name}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
          onError={() => setImgError(true)} // 👈 MANEJAMOS ERRORES
        />
      </div>

      {/* ... El resto de tu código se mantiene igual ... */}
      <div
        className="product-card-info"
        style={{
          marginTop: "12px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          boxSizing: "border-box",
        }}
      >
        <span
          className="product-category"
          style={{ fontSize: "0.75rem", color: "#888" }}
        >
          {product.category}
        </span>

        <h3
          style={{
            fontSize: "1rem",
            margin: "4px 0",
            color: "#111",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.name}
        </h3>

        <p
          className="product-price"
          style={{ fontWeight: "600", color: "#111", marginBottom: "16px" }}
        >
          ${product.price}
        </p>

        <div
          className="product-card-actions"
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "auto",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <motion.button
            whileHover={
              !isAdded ? { scale: 1.02, backgroundColor: "#f9f9f9", y: -1 } : {}
            }
            whileTap={!isAdded ? { scale: 0.96, y: 1 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={handleAddToCart}
            disabled={isAdded}
            style={{
              flex: 1,
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 12px",
              borderRadius: "9999px",
              cursor: isAdded ? "default" : "pointer",
              backgroundColor: isAdded ? "#10b981" : "#ffffff",
              border: isAdded
                ? "1px solid #10b981"
                : "1px solid rgba(0, 0, 0, 0.08)",
              transition: "background-color 0.2s ease, border 0.2s ease",
            }}
          >
            {isAdded ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  lineHeight: 1,
                }}
              >
                <Check size={18} style={{ color: "#ffffff", flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                  }}
                >
                  Añadido
                </span>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  lineHeight: 1,
                }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: [-10, 10, -10, 0] }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ShoppingBag size={18} style={{ color: "#111111" }} />
                </motion.div>
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "#111111",
                    whiteSpace: "nowrap",
                  }}
                >
                  Añadir al carrito
                </span>
              </div>
            )}
          </motion.button>

          <motion.button
            className={`btn-wishlist-toggle ${isWishlisted ? "active" : ""}`}
            onClick={handleWishlistToggle}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.92, y: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            style={{
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.08)",
              background: isWishlisted ? "#fff0f0" : "#fff",
              cursor: "pointer",
              color: isWishlisted ? "#ff4b4b" : "#666",
              transition: "background 0.3s ease, color 0.3s ease",
              flexShrink: 0,
            }}
          >
            <motion.div
              key={isWishlisted ? "active" : "inactive"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              style={{ display: "flex" }}
            >
              <Heart
                size={18}
                fill={isWishlisted ? "#ff4b4b" : "none"}
                strokeWidth={isWishlisted ? 1.5 : 2}
              />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
