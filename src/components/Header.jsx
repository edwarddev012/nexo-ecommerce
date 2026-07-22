import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  LogOut,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({
  searchTerm = "",
  setSearchTerm,
  cartCount = 0,
  wishlistCount = 0,
  cartItems = [],
  isCartOpen,
  isWishlistOpen,
  onCartClick,
  onWishlistClick,
  user,
  onLoginToggle,
  products = [],
  onProductClick,
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 📱 Estado para el menú móvil

  const [isShaking, setIsShaking] = useState(false);
  const prevCartCount = useRef(cartCount);

  const dispararSacudidaCSS = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 400);
  };

  useEffect(() => {
    window.addEventListener("shakeNavbarCart", dispararSacudidaCSS);
    return () => {
      window.removeEventListener("shakeNavbarCart", dispararSacudidaCSS);
    };
  }, []);

  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      dispararSacudidaCSS();
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 8, scale: 0.99 },
  };

  const springTransition = {
    type: "spring",
    stiffness: 350,
    damping: 26,
    mass: 0.8,
  };

  const suggestions = useMemo(() => {
    if (!searchTerm.trim() || !products) return [];
    return products
      .filter(
        (p) =>
          p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .slice(0, 5);
  }, [searchTerm, products]);

  const handleSuggestionClick = (product) => {
    onProductClick(product);
    setSearchTerm("");
    setShowSuggestions(false);
    setIsMenuOpen(false); // Cierra el menú al seleccionar un producto
  };

  const handleScrollToSection = (e, selector) => {
    e.preventDefault();
    setSearchTerm("");
    setIsMenuOpen(false); // Cierra el menú móvil al hacer clic
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* 📱 Botón Hamburguesa (Solo visible en móviles) */}
        <button
          className="btn-icon mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand Logo */}
        <div className="header-logo">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setSearchTerm("");
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            NEXO<span>.</span>
          </a>
        </div>

        {/* Links & Search Container (Sufre la transformación responsiva) */}
        <div className={`header-nav-wrapper ${isMenuOpen ? "is-open" : ""}`}>
          <nav className="header-nav">
            <a
              href="#catalog-explore"
              className="nav-link"
              onClick={(e) => handleScrollToSection(e, "#catalog-explore")}
            >
              Comercio
            </a>
            <a
              href="#catalog-explore"
              className="nav-link"
              onClick={(e) => handleScrollToSection(e, "#catalog-explore")}
            >
              Diario
            </a>
            <a
              href="#site-footer"
              className="nav-link"
              onClick={(e) => handleScrollToSection(e, "footer")}
            >
              Soporte
            </a>
          </nav>

          {/* Search Bar */}
          <div className="header-search">
            <div className="search-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="search-input"
              />

              <AnimatePresence>
                {showSuggestions && searchTerm.trim().length > 0 && (
                  <>
                    <motion.div
                      className="suggestions-overlay"
                      onClick={() => setShowSuggestions(false)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 95,
                      }}
                    />

                    <motion.div
                      className="search-suggestions-dropdown"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={springTransition}
                      style={{ zIndex: 100 }}
                    >
                      {suggestions.length === 0 ? (
                        <div className="no-suggestions-item">
                          No se encontraron resultados para{" "}
                          <span className="highlight-term">"{searchTerm}"</span>
                        </div>
                      ) : (
                        <div className="suggestions-list">
                          {suggestions.map((product) => (
                            <div
                              key={product.id}
                              className="suggestion-item"
                              onClick={() => handleSuggestionClick(product)}
                            >
                              <div className="suggestion-image-wrapper">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="suggestion-image"
                                />
                              </div>
                              <div className="suggestion-details">
                                <span className="suggestion-name">
                                  {product.name}
                                </span>
                                <span className="suggestion-category">
                                  {product.category}
                                </span>
                              </div>
                              <div className="suggestion-action-hint">
                                <span className="suggestion-price">
                                  ${Number(product.price).toFixed(2)}
                                </span>
                                <ArrowRight
                                  size={14}
                                  className="suggestion-arrow"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Actions (Siempre visibles a la derecha) */}
        <div className="header-actions">
          {/* Wishlist */}
          <button
            className="btn-icon header-btn"
            onClick={(e) => {
              e.stopPropagation();
              onWishlistClick();
            }}
            aria-label="Open Wishlist"
          >
            <Heart
              size={20}
              className={wishlistCount > 0 ? "icon-heart-filled" : ""}
            />
            {wishlistCount > 0 && (
              <span className="badge-count anim-scale-up">{wishlistCount}</span>
            )}
          </button>

          {/* Cart */}
          <button
            className={`btn-icon header-btn ${isShaking ? "cart-shake-active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onCartClick();
            }}
            aria-label="Open Cart"
            style={{ position: "relative" }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="badge-count anim-scale-up">{cartCount}</span>
            )}
          </button>

          {/* User Profile */}
          <div className="profile-menu-container">
            <button
              className="btn-icon header-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-label="User Account Menu"
            >
              {user && user.name ? (
                <div className="user-avatar-initials">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              ) : (
                <User size={20} />
              )}
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <motion.div
                    className="profile-menu-overlay"
                    onClick={() => setIsProfileOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 95,
                    }}
                  />
                  <motion.div
                    className="profile-dropdown"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={springTransition}
                    style={{ zIndex: 100 }}
                  >
                    {user ? (
                      <>
                        <div className="dropdown-header">
                          <span className="dropdown-name">{user.name}</span>
                          <span className="dropdown-email">{user.email}</span>
                        </div>
                        <div className="dropdown-divider" />
                        <button
                          className="dropdown-item btn-logout"
                          onClick={() => {
                            onLoginToggle();
                            setIsProfileOpen(false);
                          }}
                        >
                          <LogOut size={16} />
                          Cerrar Sesión
                        </button>
                      </>
                    ) : (
                      <div className="dropdown-login-prompt">
                        <p
                          style={{
                            margin: "0 0 8px 0",
                            color: "#64748b",
                            fontSize: "0.85rem",
                          }}
                        >
                          Sesión de Invitado
                        </p>
                        <button
                          className="btn-primary btn-sm btn-full"
                          onClick={() => {
                            onLoginToggle();
                            setIsProfileOpen(false);
                          }}
                        >
                          Iniciar Sesión
                        </button>
                      </div>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
