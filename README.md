# ⚡ NEXO — E-Commerce Tech & Lifestyle

Plataforma de comercio electrónico minimalista desarrollada para ofrecer una experiencia de compra fluida, rápida e interactiva. Diseñada bajo una estética urbana/industrial con optimización de rendimiento en el lado del cliente.

🚀 **[Ver Demo en Vivo]https://nexo-ecommerce-mu.vercel.app/**

---

## 🛠️ Stack Tecnológico

* **Core:** React / Next.js
* **Animaciones & Micro-interacciones:** Framer Motion
* **Almacenamiento de Media:** Supabase Storage
* **Iconografía:** Lucide Icons
* **Estilos:** CSS3 / Módulos responsivos
* **Persistencia:** LocalStorage (Carrito y Wishlist)

---

## ✨ Características Principales

* **Filtros Dinámicos en Tiempo Real:** Búsqueda instantánea, filtrado por categorías y rango de precios optimizados mediante memorización (`useMemo`).
* **Paginación Fluida:** Navegación por páginas controlada para evitar la sobrecarga visual de catálogo.
* **Vista Rápida de Producto (QuickView Modal):** Modal interactivo con físicas de resorte (*spring physics*) para ver especificaciones y opiniones.
* **Carrito y Lista de Deseos (Wishlist):** Paneles laterales desglosables (*drawers*) con persistencia local de datos.
* **UX/UI Responsiva:** Adaptación completa a dispositivos móviles con menú hamburguesa dedicado.

---

## ⚡ Optimización & Rendimiento

* **Arquitectura Limpia:** Flujo de datos centralizado para evitar re-renderizados innecesarios en la grilla de productos.
* **Fallback Inteligente:** Manejo de imágenes de carga y estados de error con placeholders de marca.

## 💻 Ejecución Local

1. Clona el repositorio:
   ```bash
git clone [https://github.com/edwarddev012/nexo-ecommerce.git](https://github.com/edwarddev012/nexo-ecommerce.git)
