import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function NavbarCart({ cartItems = [] }) {
  // Calculamos el total de productos de forma idéntica a como lo haces en el drawer
  const totalItems =
    cartItems && Array.isArray(cartItems)
      ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
      : 0;

  return (
    <motion.button
      className="header-btn"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        position: "relative", // Importante para posicionar el número flotante
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 🚀 EL TRUCO: Al usar key={totalItems}, Framer Motion desmonta y vuelve a ejecutar 
          esta animación elástica CADA VEZ que el número cambia */}
      <motion.div
        key={totalItems}
        animate={
          totalItems > 0
            ? {
                rotate: [0, -15, 12, -10, 8, -4, 0],
                scale: [1, 1.25, 1.25, 1.05, 1.05, 1, 1],
              }
            : {}
        }
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ShoppingBag size={24} style={{ color: "#111" }} />
      </motion.div>

      {/* Badge dinámico para la cantidad de productos */}
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            background: "#111",
            color: "#fff",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            fontSize: "0.7rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {totalItems}
        </motion.span>
      )}
    </motion.button>
  );
}
