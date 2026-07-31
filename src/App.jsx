import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  lazy,
  Suspense,
} from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import ComercioPage from "./pages/ComercioPage";
import DiarioPage from "./pages/DiarioPage";

const ProductQuickView = lazy(
  () => import("./components/ProductQuickView/ProductQuickView"),
);
const CartDrawer = lazy(() => import("./components/CartDrawer"));
const WishlistDrawer = lazy(() => import("./components/WishlistDrawer"));
const CheckoutModal = lazy(() => import("./components/CheckoutModal"));
const AuthModal = lazy(() => import("./components/AuthModal"));

import products from "./data/products";
import { motion, AnimatePresence } from "framer-motion";
import { ToastProvider, useToast } from "./context/ToastContext";
import { SlidersHorizontal } from "lucide-react";
import { supabase } from "./lib/supabaseClient";

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

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState(350);
  const [cartTrigger, setCartTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Hook del contexto global de Toasts
  const { showToast } = useToast();

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("nexo_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("nexo_wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const isDataLoaded = useRef(false);

  // --- 1. GESTIÓN DE AUTENTICACIÓN Y CARGA DE DATOS ---
  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const { data, error } = await supabase
          .from("user_data")
          .select("cart, wishlist")
          .eq("user_id", userId)
          .maybeSingle();

        if (!error && data) {
          if (Array.isArray(data.cart)) setCart(data.cart);
          if (Array.isArray(data.wishlist)) setWishlist(data.wishlist);
        }
      } catch (err) {
        console.error("Error al obtener datos de usuario:", err);
      } finally {
        isDataLoaded.current = true;
      }
    };

    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const currentUser = session.user;
          const avatarUrl =
            currentUser.user_metadata?.avatar_url ||
            currentUser.user_metadata?.picture ||
            null;

          setUser({
            id: currentUser.id,
            name:
              currentUser.user_metadata?.full_name ||
              currentUser.user_metadata?.name ||
              currentUser.email.split("@")[0],
            email: currentUser.email,
            avatar: avatarUrl,
          });

          await fetchUserData(currentUser.id);
        } else {
          isDataLoaded.current = true;
        }
      } catch (e) {
        console.error("Error al verificar autenticación:", e);
        isDataLoaded.current = true;
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const avatarUrl =
            session.user.user_metadata?.avatar_url ||
            session.user.user_metadata?.picture ||
            null;

          setUser({
            id: session.user.id,
            name:
              session.user.user_metadata?.full_name ||
              session.user.user_metadata?.name ||
              session.user.email.split("@")[0],
            email: session.user.email,
            avatar: avatarUrl,
          });

          if (event === "SIGNED_IN") {
            isDataLoaded.current = false;
            await fetchUserData(session.user.id);
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setCart([]);
          setWishlist([]);
          localStorage.removeItem("nexo_cart");
          localStorage.removeItem("nexo_wishlist");
          isDataLoaded.current = true;
        }
      },
    );

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (!isDataLoaded.current) return;

    const timer = setTimeout(async () => {
      if (!user?.id) {
        localStorage.setItem("nexo_cart", JSON.stringify(cart));
        return;
      }

      try {
        await supabase.from("user_data").upsert(
          {
            user_id: user.id,
            cart: cart,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );
      } catch (err) {
        console.error("Excepción al guardar carrito:", err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cart, user?.id]);

  useEffect(() => {
    if (!isDataLoaded.current) return;

    const saveWishlist = async () => {
      if (!user?.id) {
        localStorage.setItem("nexo_wishlist", JSON.stringify(wishlist));
        return;
      }

      try {
        const { error } = await supabase.from("user_data").upsert(
          {
            user_id: user.id,
            wishlist: wishlist,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );
        if (error) console.error("Error al guardar wishlist:", error.message);
      } catch (err) {
        console.error("Excepción al guardar wishlist:", err);
      }
    };

    saveWishlist();
  }, [wishlist, user?.id]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 0);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, sortOption, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage, productsPerPage]);

  const checkAuthAndExecute = async (actionCallback) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setIsAuthOpen(true);
      return false;
    }

    actionCallback();
    return true;
  };

  const handleAddToCart = async (product, quantity = 1, onSuccess) => {
    if (!product) return false;

    return await checkAuthAndExecute(() => {
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

      showToast("Producto añadido al carrito", "success");
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      }
    });
  };

  const handleToggleWishlist = async (productId) => {
    return await checkAuthAndExecute(() => {
      setWishlist((prevWishlist) => {
        const isAlreadyWishlisted = prevWishlist.includes(productId);
        if (isAlreadyWishlisted) {
          showToast("Eliminado de la lista de deseos", "info");
          return prevWishlist.filter((id) => id !== productId);
        }
        showToast("¡Añadido a tus favoritos!", "success");
        return [...prevWishlist, productId];
      });
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

  const handleMoveToCart = (product) => {
    handleAddToCart(product, 1);
    handleToggleWishlist(product.id);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Todos");
    setSortOption("featured");
    setPriceRange(maxProductPrice);
    setCurrentPage(1);
  };

  const handleLogoClick = () => {
    handleResetFilters();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoginToggle = async () => {
    if (user) {
      await supabase.auth.signOut();
      setUser(null);
      showToast("Sesión cerrada correctamente", "info");
    } else {
      setIsAuthOpen(true);
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
        onLogoClick={handleLogoClick}
      />

      {/* DEFINICIÓN DE RUTAS DIRECTAS */}
      <Routes>
        <Route
          path="/"
          element={
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

                <div className="catalog-layout">
                  <AnimatePresence initial={false}>
                    {showFilters && (
                      <motion.aside
                        className="filters-sidebar"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <Filters
                          selectedCategory={selectedCategory}
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
                    style={{ width: "100%" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPage}
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
                            window.scrollTo({ top: 400, behavior: "smooth" });
                            setCurrentPage((prev) => Math.max(prev - 1, 1));
                          }}
                          disabled={currentPage === 1}
                          style={{
                            opacity: currentPage === 1 ? 0.5 : 1,
                            cursor:
                              currentPage === 1 ? "not-allowed" : "pointer",
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
                            window.scrollTo({ top: 400, behavior: "smooth" });
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
          }
        />
        <Route path="/comercio" element={<ComercioPage />} />
        <Route path="/diario" element={<DiarioPage />} />
      </Routes>

      <Footer />

      <Suspense fallback={null}>
        <ProductQuickView
          isOpen={selectedProduct !== null}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          cart={cart}
          wishlist={wishlist}
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

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={(userData) => {
            setUser(userData);
            showToast(`¡Bienvenido de nuevo, ${userData.name}!`, "success");
          }}
        />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
