export type OperationType = 'suma' | 'resta' | 'multiplicacion' | 'division'
export type DifficultyLevel = 'facil' | 'medio' | 'dificil'

export interface Exercise {
  id: string
  operationType: OperationType
  difficulty: DifficultyLevel
  question: string
  answer: number
  options?: number[]
  timestamp: number
  solved: boolean
  userAnswer?: number
  correct?: boolean
}

export interface ExerciseSession {
  sessionId: string
  seed: number
  exercises: Exercise[]
  createdAt: number
  completedAt?: number
  totalSolved: number
}

export interface ExerciseStats {
  totalExercises: number
  solvedCorrect: number
  solvedIncorrect: number
  accuracy: number
  totalTime: number
}
