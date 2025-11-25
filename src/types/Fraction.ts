// Tipos para operaciones con fracciones

export interface Fraction {
  numerator: number
  denominator: number
}

export interface MixedNumber {
  whole: number
  fraction: Fraction
}

export type FractionOperation = 'suma' | 'resta' | 'multiplicacion' | 'division'

export interface FractionExercise {
  id: string
  type: 'fraction' | 'mixed-number' | 'operation'
  operation?: FractionOperation
  fractions: Fraction[]
  answer: Fraction | MixedNumber
  difficulty: 'facil' | 'medio' | 'dificil'
  subtopicId: string
  solved: boolean
  userAnswer?: Fraction | MixedNumber
  correct?: boolean
  timestamp: number
}

export interface FractionSession {
  sessionId: string
  topicId: string
  subtopicId: string
  exercises: FractionExercise[]
  createdAt: number
  completedAt?: number
  totalSolved: number
  accuracy: number
}

// Utilidades para fracciones
export class FractionUtils {
  // Máximo común divisor
  static gcd(a: number, b: number): number {
    return b === 0 ? Math.abs(a) : this.gcd(b, a % b)
  }

  // Mínimo común múltiplo
  static lcm(a: number, b: number): number {
    return Math.abs(a * b) / this.gcd(a, b)
  }

  // Simplificar fracción
  static simplify(fraction: Fraction): Fraction {
    const divisor = this.gcd(fraction.numerator, fraction.denominator)
    return {
      numerator: fraction.numerator / divisor,
      denominator: fraction.denominator / divisor,
    }
  }

  // Convertir fracción impropia a número mixto
  static toMixedNumber(fraction: Fraction): MixedNumber {
    const whole = Math.floor(fraction.numerator / fraction.denominator)
    const remainder = fraction.numerator % fraction.denominator
    return {
      whole,
      fraction: {
        numerator: remainder,
        denominator: fraction.denominator,
      },
    }
  }

  // Convertir número mixto a fracción impropia
  static toImproperFraction(mixed: MixedNumber): Fraction {
    return {
      numerator: mixed.whole * mixed.fraction.denominator + mixed.fraction.numerator,
      denominator: mixed.fraction.denominator,
    }
  }

  // Sumar fracciones
  static add(f1: Fraction, f2: Fraction): Fraction {
    const denominator = this.lcm(f1.denominator, f2.denominator)
    const numerator =
      (f1.numerator * denominator) / f1.denominator + (f2.numerator * denominator) / f2.denominator
    return this.simplify({ numerator, denominator })
  }

  // Restar fracciones
  static subtract(f1: Fraction, f2: Fraction): Fraction {
    const denominator = this.lcm(f1.denominator, f2.denominator)
    const numerator =
      (f1.numerator * denominator) / f1.denominator - (f2.numerator * denominator) / f2.denominator
    return this.simplify({ numerator, denominator })
  }

  // Multiplicar fracciones
  static multiply(f1: Fraction, f2: Fraction): Fraction {
    return this.simplify({
      numerator: f1.numerator * f2.numerator,
      denominator: f1.denominator * f2.denominator,
    })
  }

  // Dividir fracciones
  static divide(f1: Fraction, f2: Fraction): Fraction {
    return this.multiply(f1, {
      numerator: f2.denominator,
      denominator: f2.numerator,
    })
  }

  // Comparar si dos fracciones son equivalentes
  static areEquivalent(f1: Fraction, f2: Fraction): boolean {
    const simplified1 = this.simplify(f1)
    const simplified2 = this.simplify(f2)
    return (
      simplified1.numerator === simplified2.numerator &&
      simplified1.denominator === simplified2.denominator
    )
  }
}
