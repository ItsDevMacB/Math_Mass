import seedrandom from 'seedrandom'
import type { Exercise, OperationType, DifficultyLevel } from '@/types'

export class ExerciseGenerator {
  private rng: seedrandom.PRNG
  private seed: number

  constructor(seed?: number) {
    this.seed = seed || Date.now()
    this.rng = seedrandom(this.seed.toString())
  }

  /**
   * Genera un array de ejercicios
   * @param count - Cantidad de ejercicios a generar
   * @param difficulty - Nivel de dificultad
   * @returns Array de ejercicios generados
   */
  generateExercises(count: number, difficulty: DifficultyLevel): Exercise[] {
    const exercises: Exercise[] = []

    for (let i = 0; i < count; i++) {
      const operationType = this.getRandomOperation()
      const exercise = this.createExercise(operationType, difficulty, i)
      exercises.push(exercise)
    }

    return exercises
  }

  /**
   * Obtiene la semilla actual
   */
  getSeed(): number {
    return this.seed
  }

  /**
   * Selecciona aleatoriamente un tipo de operación
   */
  private getRandomOperation(): OperationType {
    const ops: OperationType[] = ['suma', 'resta', 'multiplicacion', 'division']
    const index = Math.floor(this.rng() * ops.length)
    return ops[index] as OperationType
  }

  /**
   * Crea un ejercicio individual
   */
  private createExercise(
    operation: OperationType,
    difficulty: DifficultyLevel,
    index: number,
  ): Exercise {
    const { num1, num2, answer } = this.generateNumbers(operation, difficulty)

    const question = this.formatQuestion(operation, num1, num2)

    return {
      id: `ex_${this.seed}_${index}`,
      operationType: operation,
      difficulty,
      question,
      answer,
      timestamp: Date.now(),
      solved: false,
    }
  }

  /**
   * Genera números según la operación y dificultad
   */
  private generateNumbers(
    operation: OperationType,
    difficulty: DifficultyLevel,
  ): { num1: number; num2: number; answer: number } {
    const ranges = {
      facil: 20,
      medio: 100,
      dificil: 1000,
    }

    const max = ranges[difficulty]
    const num1 = Math.floor(this.rng() * max) + 1
    const num2 = Math.floor(this.rng() * max) + 1

    let answer = 0

    switch (operation) {
      case 'suma':
        answer = num1 + num2
        break
      case 'resta':
        answer = Math.max(num1, num2) - Math.min(num1, num2)
        break
      case 'multiplicacion':
        answer = num1 * num2
        break
      case 'division':
        // Asegurar que la división sea exacta
        answer = Math.floor(num1 / num2)
        break
    }

    return { num1, num2, answer }
  }

  /**
   * Formatea la pregunta del ejercicio
   */
  private formatQuestion(operation: OperationType, num1: number, num2: number): string {
    const symbols = {
      suma: '+',
      resta: '-',
      multiplicacion: '×',
      division: '÷',
    }

    const symbol = symbols[operation]
    return `${num1} ${symbol} ${num2} = ?`
  }
}
