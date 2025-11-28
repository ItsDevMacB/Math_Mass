/**
 * Tipos para el sistema de lecciones
 * Basado en la estructura del proyecto AWP
 */

export type LessonStatus = 'nuevo' | 'en-progreso' | 'completado' | 'bloqueado'

export interface Lesson {
  id: string
  numero: number
  titulo: string
  descripcion: string
  icono: string // Nombre del ícono de Lucide
  url: string
  tiempoEstimado: number // En minutos
  ejerciciosTotal: number
  temas: string[] // Subtemas de la lección
  requisitos?: string[] // IDs de lecciones requeridas
  orden: number
}

export interface LessonProgress {
  leccionId: string
  estado: LessonStatus
  ejerciciosCompletados: number
  ejerciciosCorrectos: number
  tiempoTotal: number // En segundos
  ultimoAcceso: Date
  intentos: number
  precision: number // Porcentaje 0-100
  mejorPrecision: number // Mejor puntaje obtenido (0-100)
}

export interface UserStats {
  leccionesCompletadas: number
  ejerciciosResueltos: number
  tiempoTotal: number // En minutos
  precisionPromedio: number // Porcentaje 0-100
  racha: number // Días consecutivos
  ultimaActividad: Date
}

export const LESSONS: Lesson[] = [
  {
    id: 'introduccion-fracciones',
    numero: 1,
    titulo: 'Introducción a las Fracciones',
    descripcion:
      '¿Qué es una fracción? Aprende los conceptos básicos: numerador, denominador, tipos de fracciones (propias, impropias, unitarias) y representación gráfica.',
    icono: 'PieChart',
    url: '/demo/definitions',
    tiempoEstimado: 25,
    ejerciciosTotal: 10,
    temas: [
      'Definición de fracción',
      'Numerador y denominador',
      'Tipos de fracciones',
      'Representación gráfica',
    ],
    orden: 1,
  },
  {
    id: 'numeros-mixtos',
    numero: 2,
    titulo: 'Conversión de Números Mixtos',
    descripcion:
      'Aprende a convertir fracciones impropias a números mixtos y viceversa. Entiende cuándo usar cada formato.',
    icono: 'Repeat',
    url: '/demo/fractions',
    tiempoEstimado: 30,
    ejerciciosTotal: 10,
    temas: [
      'Fracción impropia a mixto',
      'Número mixto a fracción impropia',
      'Identificación de fracciones impropias',
      'Visualización dinámica',
    ],
    requisitos: ['introduccion-fracciones'],
    orden: 2,
  },
  {
    id: 'fracciones-equivalentes',
    numero: 3,
    titulo: 'Fracciones Equivalentes',
    descripcion:
      'Descubre fracciones que representan la misma cantidad. Aprende a identificarlas y generarlas.',
    icono: 'Target',
    url: '/demo/definitions',
    tiempoEstimado: 25,
    ejerciciosTotal: 10,
    temas: ['Identificación', 'Amplificación', 'Reducción', 'Verificación'],
    requisitos: ['introduccion-fracciones'],
    orden: 3,
  },
  {
    id: 'simplificacion-fracciones',
    numero: 4,
    titulo: 'Simplificación de Fracciones',
    descripcion: 'Reduce fracciones a su mínima expresión usando el máximo común divisor (MCD).',
    icono: 'Zap',
    url: '/demo/fractions',
    tiempoEstimado: 30,
    ejerciciosTotal: 10,
    temas: ['Máximo Común Divisor', 'Simplificación paso a paso', 'Fracciones irreducibles'],
    requisitos: ['fracciones-equivalentes'],
    orden: 4,
  },
  {
    id: 'comparacion-fracciones',
    numero: 5,
    titulo: 'Comparación de Fracciones',
    descripcion:
      'Compara fracciones con el mismo denominador o denominadores diferentes. Usa símbolos >, < e =.',
    icono: 'Scale',
    url: '/demo/definitions',
    tiempoEstimado: 28,
    ejerciciosTotal: 10,
    temas: ['Mismo denominador', 'Denominadores diferentes', 'Común denominador', 'Ordenamiento'],
    requisitos: ['simplificacion-fracciones'],
    orden: 5,
  },
  {
    id: 'suma-fracciones',
    numero: 6,
    titulo: 'Suma de Fracciones',
    descripcion:
      'Suma fracciones con denominadores iguales y diferentes, incluyendo números mixtos.',
    icono: 'Plus',
    url: '/generate',
    tiempoEstimado: 40,
    ejerciciosTotal: 10,
    temas: ['Mismo denominador', 'Diferente denominador', 'Números mixtos', 'Simplificación'],
    requisitos: ['comparacion-fracciones'],
    orden: 6,
  },
  {
    id: 'resta-fracciones',
    numero: 7,
    titulo: 'Resta de Fracciones',
    descripcion: 'Resta fracciones aplicando las mismas técnicas que en la suma.',
    icono: 'Minus',
    url: '/generate',
    tiempoEstimado: 40,
    ejerciciosTotal: 10,
    temas: ['Mismo denominador', 'Diferente denominador', 'Números mixtos', 'Simplificación'],
    requisitos: ['suma-fracciones'],
    orden: 7,
  },
  {
    id: 'multiplicacion-fracciones',
    numero: 8,
    titulo: 'Multiplicación de Fracciones',
    descripcion: 'Multiplica numeradores con numeradores y denominadores con denominadores.',
    icono: 'X',
    url: '/generate',
    tiempoEstimado: 35,
    ejerciciosTotal: 10,
    temas: ['Multiplicación directa', 'Simplificación cruzada', 'Números mixtos'],
    requisitos: ['resta-fracciones'],
    orden: 8,
  },
  {
    id: 'division-fracciones',
    numero: 9,
    titulo: 'División de Fracciones',
    descripcion: 'Divide fracciones multiplicando por el recíproco del divisor.',
    icono: 'Divide',
    url: '/generate',
    tiempoEstimado: 35,
    ejerciciosTotal: 10,
    temas: ['Recíproco', 'División', 'Números mixtos', 'Simplificación'],
    requisitos: ['multiplicacion-fracciones'],
    orden: 9,
  },
]
