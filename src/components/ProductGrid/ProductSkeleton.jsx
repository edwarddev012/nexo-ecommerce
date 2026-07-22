import React from "react";
import "./Skeleton.css"; // Asegúrate de importar tus estilos

export default function ProductSkeleton() {
  return (
    <div className="skeleton-product-card">
      {/* Contenedor de la Imagen */}
      <div className="skeleton-box skeleton-image" />
      
      {/* Categoría */}
      <div className="skeleton-box skeleton-category" />
      
      {/* Título del Producto */}
      <div className="skeleton-box skeleton-title" />
      
      {/* Precio */}
      <div className="skeleton-box skeleton-price" />
    </div>
  );
}