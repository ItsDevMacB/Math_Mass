<template>
  <div class="exercise-view">
    <!-- Breadcrumb -->
    <div class="container-wide" style="padding-top: var(--spacing-lg)">
      <BreadcrumbNav :items="breadcrumbs" />
    </div>

    <!-- Loading State -->
    <div v-if="exerciseStore.isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
          style="border-color: var(--color-sep-blue)"
        ></div>
        <p style="color: var(--color-gray-600)">Generando ejercicios...</p>
      </div>
    </div>

    <!-- No Exercises State -->
    <div
      v-else-if="!exerciseStore.currentExercise"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center card-academic" style="max-width: 400px">
        <div
          class="mb-4 mx-auto flex items-center justify-center"
          style="
            width: 64px;
            height: 64px;
            background: var(--color-gray-100);
            border-radius: var(--radius-full);
            font-size: 2rem;
          "
        >
          📝
        </div>
        <p class="text-lg mb-4" style="color: var(--color-gray-600)">
          No hay ejercicios disponibles
        </p>
        <RouterLink to="/generate" class="btn btn-primary"> Generar ejercicios </RouterLink>
      </div>
    </div>

    <!-- Exercise Display -->
    <div v-else>
      <ExerciseDisplay
        :exercise="exerciseStore.currentExercise"
        :current-index="exerciseStore.currentExerciseIndex"
        :total="exerciseStore.totalExercises"
        :accuracy-percentage="exerciseStore.accuracy"
        :progress-percentage="exerciseStore.progressPercentage"
        :use-ka-te-x="useKaTeX"
        @submit="handleSubmit"
        @next="handleNext"
        @previous="handlePrevious"
        @finish="handleFinish"
      />

      <!-- Session Summary Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div
            v-if="showSummary"
            class="fixed inset-0 flex items-center justify-center p-4"
            style="
              background: rgba(0, 0, 0, 0.5);
              z-index: var(--z-index-modal);
              backdrop-filter: blur(4px);
            "
          >
            <div
              class="bg-white max-w-md w-full p-8 animate-scale-in"
              style="
                border-radius: var(--radius-xl);
                box-shadow: var(--shadow-xl);
                border: 2px solid var(--color-sep-blue);
              "
            >
              <div class="text-center mb-6">
                <div
                  class="mx-auto mb-4 flex items-center justify-center"
                  style="
                    width: 80px;
                    height: 80px;
                    background: var(--color-sep-blue);
                    border-radius: var(--radius-full);
                    font-size: 3rem;
                  "
                >
                  🎉
                </div>
                <h2 class="text-2xl font-bold mb-2" style="color: var(--color-sep-blue)">
                  ¡Sesión Completada!
                </h2>
                <p style="color: var(--color-gray-600)">Revisa tu desempeño</p>
              </div>

              <div class="space-y-3 mb-6">
                <div
                  class="flex justify-between items-center py-3 px-4"
                  style="
                    background: var(--color-gray-50);
                    border-radius: var(--radius-md);
                    border-left: 4px solid var(--color-sep-blue);
                  "
                >
                  <span style="color: var(--color-gray-700)">Total de ejercicios:</span>
                  <span class="font-bold text-lg" style="color: var(--color-sep-blue)">{{
                    exerciseStore.totalExercises
                  }}</span>
                </div>
                <div
                  class="flex justify-between items-center py-3 px-4"
                  style="
                    background: var(--color-gray-50);
                    border-radius: var(--radius-md);
                    border-left: 4px solid var(--color-success-green);
                  "
                >
                  <span style="color: var(--color-gray-700)">Correctas:</span>
                  <span class="font-bold text-lg" style="color: var(--color-success-green)">{{
                    exerciseStore.correctCount
                  }}</span>
                </div>
                <div
                  class="flex justify-between items-center py-3 px-4"
                  style="
                    background: var(--color-gray-50);
                    border-radius: var(--radius-md);
                    border-left: 4px solid var(--color-error-red);
                  "
                >
                  <span style="color: var(--color-gray-700)">Incorrectas:</span>
                  <span class="font-bold text-lg" style="color: var(--color-error-red)">
                    {{ exerciseStore.solvedCount - exerciseStore.correctCount }}
                  </span>
                </div>
                <div
                  class="flex justify-between items-center py-4 px-4"
                  style="
                    background: var(--color-sep-blue);
                    border-radius: var(--radius-md);
                    color: white;
                  "
                >
                  <span class="font-medium text-lg">Precisión final:</span>
                  <span class="font-bold text-2xl">{{ exerciseStore.accuracy }}%</span>
                </div>
              </div>

              <div class="flex gap-3">
                <button @click="backToGenerate" class="btn btn-secondary flex-1">Volver</button>
                <button @click="generateNew" class="btn btn-primary flex-1">
                  Nuevos ejercicios
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ExerciseDisplay from '@/components/exercise/ExerciseDisplay.vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import { useExerciseStore } from '@/stores/exerciseStore'
import { useIndexedDB } from '@/composables/useIndexedDB'

const breadcrumbs = [{ label: 'Inicio', path: '/' }, { label: 'Ejercicios' }]

const router = useRouter()
const exerciseStore = useExerciseStore()
const { saveExercise } = useIndexedDB()

const showSummary = ref(false)
const useKaTeX = ref(true)

const handleSubmit = async (answer: number) => {
  exerciseStore.submitAnswer(answer)
  const exercise = exerciseStore.currentExercise

  if (exercise) {
    await saveExercise(exercise)
  }

  // Auto advance after 2 seconds
  setTimeout(() => {
    if (!exerciseStore.isSessionComplete) {
      exerciseStore.nextExercise()
    } else {
      showSummary.value = true
    }
  }, 2000)
}

const handleNext = () => {
  if (!exerciseStore.nextExercise()) {
    showSummary.value = true
  }
}

const handlePrevious = () => {
  exerciseStore.previousExercise()
}

const handleFinish = () => {
  showSummary.value = true
}

const backToGenerate = async () => {
  exerciseStore.resetSession()
  showSummary.value = false
  await router.push('/generate')
}

const generateNew = async () => {
  exerciseStore.resetSession()
  showSummary.value = false
  await router.push('/generate')
}
</script>

<style scoped>
.exercise-view {
  width: 100%;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}
</style>
