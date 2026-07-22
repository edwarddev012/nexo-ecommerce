// scripts/fixImages.js
const fs = require("fs");
const path = require("path");

// Ruta al archivo products.js
const productsPath = path.join(__dirname, "../src/data/products.js");

// Leer el archivo actual
const content = fs.readFileSync(productsPath, "utf8");

// Extraer el array de productos (esto es un poco rudimentario, pero funciona)
// NOTA: Para una solución más robusta, usarías un parser de JavaScript
const productsMatch = content.match(/const products = (\[[\s\S]*?\]);/);
if (!productsMatch) {
  console.error("❌ No se pudo encontrar el array products");
  process.exit(1);
}

let products;
try {
  // Evaluar el array (esto es solo para el script, no en producción)
  products = eval(productsMatch[1]);
} catch (e) {
  console.error("❌ Error al parsear products:", e);
  process.exit(1);
}

// Modificar cada producto para usar Picsum
const fixedProducts = products.map((p) => ({
  ...p,
  image: `https://picsum.photos/seed/${p.id}/400/400`,
}));

// Generar nuevo contenido
const newContent = content.replace(
  /const products = \[[\s\S]*?\];/,
  `const products = ${JSON.stringify(fixedProducts, null, 2)};`,
);

// Guardar el archivo
fs.writeFileSync(productsPath, newContent, "utf8");

console.log(`✅ ¡${products.length} productos actualizados correctamente!`);
console.log("📝 Todas las imágenes ahora usan Picsum como fuente");
console.log("🔄 Recuerda: npm run dev para ver los cambios");
