<template>
  <footer class="institutional-footer">
    <div class="container-wide">
      <div class="footer-content">
        <div class="footer-branding">
          <div class="flex items-center justify-center w-16 h-16 mb-3 bg-gray-700 rounded-lg">
            <img src="/icons/Math_Mass_Logo_Mono.svg" alt="Math Mass Logo" class="w-12 h-12" />
          </div>
          <h3>Math Mass</h3>
          <p>Plataforma educativa de matemáticas para 6º de primaria</p>
          <p class="footer-sep">Alineado con los Planes de Estudio SEP 2025</p>
        </div>
        <div class="footer-sep-section">
          <h4>Secretaría de Educación Pública</h4>
          <div class="footer-sep-links">
            <a href="https://www.gob.mx/sep" target="_blank" rel="noopener">
              <svg viewBox="0 0 20 20" fill="currentColor" class="link-icon">
                <path
                  d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                />
                <path
                  d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                />
              </svg>
              Portal SEP
            </a>
            <a
              href="https://elsextodelatorre.wordpress.com/wp-content/uploads/2014/09/mates-6c2ba.pdf"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" class="link-icon">
                <path
                  d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                />
                <path
                  d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                />
              </svg>
              Planes de Estudio
            </a>
          </div>
        </div>
        <div class="footer-legal">
          <p>&copy; 2025 Math Mass</p>
          <p>Todos los derechos reservados</p>
          <p class="footer-version">Versión 1.0.0</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.institutional-footer {
  background: var(--color-gray-900);
  color: white;
  padding: var(--spacing-3xl) 0 var(--spacing-lg) 0;
  margin-top: var(--spacing-3xl);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: start;
}

.footer-branding {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-branding h3 {
  font-size: var(--font-size-2xl);
  margin: 0;
  color: white;
  font-weight: var(--font-weight-bold);
}

.footer-branding p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

.footer-sep-section h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: white;
  margin: 0 0 var(--spacing-md) 0;
}

.footer-sep-links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-sep-links a {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
  padding: var(--spacing-xs) 0;
}

.footer-sep-links a:hover {
  color: white;
  transform: translateX(4px);
}

.link-icon {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

.footer-legal {
  text-align: right;
}

.footer-legal p {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.6);
  line-height: var(--line-height-relaxed);
}

.footer-version {
  color: rgba(255, 255, 255, 0.4) !important;
  font-size: 11px !important;
}

.footer-sep {
  margin-top: var(--spacing-sm) !important;
  color: rgba(255, 255, 255, 0.5) !important;
  font-style: italic;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .footer-legal {
    text-align: left;
  }
}

@media (max-width: 768px) {
  .institutional-footer {
    padding: var(--spacing-2xl) 0 var(--spacing-md) 0;
  }
}
</style>
