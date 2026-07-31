import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Check } from "lucide-react";
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

  const isAdded = cart.some(
    (item) => (item?.id || item?.product?.id) === product.id,
  );
  const isFavorite = wishlist.some(
    (item) => (item?.id || item?.product?.id) === product.id,
  );

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

            {/* Layout de 2 columnas original */}
            <div className="modal-body-grid">
              {/* Columna Izquierda: Imagen */}
              <div className="modal-image-section">
                <img src={product.image} alt={product.name} />
              </div>

              {/* Columna Derecha: Detalles */}
              <div className="modal-info-section">
                <div>
                  <h2 className="modal-title">{product.name}</h2>
                  <p className="modal-price">${product.price}</p>
                  <p className="modal-description">{product.description}</p>
                </div>

                {/* Botones de Acción */}
                <div className="actions-wrapper">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`btn-add-cart ${isAdded ? "added" : ""}`}
                    onClick={() => onAddToCart(product)}
                    disabled={isAdded}
                  >
                    {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
                    <span>
                      {isAdded ? "¡Añadido al Carrito!" : "Añadir al Carrito"}
                    </span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    className={`btn-wishlist ${isFavorite ? "active" : ""}`}
                    onClick={() => onToggleWishlist(product)}
                  >
                    <Heart
                      size={18}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
