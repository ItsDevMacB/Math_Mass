<script setup lang="ts">
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import {
  Sparkles,
  CheckCircle2,
  Code2,
  BookOpen,
  Target,
  Scale,
  Smartphone,
  FileCheck,
} from 'lucide-vue-next'

const breadcrumbs = [{ label: 'Inicio', path: '/' }, { label: 'Acerca de' }]
</script>

<template>
  <div class="about-page">
    <!-- Hero Section con Gradiente -->
    <div class="hero-about">
      <div class="container-wide">
        <!-- Breadcrumb dentro del hero -->
        <div class="breadcrumb-hero">
          <BreadcrumbNav :items="breadcrumbs" />
        </div>

        <!-- Header Principal -->
        <div class="text-center">
          <div class="icon-hero">
            <img src="/icons/Math_Mass_Logo2.svg" alt="Math Mass Logo" class="hero-logo" />
          </div>
          <h1 class="hero-title">Math Mass - 6º Primaria</h1>
          <p class="hero-subtitle">Plataforma Educativa de Matemáticas alineada con SEP 2025</p>
          <div class="hero-badge">
            <CheckCircle2 :size="16" :stroke-width="2.5" />
            <span>Certificado por SEP</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="content-wrapper">
      <!-- Cards Grid Mejorado -->
      <div class="grid gap-8 mb-12 lg:grid-cols-2">
        <!-- Características -->
        <div class="feature-card">
          <div class="feature-card-header">
            <div class="feature-icon">
              <Sparkles :size="28" :stroke-width="2" />
            </div>
            <h2 class="feature-title">Características Educativas</h2>
          </div>
          <ul class="space-y-3" style="color: var(--color-gray-700)">
            <li class="flex items-start gap-3">
              <CheckCircle2
                :size="20"
                :stroke-width="2.5"
                style="color: var(--color-success-green); margin-top: 2px; flex-shrink: 0"
              />
              <span>9 lecciones alineadas con SEP 2025</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2
                :size="20"
                :stroke-width="2.5"
                style="color: var(--color-success-green); margin-top: 2px; flex-shrink: 0"
              />
              <span>Generación ilimitada de ejercicios matemáticos</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2
                :size="20"
                :stroke-width="2.5"
                style="color: var(--color-success-green); margin-top: 2px; flex-shrink: 0"
              />
              <span>Tres niveles de dificultad progresivos</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2
                :size="20"
                :stroke-width="2.5"
                style="color: var(--color-success-green); margin-top: 2px; flex-shrink: 0"
              />
              <span>Visualizaciones gráficas interactivas</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2
                :size="20"
                :stroke-width="2.5"
                style="color: var(--color-success-green); margin-top: 2px; flex-shrink: 0"
              />
              <span>Renderizado matemático profesional</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle2
                :size="20"
                :stroke-width="2.5"
                style="color: var(--color-success-green); margin-top: 2px; flex-shrink: 0"
              />
              <span>Seguimiento de progreso y estadísticas</span>
            </li>
          </ul>
        </div>

        <!-- Tecnologías -->
        <div class="feature-card">
          <div class="feature-card-header">
            <div class="feature-icon">
              <Code2 :size="28" :stroke-width="2" />
            </div>
            <h2 class="feature-title">Tecnologías Web Utilizadas</h2>
          </div>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-name">Vue 3</span>
              <span class="tech-label">Framework</span>
            </div>
            <div class="tech-item">
              <span class="tech-name">TypeScript</span>
              <span class="tech-label">Tipado estático</span>
            </div>
            <div class="tech-item">
              <span class="tech-name">Vite</span>
              <span class="tech-label">Build tool</span>
            </div>
            <div class="tech-item">
              <span class="tech-name">Tailwind CSS</span>
              <span class="tech-label">Diseño</span>
            </div>
            <div class="tech-item">
              <span class="tech-name">Pinia</span>
              <span class="tech-label">Estado</span>
            </div>
            <div class="tech-item">
              <span class="tech-name">KaTeX</span>
              <span class="tech-label">Matemáticas</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Temas de Fracciones -->
      <div class="content-section">
        <div class="section-header-center">
          <div class="section-icon-large">
            <BookOpen :size="32" :stroke-width="2" />
          </div>
          <h2 class="section-title-large">Contenido Educativo</h2>
          <p class="section-subtitle">9 lecciones estructuradas para dominar las fracciones</p>
        </div>
        <div class="topics-grid">
          <div class="topic-card">
            <div class="topic-icon">
              <BookOpen :size="40" :stroke-width="2" />
            </div>
            <h3 class="topic-title">Introducción</h3>
            <p class="topic-description">Conceptos básicos de fracciones</p>
          </div>
          <div class="topic-card">
            <div class="topic-icon">
              <Target :size="40" :stroke-width="2" />
            </div>
            <h3 class="topic-title">Operaciones</h3>
            <p class="topic-description">Suma, resta, multiplicación, división</p>
          </div>
          <div class="topic-card">
            <div class="topic-icon">
              <Scale :size="40" :stroke-width="2" />
            </div>
            <h3 class="topic-title">Comparación</h3>
            <p class="topic-description">Fracciones equivalentes y simplificación</p>
          </div>
        </div>
      </div>

      <!-- PWA Info -->
      <div class="pwa-card">
        <div class="pwa-header">
          <div class="pwa-icon">
            <Smartphone :size="32" :stroke-width="2" />
          </div>
          <div>
            <h2 class="pwa-title">Aplicacion Web</h2>
            <p class="pwa-badge">Instalable • Offline • Rápida</p>
          </div>
        </div>
        <p class="pwa-description">
          Math Mass es una aplicación web progresiva completa que puedes instalar en tu dispositivo
          y usar sin conexión a internet.
        </p>
        <div class="pwa-features">
          <div class="pwa-feature">
            <CheckCircle2 :size="20" :stroke-width="2.5" />
            <span>Instalable en escritorio y dispositivos móviles</span>
          </div>
          <div class="pwa-feature">
            <CheckCircle2 :size="20" :stroke-width="2.5" />
            <span>Funciona completamente offline</span>
          </div>
          <div class="pwa-feature">
            <CheckCircle2 :size="20" :stroke-width="2.5" />
            <span>Se actualiza automáticamente</span>
          </div>
          <div class="pwa-feature pwa-feature-center">
            <CheckCircle2 :size="20" :stroke-width="2.5" />
            <span>Datos guardados localmente (IndexedDB)</span>
          </div>
          <div class="pwa-feature pwa-feature-center">
            <CheckCircle2 :size="20" :stroke-width="2.5" />
            <span>Optimizada para rendimiento y accesibilidad</span>
          </div>
        </div>
      </div>

      <!-- Alineación SEP -->
      <div class="sep-card">
        <div class="sep-icon-wrapper">
          <FileCheck :size="32" :stroke-width="2" />
        </div>
        <div class="sep-content">
          <h3 class="sep-title">Alineado con SEP 2025</h3>
          <p class="sep-description">
            Todo el contenido educativo de Math Mass está diseñado siguiendo los lineamientos y
            programas de estudio de la Secretaría de Educación Pública (SEP) para el ciclo escolar
            2025, específicamente para el nivel de 6º de Primaria en el área de Matemáticas.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* ============================================
   ABOUT PAGE - DISEÑO MODERNO
   ============================================ */

.about-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

/* Content Wrapper */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 0;
}

/* Hero Section */
.hero-about {
  background: linear-gradient(135deg, var(--color-sep-blue) 0%, #0055a5 100%);
  padding: var(--spacing-2xl) 0 var(--spacing-3xl) 0;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.hero-about .container-wide {
  max-width: 1200px;
}

/* Breadcrumb dentro del hero */
.breadcrumb-hero {
  text-align: left;
  margin-bottom: var(--spacing-2xl);
  padding: 0 2rem;
  position: relative;
  z-index: 10;
}

.breadcrumb-hero :deep(.breadcrumb-nav) {
  margin-bottom: 0;
}

.breadcrumb-hero :deep(.breadcrumb-link),
.breadcrumb-hero :deep(.breadcrumb-current),
.breadcrumb-hero :deep(.breadcrumb-separator) {
  color: rgba(255, 255, 255, 0.9) !important;
}

.breadcrumb-hero :deep(.breadcrumb-link) {
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.breadcrumb-hero :deep(.breadcrumb-link:hover) {
  color: white !important;
  text-decoration: underline;
}

.hero-about::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.4;
}

.icon-hero {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.hero-logo {
  width: 72px;
  height: 72px;
  object-fit: contain;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 1.5rem 0;
  font-weight: 400;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Feature Cards */
.feature-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 63, 135, 0.1);
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 63, 135, 0.15);
}

.feature-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.feature-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--color-sep-blue) 0%, #0055a5 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-sep-blue);
  margin: 0;
}

.feature-card ul {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.feature-card li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  color: var(--color-gray-700);
  font-size: 1rem;
  line-height: 1.6;
}

/* Tech Grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.tech-item {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 63, 135, 0.05);
}

.tech-item:hover {
  background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
  transform: translateX(4px);
}

.tech-name {
  font-weight: 700;
  color: var(--color-sep-blue);
  font-size: 1rem;
}

.tech-label {
  font-size: 0.8rem;
  color: var(--color-gray-600);
}

/* Content Section */
.content-section {
  margin-bottom: 4rem;
  margin-top: 3rem;
}

.section-header-center {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-icon-large {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--color-sep-blue) 0%, #0055a5 100%);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 63, 135, 0.25);
}

.section-title-large {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-sep-blue);
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--color-gray-600);
  margin: 0;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.topic-card {
  background: white;
  border-radius: 1.5rem;
  padding: 3rem 2.5rem;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.topic-card:hover {
  border-color: var(--color-sep-blue);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 63, 135, 0.15);
}

.topic-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--color-sep-blue);
  transition: all 0.3s ease;
}

.topic-card:hover .topic-icon {
  background: linear-gradient(135deg, var(--color-sep-blue) 0%, #0055a5 100%);
  color: white;
  transform: scale(1.1);
}

.topic-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-sep-blue);
  margin: 0 0 0.75rem 0;
}

.topic-description {
  font-size: 0.95rem;
  color: var(--color-gray-600);
  margin: 0;
  line-height: 1.5;
}

/* PWA Card */
.pwa-card {
  background: linear-gradient(135deg, var(--color-sep-blue) 0%, #0055a5 100%);
  border-radius: 1.5rem;
  padding: 3rem;
  margin-bottom: 3rem;
  margin-top: 3rem;
  box-shadow: 0 15px 50px rgba(0, 63, 135, 0.3);
  position: relative;
  overflow: hidden;
}

.pwa-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.pwa-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.pwa-icon {
  width: 72px;
  height: 72px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.pwa-title {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem 0;
}

.pwa-badge {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.pwa-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.7;
  margin: 0 0 2rem 0;
  position: relative;
  z-index: 1;
}

.pwa-features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  position: relative;
  z-index: 1;
  justify-content: center;
}

.pwa-feature {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.25rem 1.5rem;
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex: 0 0 calc(33.333% - 1rem);
  min-width: 320px;
}

.pwa-feature:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(4px);
}

/* SEP Card */
.sep-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  border-left: 4px solid var(--color-sep-blue);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 0;
}

.sep-icon-wrapper {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-sep-blue);
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0, 63, 135, 0.1);
}

.sep-content {
  flex: 1;
}

.sep-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-sep-blue);
  margin: 0 0 1rem 0;
}

.sep-description {
  font-size: 1rem;
  color: var(--color-gray-700);
  line-height: 1.7;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 1rem 3rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .icon-hero {
    width: 90px;
    height: 90px;
  }

  .section-title-large {
    font-size: 1.75rem;
  }

  .feature-card {
    padding: 2rem;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }

  .topics-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .topic-card {
    padding: 2rem 1.5rem;
  }

  .pwa-card {
    padding: 2rem;
  }

  .pwa-header {
    flex-direction: column;
    text-align: center;
  }

  .pwa-title {
    font-size: 1.5rem;
  }

  .pwa-features {
    grid-template-columns: 1fr;
  }

  .sep-card {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }

  .sep-icon-wrapper {
    margin: 0 auto;
  }
}
</style>
