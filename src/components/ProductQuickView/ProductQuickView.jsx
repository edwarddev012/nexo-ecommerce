import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Check } from "lucide-react";
// Opcional: Si integraste los estilos del modal en styles.css, puedes omitir la siguiente línea
import "./QuickView.css";

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  cart = [],
  wishlist = [],
}) {
  if (!product) return null;

  const isAdded = cart.some((item) => item?.product?.id === product.id);
  const isFavorite = wishlist.some((item) => item.id === product.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-container"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de Cierre */}
            <button className="modal-close-btn" onClick={onClose}>
              <X size={18} />
            </button>

            {/* 👇 AQUÍ dentro de <motion.div className="modal-container"> 
                agregas las dos columnas con la info de tu producto */}
            <div className="modal-body-grid">
              {/* Columna 1: Imagen del Producto */}
              <div className="modal-image-section">
                <img src={product.image} alt={product.name} />
              </div>

              {/* Columna 2: Detalles y Acciones */}
              <div className="modal-info-section">
                <h2>{product.name}</h2>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>

                <div className="actions-wrapper">
                  <button
                    className={`btn-add-cart ${isAdded ? "added" : ""}`}
                    onClick={() => onAddToCart(product)}
                    disabled={isAdded}
                  >
                    {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
                    {isAdded ? "¡Añadido al Carrito!" : "Añadir al Carrito"}
                  </button>

                  <button
                    className={`btn-wishlist ${isFavorite ? "active" : ""}`}
                    onClick={() => onToggleWishlist(product)}
                  >
                    <Heart
                      size={18}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Resto de la estructura de 2 columnas (.modal-body-grid, etc.) */}
            {/* ... */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
