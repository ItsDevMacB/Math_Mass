<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLessonStore } from '@/stores/lessonStore'
import { useNotifications } from '@/composables/useNotifications'
import {
  PieChart,
  Repeat,
  Target,
  Zap,
  Scale,
  Plus,
  Minus,
  X,
  Divide,
  Circle,
  BookOpen,
  CheckCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-vue-next'

const router = useRouter()
const lessonStore = useLessonStore()
const { showWelcomeNotification, showExamStartNotification, showExamResultNotification } =
  useNotifications()
const showFilter = ref(false)
const activeFilter = ref<'todas' | 'completadas' | 'en-progreso' | 'nuevas'>('todas')

// Funciones de prueba para notificaciones (TEMPORAL - para debugging)
const testWelcomeNotification = () => {
  console.log('🧪 Probando notificación de bienvenida...')
  showWelcomeNotification()
}

const testExamStartNotification = () => {
  console.log('🧪 Probando notificación de inicio de examen...')
  showExamStartNotification()
}

const testResultNotifications = () => {
  console.log('🧪 Probando notificaciones de resultado...')
  const scores = [100, 90, 70, 40, 10]
  scores.forEach((score, index) => {
    setTimeout(() => {
      console.log(`   Mostrando resultado para ${score}%`)
      showExamResultNotification(score)
    }, index * 3000)
  })
}

// Mapa de iconos
const iconMap: Record<string, typeof PieChart> = {
  PieChart,
  Repeat,
  Target,
  Zap,
  Scale,
  Plus,
  Minus,
  X,
  Divide,
  Circle,
  BookOpen,
  CheckCircle,
  RefreshCw,
  Sparkles,
}

// Función helper para obtener el componente del icono
const getIconComponent = (iconName: string) => {
  return iconMap[iconName] || Circle
}

// Filtrar lecciones según el filtro activo
const filteredLessons = computed(() => {
  if (activeFilter.value === 'todas') {
    return lessonStore.allLessons
  } else if (activeFilter.value === 'completadas') {
    return lessonStore.allLessons.filter(
      (lesson) => lessonStore.getLessonProgress(lesson.id)?.estado === 'completado',
    )
  } else if (activeFilter.value === 'en-progreso') {
    return lessonStore.allLessons.filter(
      (lesson) => lessonStore.getLessonProgress(lesson.id)?.estado === 'en-progreso',
    )
  } else if (activeFilter.value === 'nuevas') {
    return lessonStore.allLessons.filter(
      (lesson) => !lessonStore.getLessonProgress(lesson.id) && !lessonStore.isLessonLocked(lesson),
    )
  }
  return lessonStore.allLessons
})

const setFilter = (filter: 'todas' | 'completadas' | 'en-progreso' | 'nuevas') => {
  activeFilter.value = filter
}

const navigateToLesson = (url: string) => {
  router.push(url)
}

const startLearning = () => {
  const firstLesson = lessonStore.allLessons[0]
  if (firstLesson) {
    router.push(firstLesson.url)
  }
}

const toggleFilter = () => {
  showFilter.value = !showFilter.value
}
</script>

<template>
  <div class="home-container">
    <!-- Hero Section Educativo -->
    <section class="hero-section">
      <div class="container-wide">
        <div class="hero-content">
          <div class="hero-text">
            <div class="breadcrumb">
              <span>Inicio</span>
              <span class="separator">›</span>
              <span>Matemáticas 6º</span>
            </div>
            <h1 class="hero-title">Aprende Matemáticas de Forma Interactiva</h1>
            <p class="hero-description">
              Plataforma educativa alineada con los planes de estudio SEP 2025 para sexto grado de
              primaria. Practica con ejercicios dinámicos y refuerza tu aprendizaje.
            </p>
            <div class="flex flex-row items-center justify-center gap-8 hero-stats">
              <div class="text-center stat-item">
                <div class="stat-number">{{ lessonStore.allLessons.length }}</div>
                <div class="stat-label">Lecciones</div>
              </div>
              <div class="stat-divider"></div>
              <div class="text-center stat-item">
                <div class="stat-number">{{ lessonStore.userStats.leccionesCompletadas }}</div>
                <div class="stat-label">Completadas</div>
              </div>
              <div class="stat-divider"></div>
              <div class="text-center stat-item">
                <div class="stat-number">{{ lessonStore.userStats.precisionPromedio }}%</div>
                <div class="stat-label">Precisión</div>
              </div>
            </div>
            <div class="hero-actions">
              <button @click="startLearning" class="btn btn-primary btn-lg">
                <svg viewBox="0 0 20 20" fill="currentColor" class="btn-icon">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clip-rule="evenodd"
                  />
                </svg>
                Comenzar a Aprender
              </button>
              <RouterLink to="/about" class="btn btn-secondary btn-lg">
                Ver más información
              </RouterLink>
            </div>

            <!-- Botones de Prueba de Notificaciones (TEMPORAL - DEBUGGING) -->
            <div
              style="
                margin-top: 20px;
                padding: 15px;
                background: #fee;
                border: 2px dashed #f00;
                border-radius: 8px;
              "
            >
              <p style="font-weight: bold; margin-bottom: 10px; color: #c00">
                🧪 PANEL DE PRUEBAS - NOTIFICACIONES
              </p>
              <div style="display: flex; gap: 10px; flex-wrap: wrap">
                <button
                  @click="testWelcomeNotification"
                  class="btn btn-sm"
                  style="background: #3b82f6; color: white"
                >
                  Test Bienvenida
                </button>
                <button
                  @click="testExamStartNotification"
                  class="btn btn-sm"
                  style="background: #10b981; color: white"
                >
                  Test Inicio Examen
                </button>
                <button
                  @click="testResultNotifications"
                  class="btn btn-sm"
                  style="background: #f59e0b; color: white"
                >
                  Test Resultados (5)
                </button>
              </div>
              <p style="font-size: 12px; margin-top: 8px; color: #666">
                Abre la consola (F12) para ver los logs. Eliminar este panel antes de producción.
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center hero-image">
            <div
              class="flex flex-col items-center justify-center w-full max-w-lg p-16 h-96 bg-blue-50 rounded-3xl hero-logo-box"
            >
              <div class="relative mb-8">
                <img
                  src="/icons/Math_Mass_Logo2.svg"
                  alt="Math Mass Logo"
                  class="object-contain w-56 h-56"
                />
              </div>
              <h2 class="text-4xl font-bold text-blue-900">Math Mass</h2>
              <p class="mt-2 text-sm font-medium text-center text-gray-600">Plataforma Educativa</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lecciones Section -->
    <section class="lessons-section">
      <div class="container-wide">
        <div class="section-header">
          <div>
            <h2 class="section-title">Plan de Estudio</h2>
            <p class="section-description">Avanza paso a paso en tu aprendizaje de fracciones</p>
          </div>
          <div class="section-actions">
            <button
              @click="toggleFilter"
              class="btn btn-secondary btn-sm"
              :class="{ 'btn-active': showFilter }"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" class="btn-icon">
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clip-rule="evenodd"
                />
              </svg>
              Filtrar
            </button>
          </div>
        </div>

        <!-- Panel de filtros -->
        <div v-if="showFilter" class="filter-panel">
          <div class="filter-options">
            <button
              @click="setFilter('todas')"
              class="filter-btn"
              :class="{ 'filter-btn-active': activeFilter === 'todas' }"
            >
              <component :is="iconMap.BookOpen" :size="18" :stroke-width="2" />
              Todas
            </button>
            <button
              @click="setFilter('completadas')"
              class="filter-btn"
              :class="{ 'filter-btn-active': activeFilter === 'completadas' }"
            >
              <component :is="iconMap.CheckCircle" :size="18" :stroke-width="2" />
              Completadas
            </button>
            <button
              @click="setFilter('en-progreso')"
              class="filter-btn"
              :class="{ 'filter-btn-active': activeFilter === 'en-progreso' }"
            >
              <component :is="iconMap.RefreshCw" :size="18" :stroke-width="2" />
              En progreso
            </button>
            <button
              @click="setFilter('nuevas')"
              class="filter-btn"
              :class="{ 'filter-btn-active': activeFilter === 'nuevas' }"
            >
              <component :is="iconMap.Sparkles" :size="18" :stroke-width="2" />
              Nuevas
            </button>
          </div>
        </div>

        <div class="lessons-grid">
          <div
            v-for="lesson in filteredLessons"
            :key="lesson.id"
            class="lesson-card"
            :class="{
              'lesson-card-locked': lessonStore.isLessonLocked(lesson),
              'lesson-card-completed':
                lessonStore.getLessonProgress(lesson.id)?.estado === 'completado',
            }"
            @click="!lessonStore.isLessonLocked(lesson) ? navigateToLesson(lesson.url) : null"
          >
            <div class="lesson-card-header">
              <div class="lesson-number">Lección {{ lesson.numero }}</div>
              <div
                v-if="lessonStore.getLessonProgress(lesson.id)?.estado === 'completado'"
                class="lesson-badge-complete"
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div v-else-if="lessonStore.isLessonLocked(lesson)" class="lesson-badge-locked">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div class="lesson-card-icon">
              <component :is="getIconComponent(lesson.icono)" :size="48" :stroke-width="1.5" />
            </div>

            <h3 class="lesson-card-title">{{ lesson.titulo }}</h3>
            <p class="lesson-card-description">{{ lesson.descripcion }}</p>

            <div class="lesson-card-meta">
              <div class="meta-item">
                <svg viewBox="0 0 20 20" fill="currentColor" class="meta-icon">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>{{ lesson.tiempoEstimado }} min</span>
              </div>
              <div class="meta-item">
                <svg viewBox="0 0 20 20" fill="currentColor" class="meta-icon">
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>{{ lesson.ejerciciosTotal }} ejercicios</span>
              </div>
            </div>

            <div v-if="!lessonStore.isLessonLocked(lesson)" class="lesson-card-progress">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{
                    width: `${
                      ((lessonStore.getLessonProgress(lesson.id)?.ejerciciosCompletados || 0) /
                        lesson.ejerciciosTotal) *
                      100
                    }%`,
                  }"
                ></div>
              </div>
              <div class="progress-text">
                {{ lessonStore.getLessonProgress(lesson.id)?.ejerciciosCompletados || 0 }}/{{
                  lesson.ejerciciosTotal
                }}
                ejercicios ({{
                  Math.round(
                    ((lessonStore.getLessonProgress(lesson.id)?.ejerciciosCompletados || 0) /
                      lesson.ejerciciosTotal) *
                      100,
                  )
                }}%)
              </div>
            </div>

            <!-- Badge "Próximamente" para lecciones bloqueadas -->
            <div v-else-if="lesson.numero >= 2 && lesson.numero <= 9" class="coming-soon-badge">
              <svg viewBox="0 0 20 20" fill="currentColor" class="coming-soon-icon">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Próximamente</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ============================================
   HOME CONTAINER
   ============================================ */

.home-container {
  min-height: 100vh;
  background: var(--color-bg-secondary);
}

/* ============================================
   HERO SECTION
   ============================================ */

.hero-section {
  background: white;
  border-bottom: 1px solid var(--border-color-light);
  padding: var(--spacing-3xl) 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.separator {
  color: var(--color-gray-400);
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-sep-blue);
  line-height: var(--line-height-tight);
  margin: 0;
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--color-gray-700);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.hero-stats {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color-light);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-sep-blue);
  line-height: 1;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-top: var(--spacing-xs);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-color-light);
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-logo-box {
  border: 3px solid var(--color-sep-blue);
  box-shadow:
    0 20px 50px rgba(0, 63, 135, 0.25),
    0 0 40px rgba(59, 130, 246, 0.15);
  transition: all 0.3s ease;
}

.hero-logo-box:hover {
  box-shadow:
    0 25px 60px rgba(0, 63, 135, 0.35),
    0 0 50px rgba(59, 130, 246, 0.25);
  transform: translateY(-8px);
}

.image-placeholder {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
}

.image-placeholder svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(var(--shadow-lg));
}

/* ============================================
   LESSONS SECTION
   ============================================ */

.lessons-section {
  padding: var(--spacing-3xl) 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0;
}

.section-description {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  margin: var(--spacing-xs) 0 0 0;
}

.section-actions {
  display: flex;
  gap: var(--spacing-sm);
}

/* Grid de Lecciones */
.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-lg);
}

.lesson-card {
  background: white;
  border: 2px solid var(--border-color-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.lesson-card:hover:not(.lesson-card-locked) {
  border-color: var(--color-sep-blue);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.lesson-card-locked {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--color-bg-tertiary);
}

.lesson-card-completed {
  border-color: var(--color-success-green);
}

.lesson-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lesson-number {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.lesson-badge-complete {
  width: 24px;
  height: 24px;
  color: var(--color-success-green);
}

.lesson-badge-locked {
  width: 20px;
  height: 20px;
  color: var(--color-gray-400);
}

.lesson-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 0 auto;
  color: var(--color-sep-blue);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-sm);
}

.lesson-card-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0;
  line-height: var(--line-height-tight);
}

.lesson-card-description {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: var(--line-height-normal);
  margin: 0;
  flex-grow: 1;
}

.lesson-card-meta {
  display: flex;
  gap: var(--spacing-md);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-color-light);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.meta-icon {
  width: 16px;
  height: 16px;
  color: var(--color-gray-500);
}

.lesson-card-progress {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.progress-bar {
  height: 6px;
  background: var(--color-gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-sep-blue);
  transition: width var(--transition-slow);
  border-radius: var(--radius-full);
}

.lesson-card-completed .progress-fill {
  background: #10b981;
}

.progress-text {
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  text-align: right;
}

/* Estilos para lecciones completadas */
.lesson-card-completed {
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border-color: #86efac;
}

.lesson-card-completed:hover {
  border-color: #4ade80;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15);
}

/* ============================================
   COMING SOON BADGE
   ============================================ */

.coming-soon-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #fbbf24;
  border-radius: var(--radius-md);
  margin-top: var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: #92400e;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.coming-soon-icon {
  width: 18px;
  height: 18px;
  color: #d97706;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* ============================================
   FILTROS
   ============================================ */

.filter-panel {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-md);
  background: white;
  border: 2px solid var(--border-color-light);
  border-radius: var(--radius-lg);
  animation: slideDown 0.3s ease-out;
}

.filter-options {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-gray-50);
  border: 2px solid var(--border-color-light);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  background: var(--color-gray-100);
  border-color: var(--color-sep-blue);
}

.filter-btn-active {
  background: var(--color-sep-blue);
  border-color: var(--color-sep-blue);
  color: white;
}

.btn-active {
  background: var(--color-sep-blue);
  color: white;
  border-color: var(--color-sep-blue);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .hero-image {
    order: -1;
  }

  .image-placeholder {
    max-width: 300px;
  }

  .lessons-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--spacing-xl) 0;
  }

  .hero-title {
    font-size: var(--font-size-2xl);
  }

  .hero-stats {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .stat-divider {
    display: none;
  }

  .hero-actions {
    flex-direction: column;
  }

  .section-header {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .lessons-grid {
    grid-template-columns: 1fr;
  }
}
</style>
