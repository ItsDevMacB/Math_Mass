import { ref, onMounted } from 'vue'
import type { Exercise, ExerciseSession } from '@/types'

const DB_NAME = 'MathMassDB'
const EXERCISES_STORE = 'exercises'
const SESSIONS_STORE = 'sessions'

export function useIndexedDB() {
  const db = ref<IDBDatabase | null>(null)
  const isReady = ref(false)

  /**
   * Inicializa la base de datos
   */
  const initDB = async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1)

      request.onerror = () => {
        console.error('Error opening IndexedDB:', request.error)
        reject(request.error)
      }

      request.onsuccess = () => {
        db.value = request.result
        isReady.value = true
        console.log('IndexedDB initialized successfully')
        resolve(request.result)
      }

      request.onupgradeneeded = (event) => {
        const database = (event.target as IDBOpenDBRequest).result

        // Crear object store para ejercicios
        if (!database.objectStoreNames.contains(EXERCISES_STORE)) {
          const exerciseStore = database.createObjectStore(EXERCISES_STORE, {
            keyPath: 'id',
          })
          exerciseStore.createIndex('timestamp', 'timestamp', { unique: false })
        }

        // Crear object store para sesiones
        if (!database.objectStoreNames.contains(SESSIONS_STORE)) {
          const sessionStore = database.createObjectStore(SESSIONS_STORE, {
            keyPath: 'sessionId',
          })
          sessionStore.createIndex('createdAt', 'createdAt', { unique: false })
        }
      }
    })
  }

  /**
   * Guarda un ejercicio en IndexedDB
   */
  const saveExercise = async (exercise: Exercise): Promise<void> => {
    const database = db.value || (await initDB())

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([EXERCISES_STORE], 'readwrite')
      const store = transaction.objectStore(EXERCISES_STORE)
      const request = store.put(exercise)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        console.log('Exercise saved:', exercise.id)
        resolve()
      }
    })
  }

  /**
   * Guarda múltiples ejercicios
   */
  const saveExercises = async (exercises: Exercise[]): Promise<void> => {
    const database = db.value || (await initDB())

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([EXERCISES_STORE], 'readwrite')
      const store = transaction.objectStore(EXERCISES_STORE)

      exercises.forEach((exercise) => {
        store.put(exercise)
      })

      transaction.onerror = () => reject(transaction.error)
      transaction.oncomplete = () => {
        console.log(`${exercises.length} exercises saved`)
        resolve()
      }
    })
  }

  /**
   * Obtiene un ejercicio por ID
   */
  const getExercise = async (id: string): Promise<Exercise | undefined> => {
    const database = db.value || (await initDB())

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([EXERCISES_STORE], 'readonly')
      const store = transaction.objectStore(EXERCISES_STORE)
      const request = store.get(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  /**
   * Obtiene todos los ejercicios
   */
  const getExercises = async (): Promise<Exercise[]> => {
    const database = db.value || (await initDB())

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([EXERCISES_STORE], 'readonly')
      const store = transaction.objectStore(EXERCISES_STORE)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result || [])
    })
  }

  /**
   * Guarda una sesión de ejercicios
   */
  const saveSession = async (session: ExerciseSession): Promise<void> => {
    const database = db.value || (await initDB())

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([SESSIONS_STORE], 'readwrite')
      const store = transaction.objectStore(SESSIONS_STORE)
      const request = store.put(session)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        console.log('Session saved:', session.sessionId)
        resolve()
      }
    })
  }

  /**
   * Obtiene una sesión por ID
   */
  const getSession = async (sessionId: string): Promise<ExerciseSession | undefined> => {
    const database = db.value || (await initDB())

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([SESSIONS_STORE], 'readonly')
      const store = transaction.objectStore(SESSIONS_STORE)
      const request = store.get(sessionId)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  /**
   * Obtiene todas las sesiones
   */
  const getSessions = async (): Promise<ExerciseSession[]> => {
    const database = db.value || (await initDB())

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([SESSIONS_STORE], 'readonly')
      const store = transaction.objectStore(SESSIONS_STORE)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result || [])
    })
  }

  /**
   * Elimina un ejercicio
   */
  const deleteExercise = async (id: string): Promise<void> => {
    const database = db.value || (await initDB())

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([EXERCISES_STORE], 'readwrite')
      const store = transaction.objectStore(EXERCISES_STORE)
      const request = store.delete(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  /**
   * Limpia todos los ejercicios
   */
  const clearExercises = async (): Promise<void> => {
    const database = db.value || (await initDB())

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([EXERCISES_STORE], 'readwrite')
      const store = transaction.objectStore(EXERCISES_STORE)
      const request = store.clear()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  // Inicializa la DB cuando se monta el componente
  onMounted(() => {
    if (!isReady.value) {
      initDB()
    }
  })

  return {
    db,
    isReady,
    initDB,
    saveExercise,
    saveExercises,
    getExercise,
    getExercises,
    saveSession,
    getSession,
    getSessions,
    deleteExercise,
    clearExercises,
  }
}
