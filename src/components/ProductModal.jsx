import React, { useState } from "react";
import { X, Star, ShoppingBag, Heart, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Variantes para el fondo oscuro difuminado
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Variantes elásticas premium para la tarjeta central (Spring Physics)
const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 15 },
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
  // Dejamos que AnimatePresence maneje el montaje/desmontaje de forma externa
  const [quantity, setQuantity] = useState(1);

  if (!product) return <AnimatePresence />;

  const {
    id,
    name,
    price,
    category,
    rating,
    reviewsCount,
    image,
    description,
    features,
    reviews,
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
        {/* Fondo difuminado con desenfoque de hardware */}
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
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          {/* Tarjeta de Producto Animada */}
          <motion.div
            className="product-modal-card"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              width: "940px",
              maxWidth: "100%",
              maxHeight: "90vh",
              position: "relative",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.12)",
              overflow: "hidden",
            }}
          >
            {/* Botón de cierre con micro-interacción de escala */}
            <motion.button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
              whileHover={{ scale: 1.1, backgroundColor: "#f5f5f5" }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "white",
                border: "none",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                zIndex: 10,
              }}
            >
              <X size={18} />
            </motion.button>

            <div className="modal-body-grid">
              {/* Sección de Imagen Izquierda */}
              <div className="modal-image-section">
                <img src={image} alt={name} className="modal-product-image" />
              </div>

              {/* Sección de Información Derecha (Desplazable de forma limpia) */}
              <div className="modal-info-section">
                <div className="modal-category-wishlist">
                  <span className="modal-category-tag">{category}</span>

                  {/* Botón interactivo de Lista de Deseos */}
                  <motion.button
                    className={`modal-wishlist-btn ${isWishlisted ? "active" : ""}`}
                    onClick={() => onToggleWishlist(id)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: isWishlisted
                        ? "rgba(255, 59, 48, 0.06)"
                        : "transparent",
                      border: "none",
                      color: isWishlisted ? "#ff3b30" : "#666666",
                      cursor: "pointer",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                    }}
                  >
                    <Heart
                      size={16}
                      style={{ fill: isWishlisted ? "#ff3b30" : "transparent" }}
                    />
                    <span>{isWishlisted ? "En favoritos" : "Guardar"}</span>
                  </motion.button>
                </div>

                <h2 className="modal-product-title">{name}</h2>

                <div className="modal-rating-price">
                  <div className="card-rating">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={
                            i < Math.floor(rating)
                              ? "star-icon-filled"
                              : "star-icon-empty"
                          }
                        />
                      ))}
                    </div>
                    <span className="rating-num-bold">{rating.toFixed(1)}</span>
                    <span className="rating-count">
                      ({reviewsCount} opiniones)
                    </span>
                  </div>
                  <div className="modal-price">${price.toFixed(2)}</div>
                </div>

                <div className="modal-divider" />

                <p className="modal-description">{description}</p>

                {/* Listado estético de características */}
                <div className="modal-features-list">
                  <h4>Especificaciones del producto</h4>
                  <ul>
                    {features.map((feature, i) => (
                      <li key={i}>
                        <Check size={14} className="feature-check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-divider" />

                {/* Controles de Compra Inferiores */}
                <div className="modal-action-row">
                  <div className="quantity-selector">
                    <button
                      className="qty-btn"
                      onClick={decrementQty}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={incrementQty}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Botón de checkout con respuesta física */}
                  <motion.button
                    className="btn btn-primary modal-add-to-cart-btn"
                    onClick={handleAddToCart}
                    whileHover={{ opacity: 0.9 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingBag size={16} />
                    Añadir al Carrito — ${(price * quantity).toFixed(2)}
                  </motion.button>
                </div>

                <div className="modal-divider" />

                {/* Resumen de Reviews */}
                <div className="modal-reviews-section">
                  <h4>Feedback de Clientes</h4>

                  <div className="reviews-summary-card">
                    <span className="reviews-average-score">
                      {rating.toFixed(1)}
                    </span>
                    <div className="reviews-average-details">
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.round(rating)
                                ? "star-icon-filled"
                                : "star-icon-empty"
                            }
                          />
                        ))}
                      </div>
                      <span className="rating-count">
                        Basado en {reviewsCount} calificaciones
                      </span>
                    </div>
                  </div>

                  <div className="reviews-list">
                    {reviews && reviews.length > 0 ? (
                      reviews.map((rev) => (
                        <div key={rev.id} className="review-item">
                          <div className="review-header">
                            <span className="review-author">{rev.name}</span>
                            <span className="review-date">{rev.date}</span>
                          </div>
                          <div
                            className="rating-stars"
                            style={{ margin: "4px 0" }}
                          >
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={11}
                                className={
                                  i < rev.rating
                                    ? "star-icon-filled"
                                    : "star-icon-empty"
                                }
                              />
                            ))}
                          </div>
                          <p className="review-comment">{rev.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="review-comment text-secondary">
                        No hay reseñas escritas para este producto todavía.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
