import { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import ProductQuickView from "./components/ProductQuickView/ProductQuickView";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer"; // 🚀 Importación del nuevo Footer Premium
import products from "./data/products";
import { motion, AnimatePresence } from "framer-motion";
import { ToastNotification } from "./components/ToastNotification";
import { ToastProvider } from "./context/ToastContext";
import { SlidersHorizontal } from "lucide-react";

const TRADUCCIONES_CATEGORIAS = {
  All: "Todos",
  all: "Todos",
  Todos: "Todos",
  tech: "Tecnología",
  Tech: "Tecnología",
  home: "Hogar",
  Home: "Hogar",
  lifestyle: "Estilo de Vida",
  Lifestyle: "Estilo de Vida",
  accessories: "Accesorios",
  Accessories: "Accesorios",
  accesories: "Accesorios",
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState(350);
  const [cartTrigger, setCartTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // --- NUEVOS ESTADOS PARA PAGINACIÓN ---
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Puedes cambiar este número para mostrar más o menos productos por página

  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("nexo_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("nexo_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const [user, setUser] = useState({
    name: "Edward Dev",
    email: "email@ejemplo.com",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("nexo_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("nexo_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message, type = "success") => {
    setToast({ isOpen: true, message, type });
  };

  useEffect(() => {
    if (toast.isOpen) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, isOpen: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.isOpen]);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    const listaOriginal = ["All", ...Array.from(cats)];
    return listaOriginal.map((cat) => TRADUCCIONES_CATEGORIAS[cat] || cat);
  }, []);

  const maxProductPrice = useMemo(() => {
    return Math.ceil(Math.max(...products.map((p) => p.price)));
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const categoriaTraducidaDelProducto =
          TRADUCCIONES_CATEGORIAS[product.category] || product.category;
        const categoriaSeleccionadaTraducida =
          TRADUCCIONES_CATEGORIAS[selectedCategory] || selectedCategory;

        const matchesCategory =
          categoriaSeleccionadaTraducida === "Todos" ||
          categoriaTraducidaDelProducto === categoriaSeleccionadaTraducida;

        const matchesPrice = product.price <= priceRange;
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "rating-desc") return b.rating - a.rating;
        return 0;
      });
  }, [searchTerm, selectedCategory, sortOption, priceRange]);

  // --- LÓGICA Y CÁLCULOS DE PAGINACIÓN ---
  // Si los filtros cambian, volvemos automáticamente a la página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOption, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage, productsPerPage]);

  const handleAddToCart = (product, quantity = 1) => {
    if (!product) return;
    setCartTrigger((prev) => prev + 1);
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item?.product?.id === product.id,
      );
      if (existing) {
        return prevCart.map((item) =>
          item?.product?.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item?.product?.id === productId ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item?.product?.id !== productId),
    );
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      }
      return [...prevWishlist, productId];
    });
  };

  const handleMoveToCart = (product) => {
    handleAddToCart(product, 1);
    handleToggleWishlist(product.id);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Todos");
    setSortOption("featured");
    setPriceRange(maxProductPrice);
  };

  const handleLoginToggle = () => {
    if (user) {
      setUser(null);
    } else {
      setUser({ name: "Edward Doe", email: "edward@example.com" });
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + (item?.quantity || 0), 0);

  const cartItemsFormatted = useMemo(() => {
    return cart
      .filter((item) => item && item.product)
      .map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
      }));
  }, [cart]);

  const totalAmount = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + (item?.product?.price || 0) * (item?.quantity || 0),
      0,
    );
  }, [cart]);

  const wishlistItems = useMemo(() => {
    return products.filter((p) => wishlist.includes(p.id));
  }, [wishlist]);

  return (
    <ToastProvider>
      <div className="app-layout">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cartCount={cartCount}
          wishlistCount={wishlist.length}
          user={user}
          onLoginToggle={handleLoginToggle}
          products={products}
          onProductClick={setSelectedProduct}
          cartItems={cartItemsFormatted}
          onCartClick={() => {
            setIsCartOpen(!isCartOpen);
            setIsWishlistOpen(false);
          }}
          onWishlistClick={() => {
            setIsWishlistOpen(!isWishlistOpen);
            setIsCartOpen(false);
          }}
        />

        <main className="main-content container anim-fade-in">
          <section className="catalog-hero">
            <div className="hero-content">
              <h1>Tecnología que te entiende y te acompaña.</h1>
              <p style={{ marginTop: "24px", marginBottom: "32px" }}>
                Equipamiento premium optimizado para la cultura urbana.
              </p>
            </div>
          </section>

          <section id="catalog-explore" className="catalog-section">
            <div className="catalog-section-header">
              <div>
                <h2>CATÁLOGO GLOBAL</h2>
                <p className="results-count">
                  Mostrando {filteredProducts.length} lanzamientos indexados
                </p>
              </div>
              <div>
                <button
                  className={`btn-toggle-filters ${showFilters ? "active" : ""}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal size={14} />
                  <span>
                    {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                  </span>
                </button>
              </div>
            </div>

            <div
              className="catalog-layout"
              style={{
                display: "flex",
                width: "100%",
                gap: "32px",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <AnimatePresence initial={false}>
                {showFilters && (
                  <motion.aside
                    className="filters-sidebar"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "280px" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ overflow: "hidden", flexShrink: 0 }}
                  >
                    <Filters
                      selectedCategory={selectedCategory} // 👈 Pásalo directo e íntegro
                      setSelectedCategory={setSelectedCategory}
                      sortOption={sortOption}
                      setSortOption={setSortOption}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      categories={categories}
                      maxProductPrice={maxProductPrice}
                      onReset={handleResetFilters}
                    />
                  </motion.aside>
                )}
              </AnimatePresence>

              <motion.div
                className="products-grid-container"
                layout
                style={{ flex: 1, width: "100%" }}
              >
                {/* Envolvemos el Grid en un AnimatePresence para controlar la entrada/salida suave */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage} // 👈 Crucial: le dice a Framer Motion que el componente cambió
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <ProductGrid
                      products={paginatedProducts}
                      isLoading={isLoading}
                      wishlist={wishlist}
                      cart={cart}
                      searchQuery={searchTerm}
                      onProductClick={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      onResetFilters={handleResetFilters}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* CONTROLES DE PAGINACIÓN */}
                {totalPages > 1 && (
                  <div
                    className="pagination-controls"
                    style={{
                      marginTop: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <button
                      className="btn-pagination"
                      onClick={() => {
                        window.scrollTo({ top: 400, behavior: "smooth" }); // Extra: scroll suave hacia arriba
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                      }}
                      disabled={currentPage === 1}
                      style={{
                        opacity: currentPage === 1 ? 0.5 : 1,
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      }}
                    >
                      Anterior
                    </button>

                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      Página {currentPage} de {totalPages}
                    </span>

                    <button
                      className="btn-pagination"
                      onClick={() => {
                        window.scrollTo({ top: 400, behavior: "smooth" }); // Extra: scroll suave hacia arriba
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages),
                        );
                      }}
                      disabled={currentPage === totalPages}
                      style={{
                        opacity: currentPage === totalPages ? 0.5 : 1,
                        cursor:
                          currentPage === totalPages
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        </main>

        {/* 🎯 El nuevo Footer Dinámico reemplazando el bloque estático antiguo */}
        <Footer />

        <ProductQuickView
          isOpen={selectedProduct !== null}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          cart={cart}
          isFavorite={
            selectedProduct ? wishlist.includes(selectedProduct.id) : false
          }
          onToggleWishlist={handleToggleWishlist}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItemsFormatted}
          onUpdateQuantity={handleUpdateQty}
          onRemove={handleRemoveFromCart}
          totalAmount={totalAmount}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistItems={wishlistItems}
          onRemove={handleToggleWishlist}
          onMoveToCart={handleMoveToCart}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          totalAmount={totalAmount}
          onPaymentSuccess={() => {
            setCart([]);
            showToast("¡Pedido realizado con éxito!", "success");
          }}
        />

        <AnimatePresence>
          {toast.isOpen && (
            <ToastNotification
              message={toast.message}
              type={toast.type}
              onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
            />
          )}
        </AnimatePresence>
      </div>
    </ToastProvider>
  );
}
