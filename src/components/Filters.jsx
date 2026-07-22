import React from "react";
import { RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Filters({
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  priceRange,
  setPriceRange,
  categories,
  maxProductPrice,
  onReset,
}) {
  // Comprobación de filtros modificados basada en el estado "All" original
  const isFiltered =
    selectedCategory !== "All" ||
    sortOption !== "featured" ||
    priceRange < maxProductPrice;

  return (
    <div className="catalog-filters">
      <div className="filters-row-categories">
        <div
          className="category-badges"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            width: "100%",
            boxSizing: "border-box",
            padding: "4px 0",
          }}
        >
          {categories.map((category, index) => {
            const isActive = selectedCategory === category;

            // Fila de 3 arriba y 2 abajo con su separación matemática limpia
            const flexBasisValue =
              index < 3 ? "calc(33.33% - 10px)" : "calc(50% - 8px)";

            const tamañoFuente = index < 3 ? "0.90rem" : "0.82rem";

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-badge ${isActive ? "active" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "54px",
                  padding: "0px 4px",
                  boxSizing: "border-box",
                  fontSize: tamañoFuente,
                  fontWeight: "600",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  flexGrow: 1,
                  flexShrink: 0,
                  flexBasis: flexBasisValue,
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.02em",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategory"
                    className="active-category-bg"
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 0,
                      borderRadius: "8px",
                      // CAMBIO CLAVE: Fondo gris claro premium. Las letras oscuras se verán perfectas encima.
                      backgroundColor: "#f4f4f5",
                    }}
                  />
                )}

                <span
                  style={{
                    zIndex: 1,
                    position: "relative",
                    width: "100%",
                    display: "block",
                    overflow: "visible",
                  }}
                >
                  {category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controles de Precio y Ordenamiento */}
      <div className="filters-row-controls">
        <div className="filter-control-group price-slider-group">
          <label htmlFor="price-slider">
            Precio Máx: <span className="price-value">${priceRange}</span>
          </label>
          <input
            id="price-slider"
            type="range"
            min="0"
            max={maxProductPrice}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="price-range-slider"
          />
        </div>

        <div className="filter-controls-right">
          <div className="filter-control-group sort-group">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
              aria-label="Ordenar productos"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating-desc">Mejor Valorados</option>
            </select>
          </div>

          <AnimatePresence>
            {isFiltered && (
              <motion.button
                className="btn btn-secondary btn-reset-filters btn-sm"
                onClick={onReset}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              ></motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
