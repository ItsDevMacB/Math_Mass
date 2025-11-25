// Tipos para el sistema de temas de matemáticas

export type TopicCategory = 'fracciones' | 'operaciones-fracciones' | 'otros'

export interface Topic {
  id: string
  category: TopicCategory
  name: string
  description: string
  totalExercises: number
  subtopics: Subtopic[]
  difficulty: 'facil' | 'medio' | 'dificil'
  icon?: string
  color?: string
}

export interface Subtopic {
  id: string
  name: string
  description: string
  exerciseCount: number
}

// Definición de los temas según la imagen
export const TOPICS: Topic[] = [
  {
    id: 'topic-1',
    category: 'fracciones',
    name: 'Fracciones',
    description: 'Conceptos básicos y operaciones con fracciones',
    totalExercises: 78,
    difficulty: 'medio',
    color: 'blue',
    subtopics: [
      {
        id: 'frac-1',
        name: 'Fracciones y números mixtos',
        description: 'Conversión entre fracciones impropias y números mixtos',
        exerciseCount: 20,
      },
      {
        id: 'frac-2',
        name: 'Fracciones equivalentes',
        description: 'Identificar y crear fracciones equivalentes',
        exerciseCount: 18,
      },
      {
        id: 'frac-3',
        name: 'Obtención de fracciones con común denominador',
        description: 'Encontrar el mínimo común múltiplo',
        exerciseCount: 20,
      },
      {
        id: 'frac-4',
        name: 'Reducir una fracción a su mínimo común denominador',
        description: 'Simplificar fracciones',
        exerciseCount: 20,
      },
    ],
  },
  {
    id: 'topic-2',
    category: 'operaciones-fracciones',
    name: 'Operaciones con fracciones',
    description: 'Suma, resta, multiplicación y división de fracciones',
    totalExercises: 92,
    difficulty: 'medio',
    color: 'green',
    subtopics: [
      {
        id: 'op-frac-1',
        name: 'Suma de fracciones',
        description: 'Sumar fracciones con igual y diferente denominador',
        exerciseCount: 23,
      },
      {
        id: 'op-frac-2',
        name: 'Resta de fracciones',
        description: 'Restar fracciones con igual y diferente denominador',
        exerciseCount: 23,
      },
      {
        id: 'op-frac-3',
        name: 'Multiplicación de fracciones',
        description: 'Multiplicar fracciones y simplificar',
        exerciseCount: 23,
      },
      {
        id: 'op-frac-4',
        name: 'División de fracciones',
        description: 'Dividir fracciones usando el recíproco',
        exerciseCount: 23,
      },
    ],
  },
]
