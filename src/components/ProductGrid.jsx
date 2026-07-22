import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGrid({
  products = [], // 👈 Usaremos esta prop directamente
  isLoading,
  wishlist = [],
  cart = [],
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  onResetFilters,
}) {
  return (
    <div style={{ width: "100%", display: "block" }}>
      <motion.div
        layout
        className="products-grid"
        style={{
          display: "grid",
          width: "100%",
          minWidth: "100%",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          alignItems: "stretch",
          justifyContent: "stretch",
        }}
      >
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <motion.div
              key="loading-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
                width: "100%",
              }}
            >
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={`loading-skeleton-${idx}`}
                  style={{
                    width: "100%",
                    height: "380px",
                    background: "#f4f4f7",
                    borderRadius: "16px",
                    animation: "pulse 1.5s infinite",
                  }}
                />
              ))}
            </motion.div>
          ) : products.length === 0 ? ( // 👈 Cambiado a products
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "48px 24px",
                width: "100%",
              }}
            >
              <p style={{ color: "#666", marginBottom: "16px" }}>
                No se encontraron productos.
              </p>
              <button className="btn btn-secondary" onClick={onResetFilters}>
                Limpiar Filtros
              </button>
            </motion.div>
          ) : (
            // 👈 Mapeamos directamente la prop 'products' limpia y paginada
            products.map((product, index) => {
              if (!product) return null;
              return (
                <motion.div
                  key={`product-${product.id}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    width: "100%",
                    minWidth: "100%",
                    display: "flex",
                    justifyContent: "stretch",
                  }}
                >
                  <ProductCard
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    cart={cart}
                    onProductClick={onProductClick}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                  />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
