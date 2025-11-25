import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Exercise, ExerciseSession } from '@/types'

export const useExerciseStore = defineStore('exercise', () => {
  // State
  const exercises = ref<Exercise[]>([])
  const currentSessionId = ref<string | null>(null)
  const currentExerciseIndex = ref(0)
  const isLoading = ref(false)

  // Computed
  const currentExercise = computed(() => exercises.value[currentExerciseIndex.value])

  const solvedCount = computed(() => exercises.value.filter((e) => e.solved).length)

  const correctCount = computed(() => exercises.value.filter((e) => e.correct).length)

  const totalExercises = computed(() => exercises.value.length)

  const accuracy = computed(() => {
    if (solvedCount.value === 0) return 0
    return Math.round((correctCount.value / solvedCount.value) * 100)
  })

  const isSessionComplete = computed(() => {
    return totalExercises.value > 0 && solvedCount.value === totalExercises.value
  })

  const progressPercentage = computed(() => {
    if (totalExercises.value === 0) return 0
    return Math.round((solvedCount.value / totalExercises.value) * 100)
  })

  // Methods
  const initializeSession = (sessionId: string, newExercises: Exercise[]) => {
    currentSessionId.value = sessionId
    exercises.value = newExercises
    currentExerciseIndex.value = 0
  }

  const addExercises = (newExercises: Exercise[]) => {
    exercises.value = newExercises
    currentExerciseIndex.value = 0
  }

  const submitAnswer = (answer: number): boolean => {
    if (currentExercise.value) {
      currentExercise.value.userAnswer = answer
      const isCorrect = currentExercise.value.answer === answer
      currentExercise.value.correct = isCorrect
      currentExercise.value.solved = true
      return isCorrect
    }
    return false
  }

  const nextExercise = (): boolean => {
    if (currentExerciseIndex.value < exercises.value.length - 1) {
      currentExerciseIndex.value++
      return true
    }
    return false
  }

  const previousExercise = (): boolean => {
    if (currentExerciseIndex.value > 0) {
      currentExerciseIndex.value--
      return true
    }
    return false
  }

  const goToExercise = (index: number): boolean => {
    if (index >= 0 && index < exercises.value.length) {
      currentExerciseIndex.value = index
      return true
    }
    return false
  }

  const updateExercise = (id: string, updates: Partial<Exercise>) => {
    const exercise = exercises.value.find((e) => e.id === id)
    if (exercise) {
      Object.assign(exercise, updates)
    }
  }

  const getSessionData = (): ExerciseSession => {
    return {
      sessionId: currentSessionId.value || '',
      seed: 0,
      exercises: exercises.value,
      createdAt: Date.now(),
      totalSolved: solvedCount.value,
    }
  }

  const resetSession = () => {
    exercises.value = []
    currentSessionId.value = null
    currentExerciseIndex.value = 0
    isLoading.value = false
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  return {
    // State
    exercises,
    currentSessionId,
    currentExerciseIndex,
    isLoading,

    // Computed
    currentExercise,
    solvedCount,
    correctCount,
    totalExercises,
    accuracy,
    isSessionComplete,
    progressPercentage,

    // Methods
    initializeSession,
    addExercises,
    submitAnswer,
    nextExercise,
    previousExercise,
    goToExercise,
    updateExercise,
    getSessionData,
    resetSession,
    setLoading,
  }
})
