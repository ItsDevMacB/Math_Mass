<template>
  <nav class="navbar-institutional">
    <!-- Barra superior institucional -->
    <div class="navbar-top">
      <div class="container-wide">
        <div class="navbar-top-content">
          <div class="institutional-info">
            <span class="sep-badge">SEP</span>
            <span class="sep-text">Secretaría de Educación Pública</span>
            <span class="divider">|</span>
            <span class="grade-text">6º Primaria - Matemáticas</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Barra de navegación principal -->
    <div class="navbar-main">
      <div class="container-wide">
        <div class="navbar-main-content">
          <!-- Logo y título -->
          <RouterLink to="/" class="navbar-brand">
            <div class="brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div class="brand-text">
              <h1 class="brand-title">Math Mass</h1>
              <p class="brand-subtitle">Plataforma Educativa</p>
            </div>
          </RouterLink>

          <!-- Enlaces de navegación -->
          <div class="navbar-links">
            <RouterLink to="/" class="nav-link" active-class="nav-link-active">
              <svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
              </svg>
              <span>Inicio</span>
            </RouterLink>

            <RouterLink to="/lessons" class="nav-link" active-class="nav-link-active">
              <svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
                />
              </svg>
              <span>Lecciones</span>
            </RouterLink>

            <RouterLink to="/exercise" class="nav-link" active-class="nav-link-active">
              <svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Ejercicios</span>
            </RouterLink>

            <RouterLink to="/about" class="nav-link" active-class="nav-link-active">
              <svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Acerca de</span>
            </RouterLink>
          </div>

          <!-- Botón menú móvil -->
          <button @click="toggleMenu" class="mobile-menu-btn" aria-label="Menú">
            <svg v-if="!isMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menú móvil -->
    <Transition name="slide-down">
      <div v-if="isMenuOpen" class="mobile-menu">
        <div class="container-wide">
          <div class="mobile-menu-content">
            <RouterLink
              to="/"
              @click="closeMenu"
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
            >
              <svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
              </svg>
              <span>Inicio</span>
            </RouterLink>

            <RouterLink
              to="/lessons"
              @click="closeMenu"
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
            >
              <svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
                />
              </svg>
              <span>Lecciones</span>
            </RouterLink>

            <RouterLink
              to="/exercise"
              @click="closeMenu"
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
            >
              <svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Ejercicios</span>
            </RouterLink>

            <RouterLink
              to="/about"
              @click="closeMenu"
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
            >
              <svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Acerca de</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
/* ============================================
   NAVBAR INSTITUCIONAL SEP
   ============================================ */

.navbar-institutional {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: white;
  box-shadow: var(--shadow-md);
}

/* Barra superior institucional */
.navbar-top {
  background: var(--color-sep-blue);
  color: white;
  padding: var(--spacing-xs) 0;
  font-size: var(--font-size-xs);
}

.navbar-top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.institutional-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.sep-badge {
  background: white;
  color: var(--color-sep-blue);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-bold);
  font-size: 10px;
  letter-spacing: 1px;
}

.sep-text {
  font-weight: var(--font-weight-medium);
}

.divider {
  color: rgba(255, 255, 255, 0.5);
}

.grade-text {
  color: rgba(255, 255, 255, 0.9);
}

/* Barra de navegación principal */
.navbar-main {
  background: white;
  border-bottom: 1px solid var(--border-color-light);
}

.navbar-main-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  gap: var(--spacing-xl);
}

/* Logo y marca */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  text-decoration: none;
  transition: opacity var(--transition-base);
}

.navbar-brand:hover {
  opacity: 0.8;
}

.brand-icon {
  width: 48px;
  height: 48px;
  background: var(--color-sep-blue);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.brand-icon svg {
  width: 28px;
  height: 28px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-sep-blue);
  line-height: var(--line-height-tight);
  margin: 0;
}

.brand-subtitle {
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  margin: 0;
  font-weight: var(--font-weight-medium);
}

/* Enlaces de navegación */
.navbar-links {
  display: none;
  gap: var(--spacing-sm);
}

@media (min-width: 768px) {
  .navbar-links {
    display: flex;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-gray-700);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  position: relative;
}

.nav-link:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-sep-blue);
}

.nav-link-active {
  background: #eff6ff;
  color: var(--color-sep-blue);
  font-weight: var(--font-weight-semibold);
}

.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: var(--color-sep-blue);
  border-radius: 2px 2px 0 0;
}

.nav-icon {
  width: 18px;
  height: 18px;
}

/* Botón menú móvil */
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: 1px solid var(--border-color-medium);
  border-radius: var(--radius-md);
  color: var(--color-gray-700);
  cursor: pointer;
  transition: all var(--transition-base);
}

.mobile-menu-btn:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-sep-blue);
  color: var(--color-sep-blue);
}

.mobile-menu-btn svg {
  width: 24px;
  height: 24px;
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

/* Menú móvil */
.mobile-menu {
  background: white;
  border-top: 1px solid var(--border-color-light);
  box-shadow: var(--shadow-lg);
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md) 0;
  gap: var(--spacing-xs);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  color: var(--color-gray-700);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.mobile-nav-link:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-sep-blue);
}

.mobile-nav-link-active {
  background: #eff6ff;
  color: var(--color-sep-blue);
  font-weight: var(--font-weight-semibold);
  border-left: 4px solid var(--color-sep-blue);
}

.mobile-nav-link .nav-icon {
  width: 20px;
  height: 20px;
}

/* Animaciones */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all var(--transition-base);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 767px) {
  .navbar-top {
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  .institutional-info {
    flex-wrap: wrap;
    font-size: 10px;
    gap: 4px;
  }

  .sep-text {
    display: none;
  }

  .brand-title {
    font-size: var(--font-size-lg);
  }

  .brand-icon {
    width: 40px;
    height: 40px;
  }

  .brand-icon svg {
    width: 24px;
    height: 24px;
  }
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
