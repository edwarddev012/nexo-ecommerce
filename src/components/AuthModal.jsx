import React, { useState } from "react";
import { X, Mail, Lock, User, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  // --- NATIVO: INICIO DE SESIÓN CON GOOGLE ---
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin, // Redirige de vuelta a Nexo tras autenticar
        },
      });
      if (error) throw error;
    } catch (err) {
      setErrorMessage(err.message || "Error al iniciar sesión con Google.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        });

        if (error) throw error;

        if (data.user) {
          onAuthSuccess({
            name: name || data.user.email.split("@")[0],
            email: data.user.email,
          });
          onClose();
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          onAuthSuccess({
            name:
              data.user.user_metadata?.full_name ||
              data.user.email.split("@")[0],
            email: data.user.email,
          });
          onClose();
        }
      }
    } catch (err) {
      setErrorMessage(err.message || "Ocurrió un error al autenticar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div style={{ position: "relative", zIndex: 1200 }}>
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#666",
              }}
            >
              <X size={20} />
            </button>

            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              {isSignUp ? "Crear una Cuenta" : "Iniciar Sesión"}
            </h2>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#666",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              {isSignUp
                ? "Ingresa tus datos para registrarte en Nexo"
                : "Accede a tu cuenta de Nexo"}
            </p>

            {/* BOTÓN DE GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "9999px",
                border: "1px solid #e4e4e7",
                backgroundColor: "#ffffff",
                color: "#18181b",
                fontWeight: "600",
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "16px",
                transition: "background-color 0.2s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continuar con Google
            </button>

            {/* SEPARADOR "O" */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "16px 0",
                color: "#a1a1aa",
                fontSize: "0.8rem",
              }}
            >
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#e4e4e7" }}
              />
              <span style={{ padding: "0 10px" }}>o correo</span>
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#e4e4e7" }}
              />
            </div>

            {errorMessage && (
              <div
                style={{
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                {errorMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {isSignUp && (
                <div style={{ position: "relative" }}>
                  <User
                    size={18}
                    style={{
                      position: "absolute",
                      left: 12,
                      top: 12,
                      color: "#999",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 38px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              )}

              <div style={{ position: "relative" }}>
                <Mail
                  size={18}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 12,
                    color: "#999",
                  }}
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px 10px 38px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 12,
                    color: "#999",
                  }}
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px 10px 38px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#111",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: "9999px",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <LogIn size={18} />
                {loading ? "Cargando..." : isSignUp ? "Registrarse" : "Entrar"}
              </button>
            </form>

            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              {isSignUp ? "¿Ya tienes una cuenta? " : "¿No tienes cuenta? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#10b981",
                  fontWeight: "600",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {isSignUp ? "Inicia Sesión" : "Regístrate"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
