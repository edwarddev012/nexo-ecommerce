import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="site-footer">
      {/* Sección Principal del Footer */}
      <div className="container footer-main">
        {/* Columna 1: Branding y Propósito */}
        <div className="footer-col footer-brand-col">
          <h2 className="footer-logo">
            NEXO<span>.</span>
          </h2>
          <p className="footer-description">
            Elevando el estándar del comercio digital con experiencias fluidas,
            diseño geométrico y curaduría de productos premium.
          </p>
          <div className="footer-socials">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Columna 2: Navegación de la Tienda */}
        <div className="footer-col">
          <h3 className="footer-title">Explorar</h3>
          <ul className="footer-links">
            <li>
              <a href="#catalog-explore">Comercio</a>
            </li>
            <li>
              <a href="#catalog-explore">Colecciones</a>
            </li>
            <li>
              <a href="#catalog-explore">Lo Nuevo</a>
            </li>
            <li>
              <a href="#catalog-explore">Ofertas</a>
            </li>
          </ul>
        </div>

        {/* Columna 3: Soporte / Empresa */}
        <div className="footer-col">
          <h3 className="footer-title">Asistencia</h3>
          <ul className="footer-links">
            <li>
              <a href="#site-footer">Preguntas Frecuentes</a>
            </li>
            <li>
              <a href="#site-footer">Envíos y Devoluciones</a>
            </li>
            <li>
              <a href="#site-footer">Términos de Servicio</a>
            </li>
            <li>
              <a href="#site-footer">Privacidad</a>
            </li>
          </ul>
        </div>

        {/* Columna 4: Contacto */}
        <div className="footer-col footer-contact-col">
          <h3 className="footer-title">Contacto</h3>
          <ul className="footer-contact-list">
            <li>
              {/* MapPin SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="contact-icon"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Showroom Central, Edificio Nexo</span>
            </li>
            <li>
              {/* Phone SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="contact-icon"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+58 (212) 555-0199</span>
            </li>
            <li>
              {/* Mail SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="contact-icon"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>soporte@nexo.design</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Barra Inferior de Copyright */}
      <div className="footer-bottom">
        <div
          className="container footer-bottom-container"
          style={{ justifyContent: "center" }}
        >
          <p
            className="copyright-text"
            style={{ textAlign: "center", margin: 0 }}
          >
            &copy; {currentYear} NEXO. Todos los derechos reservados. Diseñado y
            desarrollado con enfoque de alto rendimiento.
          </p>
        </div>
      </div>
    </footer>
  );
}
