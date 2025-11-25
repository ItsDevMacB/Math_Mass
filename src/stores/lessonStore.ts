import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Lesson, LessonProgress, UserStats } from '@/types/Lesson'
import { LESSONS } from '@/types/Lesson'

const STORAGE_KEY_PROGRESS = 'math-mass-lesson-progress'
const STORAGE_KEY_STATS = 'math-mass-user-stats'

export const useLessonStore = defineStore('lesson', () => {
  // Estado
  const progressMap = ref<Map<string, LessonProgress>>(new Map())
  const currentLessonId = ref<string | null>(null)

  // Cargar progreso desde localStorage
  const loadProgress = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROGRESS)
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, LessonProgress>
        progressMap.value = new Map(
          Object.entries(parsed).map(([id, data]) => {
            return [
              id,
              {
                ...data,
                ultimoAcceso: new Date(data.ultimoAcceso),
              },
            ]
          }),
        )
      }
    } catch (error) {
      console.error('Error cargando progreso:', error)
    }
  }

  // Guardar progreso en localStorage
  const saveProgress = () => {
    try {
      const obj: Record<string, LessonProgress> = {}
      progressMap.value.forEach((value, key) => {
        obj[key] = value
      })
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(obj))
    } catch (error) {
      console.error('Error guardando progreso:', error)
    }
  }

  // Cargar estadísticas desde localStorage
  const loadStats = (): UserStats => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_STATS)
      if (stored) {
        const parsed = JSON.parse(stored)
        return {
          ...parsed,
          ultimaActividad: new Date(parsed.ultimaActividad),
        }
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
    }

    return {
      leccionesCompletadas: 0,
      ejerciciosResueltos: 0,
      tiempoTotal: 0,
      precisionPromedio: 0,
      racha: 0,
      ultimaActividad: new Date(),
    }
  }

  // Guardar estadísticas en localStorage
  const saveStats = (stats: UserStats) => {
    try {
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats))
    } catch (error) {
      console.error('Error guardando estadísticas:', error)
    }
  }

  // Computed - Estadísticas del usuario
  const userStats = computed<UserStats>(() => {
    const stats = loadStats()

    // Recalcular desde progressMap si existe
    if (progressMap.value.size > 0) {
      let totalEjercicios = 0
      let totalCorrectos = 0
      let totalTiempo = 0
      let leccionesCompletas = 0

      progressMap.value.forEach((progress) => {
        totalEjercicios += progress.ejerciciosCompletados
        totalCorrectos += progress.ejerciciosCorrectos
        totalTiempo += progress.tiempoTotal

        if (progress.estado === 'completado') {
          leccionesCompletas++
        }
      })

      const precisionPromedio =
        totalEjercicios > 0 ? Math.round((totalCorrectos / totalEjercicios) * 100) : 0

      return {
        leccionesCompletadas: leccionesCompletas,
        ejerciciosResueltos: totalEjercicios,
        tiempoTotal: Math.round(totalTiempo / 60), // Convertir a minutos
        precisionPromedio,
        racha: stats.racha,
        ultimaActividad: new Date(),
      }
    }

    return stats
  })

  // Computed - Todas las lecciones ordenadas
  const allLessons = computed(() => {
    return [...LESSONS].sort((a, b) => a.orden - b.orden)
  })

  // Computed - Lecciones disponibles (no bloqueadas)
  const availableLessons = computed(() => {
    return allLessons.value.filter((lesson) => !isLessonLocked(lesson))
  })

  // Computed - Lección actual
  const currentLesson = computed(() => {
    if (!currentLessonId.value) return null
    return LESSONS.find((l) => l.id === currentLessonId.value) || null
  })

  // Obtener progreso de una lección
  const getLessonProgress = (lessonId: string): LessonProgress | undefined => {
    return progressMap.value.get(lessonId)
  }

  // Verificar si una lección está bloqueada
  const isLessonLocked = (lesson: Lesson): boolean => {
    if (!lesson.requisitos || lesson.requisitos.length === 0) {
      return false
    }

    return lesson.requisitos.some((reqId) => {
      const progress = progressMap.value.get(reqId)
      return !progress || progress.estado !== 'completado'
    })
  }

  // Iniciar o continuar una lección
  const startLesson = (lessonId: string) => {
    currentLessonId.value = lessonId

    if (!progressMap.value.has(lessonId)) {
      const newProgress: LessonProgress = {
        leccionId: lessonId,
        estado: 'en-progreso',
        ejerciciosCompletados: 0,
        ejerciciosCorrectos: 0,
        tiempoTotal: 0,
        ultimoAcceso: new Date(),
        intentos: 1,
        precision: 0,
        mejorPrecision: 0,
      }
      progressMap.value.set(lessonId, newProgress)
    } else {
      const progress = progressMap.value.get(lessonId)!
      progress.ultimoAcceso = new Date()
      progress.intentos++
    }

    saveProgress()
  }

  // Actualizar progreso de ejercicio
  const updateExerciseProgress = (lessonId: string, isCorrect: boolean, timeSpent: number) => {
    const progress = progressMap.value.get(lessonId)
    if (!progress) return

    progress.ejerciciosCompletados++
    if (isCorrect) {
      progress.ejerciciosCorrectos++
    }
    progress.tiempoTotal += timeSpent
    progress.precision = Math.round(
      (progress.ejerciciosCorrectos / progress.ejerciciosCompletados) * 100,
    )

    // Actualizar mejor precisión si el actual es mayor
    if (progress.precision > progress.mejorPrecision) {
      progress.mejorPrecision = progress.precision
    }

    progress.ultimoAcceso = new Date()

    saveProgress()
    saveStats(userStats.value)
  }

  // Completar una lección
  const completeLesson = (lessonId: string) => {
    const progress = progressMap.value.get(lessonId)
    if (!progress) return

    progress.estado = 'completado'
    progress.ultimoAcceso = new Date()

    saveProgress()
    saveStats(userStats.value)
  }

  // Actualizar resultado de examen (solo si es mejor que el anterior)
  const updateExamResult = (lessonId: string, totalQuestions: number, correctAnswers: number) => {
    const progress = progressMap.value.get(lessonId)
    if (!progress) {
      // Crear progreso si no existe
      startLesson(lessonId)
      const newProgress = progressMap.value.get(lessonId)!
      newProgress.ejerciciosCompletados = totalQuestions
      newProgress.ejerciciosCorrectos = correctAnswers
      newProgress.precision = Math.round((correctAnswers / totalQuestions) * 100)
      newProgress.mejorPrecision = newProgress.precision
    } else {
      // Calcular precisión actual
      const precisionActual = Math.round((correctAnswers / totalQuestions) * 100)

      // Solo actualizar si es mejor
      if (precisionActual > progress.mejorPrecision) {
        progress.ejerciciosCompletados = totalQuestions
        progress.ejerciciosCorrectos = correctAnswers
        progress.precision = precisionActual
        progress.mejorPrecision = precisionActual
      }

      progress.ultimoAcceso = new Date()
    }

    saveProgress()
    saveStats(userStats.value)
  }

  // Reiniciar progreso de una lección
  const resetLesson = (lessonId: string) => {
    progressMap.value.delete(lessonId)
    saveProgress()
    saveStats(userStats.value)
  }

  // Reiniciar todo el progreso
  const resetAllProgress = () => {
    progressMap.value.clear()
    currentLessonId.value = null
    localStorage.removeItem(STORAGE_KEY_PROGRESS)
    localStorage.removeItem(STORAGE_KEY_STATS)
  }

  // Actualizar racha
  const updateStreak = () => {
    const stats = userStats.value
    const today = new Date().setHours(0, 0, 0, 0)
    const lastActivity = new Date(stats.ultimaActividad).setHours(0, 0, 0, 0)
    const diffDays = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      // Mismo día, mantener racha
      return
    } else if (diffDays === 1) {
      // Día consecutivo, incrementar racha
      stats.racha++
    } else {
      // Se rompió la racha
      stats.racha = 1
    }

    stats.ultimaActividad = new Date()
    saveStats(stats)
  }

  // Inicializar store
  loadProgress()

  return {
    // Estado
    progressMap,
    currentLessonId,

    // Computed
    userStats,
    allLessons,
    availableLessons,
    currentLesson,

    // Métodos
    getLessonProgress,
    isLessonLocked,
    startLesson,
    updateExerciseProgress,
    completeLesson,
    updateExamResult,
    resetLesson,
    resetAllProgress,
    updateStreak,
  }
})
