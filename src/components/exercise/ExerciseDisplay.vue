<template>
  <div class="exercise-display">
    <div class="max-w-2xl mx-auto exercise-card card-academic">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold" style="color: var(--color-sep-blue)">
          Ejercicio {{ currentIndex + 1 }} de {{ total }}
        </h2>
        <div
          class="px-3 py-1"
          style="
            background: var(--color-gray-100);
            border-radius: var(--radius-full);
            color: var(--color-sep-blue);
            font-weight: 600;
          "
        >
          {{ accuracyPercentage }}%
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="w-full h-2 mb-6 rounded-full" style="background: var(--color-gray-200)">
        <div
          class="h-2 transition-all duration-300 rounded-full"
          :style="{
            width: progressPercentage + '%',
            background: 'var(--color-success-green)',
          }"
        ></div>
      </div>

      <!-- Exercise Question -->
      <div
        class="p-6 mb-8 question-section"
        style="
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
          border: 2px solid var(--color-sep-blue-light);
        "
      >
        <div class="text-4xl font-bold text-center" style="color: var(--color-gray-900)">
          {{ exercise?.question }}
        </div>
      </div>

      <!-- Answer Input -->
      <div class="mb-6 input-section">
        <label class="block mb-2 text-sm font-medium" style="color: var(--color-gray-700)">
          Tu respuesta:
        </label>
        <div class="flex gap-4">
          <input
            v-model.number="userAnswer"
            type="number"
            placeholder="Ingresa tu respuesta"
            class="flex-1 px-4 py-3 border rounded-lg outline-none exercise-input"
            @keyup.enter="handleSubmit"
          />
          <button @click="handleSubmit" class="btn btn-primary">Enviar</button>
        </div>
      </div>

      <!-- Feedback -->
      <div v-if="showFeedback" class="mb-6 feedback-section">
        <div v-if="isCorrect" class="alert alert-success">
          <span style="font-size: 1.5rem; margin-right: 8px">✓</span>
          <span>¡Respuesta correcta!</span>
        </div>
        <div v-else class="alert alert-error">
          <span style="font-size: 1.5rem; margin-right: 8px">✗</span>
          <span
            >Respuesta incorrecta. La respuesta correcta es:
            <strong>{{ exercise?.answer }}</strong>
          </span>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between gap-4 navigation-section">
        <button
          @click="handlePrevious"
          :disabled="currentIndex === 0"
          class="btn btn-secondary"
          :style="{ opacity: currentIndex === 0 ? '0.5' : '1' }"
        >
          ← Anterior
        </button>

        <div class="flex gap-2">
          <button v-if="!isLastExercise" @click="handleNext" class="btn btn-primary">
            Siguiente →
          </button>
          <button v-else @click="handleFinish" class="btn btn-success">Finalizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Exercise } from '@/types'

interface Props {
  exercise: Exercise | null
  currentIndex: number
  total: number
  accuracyPercentage: number
  progressPercentage: number
  useKaTeX?: boolean
}

interface Emits {
  (e: 'submit', answer: number): void
  (e: 'next'): void
  (e: 'previous'): void
  (e: 'finish'): void
}

const props = withDefaults(defineProps<Props>(), {
  useKaTeX: false,
})

const emit = defineEmits<Emits>()

const userAnswer = ref<number | null>(null)
const showFeedback = ref(false)
const isCorrect = ref(false)

const isLastExercise = computed(() => props.currentIndex === props.total - 1)

const handleSubmit = () => {
  if (userAnswer.value === null || userAnswer.value === undefined) {
    alert('Por favor ingresa una respuesta')
    return
  }

  isCorrect.value = userAnswer.value === props.exercise?.answer
  showFeedback.value = true
  emit('submit', userAnswer.value)
}

const handleNext = () => {
  resetForm()
  emit('next')
}

const handlePrevious = () => {
  resetForm()
  emit('previous')
}

const handleFinish = () => {
  resetForm()
  emit('finish')
}

const resetForm = () => {
  userAnswer.value = null
  showFeedback.value = false
  isCorrect.value = false
}
</script>

<style scoped>
.exercise-display {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--color-background);
}

.exercise-card {
  animation: slideIn 0.3s ease-out;
}

.exercise-input {
  border-color: var(--border-color-light);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast);
}

.exercise-input:focus {
  border-color: var(--color-sep-blue);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
