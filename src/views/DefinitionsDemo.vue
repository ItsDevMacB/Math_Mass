<template>
  <div class="demo-definitions">
    <!-- Breadcrumb -->
    <div class="container-wide" style="padding-top: var(--spacing-lg)">
      <BreadcrumbNav :items="breadcrumbs" />
    </div>

    <!-- Encabezado -->
    <header class="demo-header">
      <h1>Definiciones y Conceptos</h1>
      <p class="subtitle">Sistema de enseñanza con contenido dinámico y ejemplos interactivos</p>
    </header>

    <!-- Selector de tema -->
    <div class="theme-selector">
      <h3>Selecciona un tema:</h3>
      <div class="theme-buttons">
        <button
          v-for="tema in temas"
          :key="tema.id"
          @click="currentTema = tema.id"
          class="theme-btn"
          :class="{ active: currentTema === tema.id }"
        >
          <span class="theme-name">{{ tema.nombre }}</span>
        </button>
      </div>
    </div>

    <!-- Componente de definiciones -->
    <FractionDefinitions
      :tema="currentTema"
      :show-components="currentTema === 'introduccion'"
      :show-types="currentTema === 'introduccion'"
      :show-mixed-explanation="currentTema === 'numeros-mixtos'"
    />

    <!-- Sección de pruebas -->
    <div class="katex-showcase">
      <h2>Ejemplos de Fracciones</h2>
      <div class="showcase-grid">
        <!-- Fracciones simples -->
        <div class="showcase-card">
          <h4>Fracciones Simples</h4>
          <div class="fractions-row">
            <FractionDisplay :numerador="1" :denominador="2" size="small" />
            <FractionDisplay :numerador="3" :denominador="4" size="normal" />
            <FractionDisplay :numerador="5" :denominador="8" size="large" />
          </div>
        </div>

        <!-- Números mixtos -->
        <div class="showcase-card">
          <h4>Números Mixtos</h4>
          <div class="fractions-row">
            <FractionDisplay :numerador="3" :denominador="4" :entero="2" size="small" />
            <FractionDisplay :numerador="1" :denominador="2" :entero="5" size="normal" />
            <FractionDisplay :numerador="2" :denominador="3" :entero="7" size="large" />
          </div>
        </div>

        <!-- Con simplificación -->
        <div class="showcase-card">
          <h4>Con Simplificación</h4>
          <div class="fractions-row">
            <FractionDisplay :numerador="4" :denominador="8" show-simplified size="normal" />
            <FractionDisplay :numerador="6" :denominador="9" show-simplified size="normal" />
            <FractionDisplay :numerador="12" :denominador="18" show-simplified size="normal" />
          </div>
        </div>

        <!-- Inline en texto -->
        <div class="showcase-card">
          <h4>Inline en Texto</h4>
          <p class="inline-text">
            La fracción
            <FractionDisplay :numerador="3" :denominador="4" size="small" inline />
            es equivalente a
            <FractionDisplay :numerador="6" :denominador="8" size="small" inline />
            porque ambas representan 0.75. También podemos escribir el número mixto
            <FractionDisplay :numerador="1" :denominador="2" :entero="2" size="small" inline />
            que equivale a 2.5 o
            <FractionDisplay :numerador="5" :denominador="2" size="small" inline />
            en forma impropia.
          </p>
        </div>
      </div>
    </div>

    <!-- Sección de ejercicios del tema actual -->
    <div class="exercises-section">
      <div class="exercises-header">
        <h2>Ejercicios del Tema</h2>
        <button @click="generateExercises" class="generate-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
            <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
            <path d="M6 18h.01" />
            <path d="M10 14h.01" />
            <path d="M15 6h.01" />
            <path d="M18 9h.01" />
          </svg>
          Generar Nuevos Ejercicios
        </button>
      </div>

      <div v-if="exercises.length > 0" class="exercises-grid">
        <div v-for="(exercise, index) in exercises" :key="exercise.id" class="exercise-card">
          <div class="exercise-number">{{ index + 1 }}</div>
          <div class="exercise-question" v-html="formatQuestionWithKaTeX(exercise.pregunta)"></div>

          <div class="exercise-options">
            <button
              v-for="(opcion, i) in exercise.opciones"
              :key="i"
              @click="selectOption(index, opcion)"
              class="option-btn"
              :class="{
                selected: selectedAnswers[index] === opcion,
                correct: showResults && opcion === exercise.correcta,
                incorrect:
                  showResults && selectedAnswers[index] === opcion && opcion !== exercise.correcta,
              }"
              :disabled="showResults"
            >
              <span v-html="formatOptionWithKaTeX(opcion)"></span>
            </button>
          </div>

          <div v-if="showResults" class="exercise-explanation">
            <p class="explanation-text"><strong>Explicación:</strong> {{ exercise.explicacion }}</p>
          </div>
        </div>
      </div>

      <button v-if="exercises.length > 0 && !showResults" @click="verifyAnswers" class="verify-btn">
        ✓ Verificar Respuestas
      </button>

      <div v-if="showResults" class="results-summary">
        <h3>Resultados</h3>
        <p class="score" :style="{ color: accuracyColor }">
          Precisión: {{ correctCount }}/{{ exercises.length }} (<strong>{{ accuracy }}%</strong>)
        </p>
        <div class="results-actions">
          <button @click="resetExercises" class="reset-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            Intentar de Nuevo
          </button>
          <button v-if="accuracy === 100" @click="goToHome" class="next-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FractionDefinitions from '@/components/FractionDefinitions.vue'
import FractionDisplay from '@/components/FractionDisplay.vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import { FractionExerciseGenerator } from '@/services/FractionExerciseGenerator'
import type { ExerciseQuestion } from '@/services/FractionExerciseGenerator'
import { useKaTeX } from '@/composables/useKaTeX'
import { useLessonStore } from '@/stores/lessonStore'
import { useNotifications } from '@/composables/useNotifications'

const breadcrumbs = [
  { label: 'Inicio', path: '/' },
  { label: 'Lecciones', path: '/' },
  { label: 'Definiciones y Conceptos' },
]

// Temas disponibles
const temas = [
  {
    id: 'introduccion' as const,
    nombre: 'Introducción a Fracciones',
    leccionId: 'introduccion-fracciones',
  },
  {
    id: 'numeros-mixtos' as const,
    nombre: 'Números Mixtos',
    leccionId: 'numeros-mixtos',
  },
  {
    id: 'equivalentes' as const,
    nombre: 'Fracciones Equivalentes',
    leccionId: 'fracciones-equivalentes',
  },
  {
    id: 'simplificacion' as const,
    nombre: 'Simplificación',
    leccionId: 'simplificacion-fracciones',
  },
  {
    id: 'comparacion' as const,
    nombre: 'Comparación',
    leccionId: 'comparacion-fracciones',
  },
]

const currentTema = ref<
  'introduccion' | 'numeros-mixtos' | 'equivalentes' | 'simplificacion' | 'comparacion'
>('introduccion')

// Ejercicios
const exercises = ref<ExerciseQuestion[]>([])
const selectedAnswers = ref<Record<number, string>>({})
const showResults = ref(false)
const lessonStore = useLessonStore()
const { showExamResultNotification } = useNotifications()

const currentLessonId = computed(() => {
  const tema = temas.find((t) => t.id === currentTema.value)
  return tema?.leccionId || 'introduccion-fracciones'
})

const correctCount = computed(() => {
  return exercises.value.filter(
    (_ex: ExerciseQuestion, i: number) => selectedAnswers.value[i] === _ex.correcta,
  ).length
})

const accuracy = computed(() => {
  if (exercises.value.length === 0) return 0
  return Math.round((correctCount.value / exercises.value.length) * 100)
})

const accuracyColor = computed(() => {
  const acc = accuracy.value
  if (acc >= 80) return '#10b981' // Verde - Excelente
  if (acc >= 60) return '#f59e0b' // Ámbar - Bien
  if (acc >= 40) return '#ef4444' // Rojo - Necesita mejora
  return '#ef4444' // Rojo - Insuficiente
})

// Métodos
const generateExercises = () => {
  exercises.value = FractionExerciseGenerator.generateForLesson(currentLessonId.value, 10, 'medio')
  selectedAnswers.value = {}
  showResults.value = false
}

const selectOption = (index: number, option: string) => {
  if (!showResults.value) {
    selectedAnswers.value[index] = option
  }
}

const verifyAnswers = () => {
  showResults.value = true

  // Contar respuestas correctas del intento actual
  let correctasActual = 0
  for (let i = 0; i < exercises.value.length; i++) {
    const exercise = exercises.value[i]
    const selectedAnswer = selectedAnswers.value[i]
    if (selectedAnswer === exercise?.correcta) {
      correctasActual++
    }
  }

  // Calcular el porcentaje
  const porcentaje = Math.round((correctasActual / exercises.value.length) * 100)

  // Actualizar resultado del examen (solo guarda si es el mejor)
  lessonStore.updateExamResult(currentLessonId.value, exercises.value.length, correctasActual)

  // Si tiene 100% de aciertos, marcar como completado
  if (correctasActual === exercises.value.length) {
    lessonStore.completeLesson(currentLessonId.value)
  }

  // Mostrar notificación con el resultado
  console.log('📊 Mostrando notificación de resultado:', porcentaje + '%')
  setTimeout(() => {
    showExamResultNotification(porcentaje)
  }, 500)
}

const resetExercises = () => {
  selectedAnswers.value = {}
  showResults.value = false
}

const goToHome = () => {
  window.location.href = '/'
}

// Función para formatear preguntas con KaTeX
const formatQuestionWithKaTeX = (pregunta: string): string => {
  const { renderToString } = useKaTeX()

  // Reemplazar fracciones en formato texto con KaTeX
  let formattedQuestion = pregunta

  // Patrón para detectar fracciones simples formato "numerador/denominador"
  formattedQuestion = formattedQuestion.replace(/(\d+)\/(\d+)/g, (match, num, denom) => {
    try {
      return renderToString(`\\mathbf{\\frac{${num}}{${denom}}}`, { displayMode: false })
    } catch {
      return match
    }
  })

  return formattedQuestion
}

// Función para formatear opciones con KaTeX
const formatOptionWithKaTeX = (opcion: string): string => {
  const { renderToString } = useKaTeX()

  let formattedOption = opcion

  // Patrón para detectar fracciones simples
  formattedOption = formattedOption.replace(/(\d+)\/(\d+)/g, (match, num, denom) => {
    try {
      return renderToString(`\\mathbf{\\frac{${num}}{${denom}}}`, { displayMode: false })
    } catch {
      return match
    }
  })

  // Patrón para números mixtos: "entero numerador/denominador"
  formattedOption = formattedOption.replace(
    /(\d+)\s+(\d+)\/(\d+)/g,
    (match, entero, num, denom) => {
      try {
        return renderToString(`\\mathbf{${entero}\\frac{${num}}{${denom}}}`, { displayMode: false })
      } catch {
        return match
      }
    },
  )

  return formattedOption
}

// Generar ejercicios iniciales
generateExercises()
</script>

<style scoped>
.demo-definitions {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

/* Header */
.demo-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 32px;
  background: var(--color-sep-blue);
  border-radius: var(--radius-xl);
  color: white;
  box-shadow: var(--shadow-lg);
}

.demo-header h1 {
  font-size: 2.5rem;
  margin: 0 0 12px 0;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.95;
  margin: 0;
}

/* Theme Selector */
.theme-selector {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.theme-selector h3 {
  font-size: 1.3rem;
  color: var(--dark, #1f2937);
  margin: 0 0 16px 0;
}

.theme-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 20px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--dark, #374151);
}

.theme-btn:hover {
  border-color: var(--primary, #6366f1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.theme-btn.active {
  background: var(--color-sep-blue);
  border-color: var(--color-sep-blue);
  color: white;
  box-shadow: var(--shadow-md);
}

.theme-icon {
  font-size: 1.5rem;
}

/* KaTeX Showcase */
.katex-showcase {
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin: 32px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.katex-showcase h2 {
  font-size: 1.8rem;
  color: var(--primary, #6366f1);
  margin: 0 0 24px 0;
}

.showcase-grid {
  display: grid;
  gap: 24px;
}

.showcase-card {
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 2px solid var(--border-color-light);
}

.showcase-card h4 {
  font-size: 1.2rem;
  color: var(--dark, #1f2937);
  margin: 0 0 16px 0;
}

.fractions-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 24px;
}

.inline-text {
  font-size: 1.05rem;
  line-height: 2;
  color: var(--dark, #374151);
  text-align: justify;
}

/* Exercises */
.exercises-section {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-top: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.exercises-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  gap: 16px;
}

.exercises-header h2 {
  font-size: 1.5rem;
  color: var(--dark, #1f2937);
  margin: 0;
  font-weight: 600;
}

.generate-btn {
  padding: 10px 20px;
  background: var(--color-sep-blue);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: var(--transition-base);
  display: flex;
  align-items: center;
  gap: 8px;
}

.generate-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.generate-btn:hover {
  background: var(--color-sep-blue-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.exercises-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
}

.exercise-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-top: 3px solid var(--color-sep-blue);
  border-radius: var(--radius-lg);
  padding: 24px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.exercise-number {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 32px;
  height: 32px;
  background: var(--color-sep-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.95rem;
}

.exercise-question {
  font-size: 1.05rem;
  color: var(--dark, #1f2937);
  margin: 0 0 20px 0;
  font-weight: 500;
  line-height: 1.6;
}

.exercise-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.option-btn {
  padding: 12px 16px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--dark, #374151);
}

.option-btn:hover:not(:disabled) {
  border-color: var(--color-sep-blue);
  background: #f3f4f6;
}

.option-btn.selected {
  border-color: var(--color-sep-blue);
  background: #f0f4ff;
  color: var(--color-sep-blue);
}

.option-btn.correct {
  border-color: #10b981;
  background: #f0fdf4;
  color: #10b981;
}

.option-btn.incorrect {
  border-color: #ef4444;
  background: #fef2f2;
  color: #ef4444;
}

.option-btn:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}

.exercise-explanation {
  padding: 14px;
  background: #f9fafb;
  border-radius: 6px;
  margin-top: 16px;
  border-left: 3px solid var(--color-sep-blue);
}

.explanation-text {
  font-size: 0.93rem;
  color: var(--dark, #374151);
  margin: 0;
  line-height: 1.5;
}

.verify-btn {
  width: 100%;
  padding: 14px;
  background: var(--color-sep-blue);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: var(--transition-base);
}

.verify-btn:hover {
  background: #1e40af;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.results-summary {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;
  border-top: 4px solid var(--color-sep-blue);
  border-radius: var(--radius-lg);
  margin-top: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.results-summary h3 {
  font-size: 1.4rem;
  color: var(--color-sep-blue);
  margin: 0 0 24px 0;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.score {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-sep-blue);
  margin: 0 0 32px 0;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(30, 64, 175, 0.1);
}

.results-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.reset-btn,
.next-btn {
  padding: 14px 36px;
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.98rem;
  font-weight: 700;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.25);
}

.reset-btn {
  background: var(--color-sep-blue);
}

.next-btn {
  background: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.reset-btn svg,
.next-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  transition: transform 0.3s ease;
}

.reset-btn:hover {
  background: #1e3a8a;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(30, 64, 175, 0.35);
}

.next-btn:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35);
}

.reset-btn:hover svg {
  transform: rotate(180deg);
}

.next-btn:hover svg {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .demo-definitions {
    padding: 16px;
  }

  .demo-header h1 {
    font-size: 1.8rem;
  }

  .theme-buttons {
    grid-template-columns: 1fr;
  }

  .exercises-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .exercise-options {
    grid-template-columns: 1fr;
  }
}
</style>
