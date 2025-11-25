<template>
  <div class="exercise-generator">
    <div class="container max-w-2xl mx-auto p-6">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Generador de Ejercicios</h1>

        <!-- Configuration Panel -->
        <div class="config-panel bg-gray-50 rounded-lg p-6 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Difficulty Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nivel de dificultad
              </label>
              <select
                v-model="selectedDifficulty"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="facil">Fácil (hasta 20)</option>
                <option value="medio">Medio (hasta 100)</option>
                <option value="dificil">Difícil (hasta 1000)</option>
              </select>
            </div>

            <!-- Number of Exercises -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Cantidad de ejercicios
              </label>
              <input
                v-model.number="exerciseCount"
                type="number"
                min="1"
                max="50"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <!-- Custom Seed -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Semilla personalizada (opcional)
              </label>
              <input
                v-model.number="customSeed"
                type="number"
                placeholder="Dejar vacío para aleatorio"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <!-- Use KaTeX -->
            <div class="flex items-end">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="useKaTeX" type="checkbox" class="w-4 h-4 text-blue-600 rounded" />
                <span class="text-sm font-medium text-gray-700">Usar notación matemática</span>
              </label>
            </div>
          </div>

          <!-- Current Seed Display -->
          <div class="mt-4 p-3 bg-blue-50 rounded text-sm text-gray-700">
            Semilla actual: <strong>{{ currentSeed }}</strong>
          </div>
        </div>

        <!-- Recent Sessions -->
        <div v-if="recentSessions.length > 0" class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Sesiones recientes</h3>
          <div class="space-y-2">
            <button
              v-for="session in recentSessions"
              :key="session.sessionId"
              @click="loadSession(session)"
              class="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div class="font-medium text-gray-800">
                Semilla: {{ session.seed }} ({{ session.exercises.length }} ejercicios)
              </div>
              <div class="text-sm text-gray-500">
                Correctas: {{ session.exercises.filter((e) => e.correct).length }} /
                {{ session.totalSolved }}
              </div>
            </button>
          </div>
        </div>

        <!-- Generate Button -->
        <div class="flex gap-4">
          <button
            @click="generateExercises"
            :disabled="isLoading"
            class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <span v-if="!isLoading">Generar ejercicios</span>
            <span v-else>Generando...</span>
          </button>

          <button
            @click="clearData"
            class="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExerciseStore } from '@/stores/exerciseStore'
import { useIndexedDB } from '@/composables/useIndexedDB'
import { ExerciseGenerator } from '@/services/ExerciseGenerator'
import type { DifficultyLevel, ExerciseSession } from '@/types'

const router = useRouter()
const exerciseStore = useExerciseStore()
const { saveExercises, getSessions, clearExercises } = useIndexedDB()

const selectedDifficulty = ref<DifficultyLevel>('medio')
const exerciseCount = ref(10)
const customSeed = ref<number | null>(null)
const useKaTeX = ref(false)
const isLoading = ref(false)
const recentSessions = ref<ExerciseSession[]>([])

const currentSeed = computed(() => customSeed.value || Math.random() * 1000000)

onMounted(async () => {
  // Cargar sesiones recientes
  const sessions = await getSessions()
  recentSessions.value = sessions.slice(0, 5)
})

const generateExercises = async () => {
  isLoading.value = true

  try {
    const seed = customSeed.value || Math.floor(Math.random() * 1000000)
    const generator = new ExerciseGenerator(seed)
    const exercises = generator.generateExercises(exerciseCount.value, selectedDifficulty.value)

    // Guardar en IndexedDB
    await saveExercises(exercises)

    // Inicializar en la store
    const sessionId = `session_${Date.now()}`
    exerciseStore.initializeSession(sessionId, exercises)

    // Navegar a la vista de ejercicios
    await router.push('/exercise')
  } catch (error) {
    console.error('Error generating exercises:', error)
    alert('Error al generar los ejercicios')
  } finally {
    isLoading.value = false
  }
}

const loadSession = async (session: ExerciseSession) => {
  exerciseStore.initializeSession(session.sessionId, session.exercises)
  await router.push('/exercise')
}

const clearData = async () => {
  if (confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
    await clearExercises()
    exerciseStore.resetSession()
    recentSessions.value = []
  }
}
</script>

<style scoped>
.exercise-generator {
  min-height: 100vh;
  background: var(--color-background);
  padding: 2rem 0;
}

.container {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
