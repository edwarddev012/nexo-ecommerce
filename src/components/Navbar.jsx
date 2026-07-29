import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Store,
  HelpCircle,
  Sparkles,
  BookOpen, // Agregado para el ícono de Diario
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  user = { name: "Usuario", avatar: "" },
  onLogout,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  // Se agregaron Comercio (/comercio) y Diario (/diario)
  const navLinks = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Comercio", path: "/comercio", icon: Store },
    { name: "Diario", path: "/diario", icon: BookOpen },
    { name: "Soporte", path: "/soporte", icon: HelpCircle },
  ];

  // Manejo de Cierre de Sesión Suave
  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    setIsLoggingOut(true); // Activa el overlay de desvanecimiento suave

    setTimeout(() => {
      if (onLogout) onLogout();
      setIsLoggingOut(false);
      navigate("/login");
    }, 600);
  };

  return (
    <>
      {/* Overlay de salida suave al cerrar sesión */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "#ffffff",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid #f3f4f6",
                borderTopColor: "#10b981",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <p
              style={{ color: "#4b5563", fontWeight: 500, fontSize: "0.95rem" }}
            >
              Cerrando sesión de forma segura...
            </p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra de Navegación Principal */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <NavLink
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                backgroundColor: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <Sparkles size={20} />
            </div>
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#111827",
                letterSpacing: "-0.02em",
              }}
            >
              AXIS<span style={{ color: "#10b981" }}>.</span>
            </span>
          </NavLink>

          {/* Enlaces Desktop */}
          <nav
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  position: "relative",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#10b981" : "#4b5563",
                  backgroundColor: isActive ? "#ecfdf5" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                })}
              >
                {({ isActive }) => (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <link.icon
                      size={16}
                      color={isActive ? "#10b981" : "#6b7280"}
                    />
                    {link.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Acciones de la Derecha (Carrito, Favoritos, Perfil y Logout) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Favoritos */}
            <NavLink
              to="/favoritos"
              aria-label="Ver favoritos"
              style={({ isActive }) => ({
                position: "relative",
                padding: "8px",
                borderRadius: "10px",
                color: isActive ? "#ff3b30" : "#4b5563",
                backgroundColor: isActive ? "#fff5f5" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              })}
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    backgroundColor: "#ff3b30",
                    color: "white",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            {/* Carrito */}
            <NavLink
              to="/carrito"
              aria-label="Ver carrito"
              style={({ isActive }) => ({
                position: "relative",
                padding: "8px",
                borderRadius: "10px",
                color: isActive ? "#10b981" : "#4b5563",
                backgroundColor: isActive ? "#ecfdf5" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              })}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    backgroundColor: "#10b981",
                    color: "white",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </motion.span>
              )}
            </NavLink>

            {/* Separador vertical */}
            <div
              style={{
                width: "1px",
                height: "24px",
                backgroundColor: "#e5e7eb",
                margin: "0 4px",
              }}
            />

            {/* Perfil de Usuario */}
            <NavLink
              to="/perfil"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 10px",
                borderRadius: "10px",
                textDecoration: "none",
                backgroundColor: isActive ? "#f3f4f6" : "transparent",
                color: "#111827",
              })}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <User size={16} color="#6b7280" />
                )}
              </div>
            </NavLink>

            {/* Botón Cerrar Sesión (Desktop) */}
            <motion.button
              className="desktop-logout"
              onClick={handleLogout}
              whileHover={{ backgroundColor: "#fef2f2", color: "#ef4444" }}
              whileTap={{ scale: 0.95 }}
              title="Cerrar sesión"
              style={{
                background: "transparent",
                border: "none",
                padding: "8px",
                borderRadius: "10px",
                color: "#6b7280",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              <LogOut size={18} />
            </motion.button>

            {/* Botón Hamburguesa para Móvil */}
            <button
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                padding: "8px",
                color: "#374151",
                cursor: "pointer",
              }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú Desplegable para Dispositivos Móviles */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                overflow: "hidden",
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #f3f4f6",
                padding: "0 20px 16px 20px",
              }}
            >
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  paddingTop: "8px",
                }}
              >
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={({ isActive }) => ({
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      fontSize: "0.95rem",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#10b981" : "#374151",
                      backgroundColor: isActive ? "#ecfdf5" : "transparent",
                      textDecoration: "none",
                    })}
                  >
                    <link.icon size={18} />
                    {link.name}
                  </NavLink>
                ))}

                <button
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#ef4444",
                    backgroundColor: "#fef2f2",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "8px",
                    width: "100%",
                  }}
                >
                  <LogOut size={18} />
                  Cerrar Sesión
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CSS para visibilidad según el ancho de pantalla */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-logout {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
