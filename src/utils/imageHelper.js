// src/utils/imageHelper.js

/**
 * Genera una URL de imagen confiable para cada producto
 * @param {number} productId - ID único del producto
 * @param {string} fallbackImage - Imagen original (por si acaso)
 * @returns {string} URL de la imagen
 */
export const getProductImage = (productId, fallbackImage = null) => {
  // Opción 1: Usar Picsum (más confiable)
  const picsumUrl = `https://picsum.photos/seed/${productId}/400/400`;

  // Opción 2: Usar FakeStore API (alternativa)
  // const fakestoreUrl = `https://fakestoreapi.com/img/${productId}.jpg`;

  // Opción 3: Usar la imagen original de Unsplash (con cache-busting)
  if (fallbackImage) {
    return `${fallbackImage}&t=${Date.now()}`;
  }

  return picsumUrl;
};

/**
 * Genera múltiples imágenes para un producto (galería)
 */
export const getProductGallery = (productId, count = 4) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/seed/${productId}-${i + 1}/400/400`,
    alt: `Imagen ${i + 1}`,
  }));
};

/**
 * Verifica si una imagen es válida
 */
export const isValidImageUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
