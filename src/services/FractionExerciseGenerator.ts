/**
 * Generador de ejercicios de fracciones
 * Basado en generadores.js y EvaluacionFracciones.js del proyecto AWP
 */

import { random, mezclarArray, formatearFraccion, formatearNumeroMixto } from '@/utils/mathUtils'
import { FractionConverter } from './FractionConverter'

export type ExerciseType =
  | 'impropia-a-mixto'
  | 'mixto-a-impropia'
  | 'simplificar'
  | 'identificar-tipo'
  | 'comparar'
  | 'equivalentes'
  | 'suma'
  | 'resta'
  | 'multiplicacion'
  | 'division'

export type DifficultyLevel = 'facil' | 'medio' | 'dificil'

export interface ExerciseQuestion {
  id: string
  tipo: ExerciseType
  pregunta: string
  opciones: string[]
  correcta: string
  explicacion: string
  nivel: DifficultyLevel
  numerador?: number
  denominador?: number
  entero?: number
}

export interface ExerciseConfig {
  cantidad: number
  nivel: DifficultyLevel
  tipos?: ExerciseType[]
  mezclarPreguntas?: boolean
  mezclarOpciones?: boolean
}

const DIFFICULTY_RANGES = {
  facil: { min: 1, max: 10 },
  medio: { min: 1, max: 20 },
  dificil: { min: 1, max: 50 },
}

export class FractionExerciseGenerator {
  /**
   * Genera una fracción aleatoria según el nivel y tipo
   */
  private static generateRandomFraction(
    nivel: DifficultyLevel,
    tipo: 'propia' | 'impropia' | 'cualquiera' = 'cualquiera',
  ) {
    const rango = DIFFICULTY_RANGES[nivel]
    let numerador: number, denominador: number

    do {
      numerador = random(rango.min, rango.max)
      denominador = random(rango.min < 2 ? 2 : rango.min, rango.max)
    } while (denominador === 0)

    // Ajustar según tipo
    if (tipo === 'propia' && numerador >= denominador) {
      numerador = random(1, denominador - 1)
    } else if (tipo === 'impropia' && numerador < denominador) {
      numerador = denominador + random(1, 10)
    }

    return { numerador, denominador }
  }

  /**
   * Genera pregunta: Impropia a Mixto
   */
  private static generateImpropiaAMixto(nivel: DifficultyLevel): ExerciseQuestion {
    const { numerador, denominador } = this.generateRandomFraction(nivel, 'impropia')
    const resultado = FractionConverter.toMixedNumber(numerador, denominador)
    const respuestaCorrecta = resultado.texto

    // Generar distractores
    const opciones = [
      respuestaCorrecta,
      formatearNumeroMixto(resultado.entero + 1, resultado.numerador, resultado.denominador),
      formatearNumeroMixto(resultado.entero, resultado.numerador + 1, resultado.denominador),
      formatearNumeroMixto(
        resultado.entero > 0 ? resultado.entero - 1 : 1,
        resultado.numerador,
        resultado.denominador,
      ),
    ]

    return {
      id: `impropia-mixto-${Date.now()}-${random(1000, 9999)}`,
      tipo: 'impropia-a-mixto',
      pregunta: `Convierte la fracción impropia ${formatearFraccion(numerador, denominador)} a número mixto:`,
      opciones: mezclarArray(opciones),
      correcta: respuestaCorrecta,
      explicacion: `${numerador} ÷ ${denominador} = ${resultado.entero} con residuo ${resultado.numerador}, entonces ${formatearFraccion(numerador, denominador)} = ${respuestaCorrecta}`,
      nivel,
      numerador,
      denominador,
    }
  }

  /**
   * Genera pregunta: Mixto a Impropia
   */
  private static generateMixtoAImpropia(nivel: DifficultyLevel): ExerciseQuestion {
    const entero = random(1, 5)
    const numerador = random(1, 6)
    const denominador = random(2, 8)

    const resultado = FractionConverter.toImproperFraction(entero, numerador, denominador)
    const respuestaCorrecta = resultado.texto

    // Generar distractores
    const opciones = [
      respuestaCorrecta,
      formatearFraccion(resultado.numerador + denominador, resultado.denominador),
      formatearFraccion(resultado.numerador - denominador, resultado.denominador),
      formatearFraccion(resultado.numerador + 1, resultado.denominador),
    ]

    return {
      id: `mixto-impropia-${Date.now()}-${random(1000, 9999)}`,
      tipo: 'mixto-a-impropia',
      pregunta: `Convierte el número mixto ${formatearNumeroMixto(entero, numerador, denominador)} a fracción impropia:`,
      opciones: mezclarArray(opciones),
      correcta: respuestaCorrecta,
      explicacion: `(${entero} × ${denominador}) + ${numerador} = ${resultado.numerador}, entonces ${formatearNumeroMixto(entero, numerador, denominador)} = ${respuestaCorrecta}`,
      nivel,
      entero,
      numerador,
      denominador,
    }
  }

  /**
   * Genera pregunta: Simplificar fracción
   */
  private static generateSimplificar(nivel: DifficultyLevel): ExerciseQuestion {
    const { numerador: numBase, denominador: denBase } = this.generateRandomFraction(
      nivel,
      'cualquiera',
    )
    const factor = random(2, 5)

    const numerador = numBase * factor
    const denominador = denBase * factor

    const resultado = FractionConverter.simplify(numerador, denominador)
    const respuestaCorrecta = resultado.texto

    // Generar distractores
    const opciones = [
      respuestaCorrecta,
      formatearFraccion(resultado.numerador + 1, resultado.denominador),
      formatearFraccion(resultado.numerador, resultado.denominador + 1),
      formatearFraccion(Math.floor(resultado.numerador / 2), Math.floor(resultado.denominador / 2)),
    ]

    return {
      id: `simplificar-${Date.now()}-${random(1000, 9999)}`,
      tipo: 'simplificar',
      pregunta: `Simplifica la fracción ${formatearFraccion(numerador, denominador)} a su mínima expresión:`,
      opciones: mezclarArray(opciones),
      correcta: respuestaCorrecta,
      explicacion: `El MCD de ${numerador} y ${denominador} es ${resultado.factorSimplificacion}. Dividiendo ambos: ${numerador}÷${resultado.factorSimplificacion} = ${resultado.numerador} y ${denominador}÷${resultado.factorSimplificacion} = ${resultado.denominador}`,
      nivel,
      numerador,
      denominador,
    }
  }

  /**
   * Genera pregunta: Identificar tipo
   */
  private static generateIdentificarTipo(nivel: DifficultyLevel): ExerciseQuestion {
    // Generar todos los tipos de fracciones de forma aleatoria
    const tipoReal = ['propia', 'impropia', 'unitaria', 'aparente'][random(0, 3)] as
      | 'propia'
      | 'impropia'
      | 'unitaria'
      | 'aparente'

    let numerador: number, denominador: number

    if (tipoReal === 'propia') {
      // Fracción propia: numerador < denominador
      denominador = random(3, 12)
      numerador = random(1, denominador - 1)
    } else if (tipoReal === 'impropia') {
      // Fracción impropia: numerador > denominador (pero no aparente)
      denominador = random(2, 8)
      let num = random(denominador + 1, denominador * 3)
      while (num % denominador === 0) {
        num = random(denominador + 1, denominador * 3)
      }
      numerador = num
    } else if (tipoReal === 'unitaria') {
      // Fracción unitaria: numerador = denominador
      numerador = random(2, 10)
      denominador = numerador
    } else {
      // Fracción aparente: numerador es múltiplo del denominador
      denominador = random(2, 8)
      const multiplo = random(2, 5)
      numerador = denominador * multiplo
    }

    const resultado = FractionConverter.identifyType(numerador, denominador)
    const respuestaCorrecta =
      resultado.tipo === 'propia'
        ? 'Propia'
        : resultado.tipo === 'impropia'
          ? 'Impropia'
          : resultado.tipo === 'unitaria'
            ? 'Unitaria'
            : 'Aparente'

    const opciones = ['Propia', 'Impropia', 'Unitaria', 'Aparente']

    return {
      id: `identificar-${Date.now()}-${random(1000, 9999)}`,
      tipo: 'identificar-tipo',
      pregunta: `¿Qué tipo de fracción es ${formatearFraccion(numerador, denominador)}?`,
      opciones: mezclarArray(opciones),
      correcta: respuestaCorrecta,
      explicacion: `Es ${respuestaCorrecta.toLowerCase()} porque ${resultado.descripcion.toLowerCase()}`,
      nivel,
      numerador,
      denominador,
    }
  }

  /**
   * Genera pregunta: Comparar fracciones
   */
  private static generateComparar(nivel: DifficultyLevel): ExerciseQuestion {
    const frac1 = this.generateRandomFraction(nivel, 'cualquiera')
    const frac2 = this.generateRandomFraction(nivel, 'cualquiera')

    const comparacion = FractionConverter.compare(
      frac1.numerador,
      frac1.denominador,
      frac2.numerador,
      frac2.denominador,
    )

    const respuestaCorrecta = comparacion > 0 ? '>' : comparacion < 0 ? '<' : '='
    const opciones = ['>', '<', '=', 'No se pueden comparar']

    return {
      id: `comparar-${Date.now()}-${random(1000, 9999)}`,
      tipo: 'comparar',
      pregunta: `¿Cuál es la relación entre ${formatearFraccion(frac1.numerador, frac1.denominador)} y ${formatearFraccion(frac2.numerador, frac2.denominador)}?`,
      opciones,
      correcta: respuestaCorrecta,
      explicacion: `${formatearFraccion(frac1.numerador, frac1.denominador)} ${respuestaCorrecta} ${formatearFraccion(frac2.numerador, frac2.denominador)} porque ${(frac1.numerador / frac1.denominador).toFixed(3)} ${respuestaCorrecta} ${(frac2.numerador / frac2.denominador).toFixed(3)}`,
      nivel,
    }
  }

  /**
   * Genera pregunta: Fracciones equivalentes
   */
  private static generateEquivalentes(nivel: DifficultyLevel): ExerciseQuestion {
    const { numerador, denominador } = this.generateRandomFraction(nivel, 'cualquiera')
    const equivalentes = FractionConverter.generateEquivalents(numerador, denominador, 3)
    const correcta = equivalentes[random(0, equivalentes.length - 1)]!

    const respuestaCorrecta = correcta.texto

    // Generar distractores (fracciones NO equivalentes)
    const opciones = [
      respuestaCorrecta,
      formatearFraccion(numerador + 1, denominador),
      formatearFraccion(numerador, denominador + 1),
      formatearFraccion(numerador + 1, denominador + 1),
    ]

    return {
      id: `equivalentes-${Date.now()}-${random(1000, 9999)}`,
      tipo: 'equivalentes',
      pregunta: `¿Cuál fracción es equivalente a ${formatearFraccion(numerador, denominador)}?`,
      opciones: mezclarArray(opciones),
      correcta: respuestaCorrecta,
      explicacion: `${respuestaCorrecta} es equivalente porque se obtiene multiplicando numerador y denominador por ${correcta.factor}`,
      nivel,
      numerador,
      denominador,
    }
  }

  /**
   * Genera una batería completa de ejercicios
   */
  static generateExerciseBatch(config: ExerciseConfig): ExerciseQuestion[] {
    const {
      cantidad,
      nivel,
      tipos = ['impropia-a-mixto', 'mixto-a-impropia', 'simplificar', 'identificar-tipo'],
      mezclarPreguntas = true,
    } = config

    const ejercicios: ExerciseQuestion[] = []
    const tiposDisponibles = [...tipos]

    for (let i = 0; i < cantidad; i++) {
      const tipoIndex = i % tiposDisponibles.length
      const tipo = tiposDisponibles[tipoIndex]!

      let ejercicio: ExerciseQuestion

      switch (tipo) {
        case 'impropia-a-mixto':
          ejercicio = this.generateImpropiaAMixto(nivel)
          break
        case 'mixto-a-impropia':
          ejercicio = this.generateMixtoAImpropia(nivel)
          break
        case 'simplificar':
          ejercicio = this.generateSimplificar(nivel)
          break
        case 'identificar-tipo':
          ejercicio = this.generateIdentificarTipo(nivel)
          break
        case 'comparar':
          ejercicio = this.generateComparar(nivel)
          break
        case 'equivalentes':
          ejercicio = this.generateEquivalentes(nivel)
          break
        default:
          ejercicio = this.generateImpropiaAMixto(nivel)
      }

      ejercicios.push(ejercicio)
    }

    return mezclarPreguntas ? mezclarArray(ejercicios) : ejercicios
  }

  /**
   * Genera ejercicios específicos para una lección según su ID
   */
  static generateForLesson(
    lessonId: string,
    cantidad: number = 10,
    nivel: DifficultyLevel = 'medio',
  ): ExerciseQuestion[] {
    const lessonExerciseTypes: Record<string, ExerciseType[]> = {
      'introduccion-fracciones': ['identificar-tipo'],
      'numeros-mixtos': ['impropia-a-mixto', 'mixto-a-impropia'],
      'fracciones-equivalentes': ['equivalentes'],
      'simplificacion-fracciones': ['simplificar'],
      'comparacion-fracciones': ['comparar'],
      'suma-fracciones': ['suma'],
      'resta-fracciones': ['resta'],
      'multiplicacion-fracciones': ['multiplicacion'],
      'division-fracciones': ['division'],
    }

    const tipos = lessonExerciseTypes[lessonId] || ['identificar-tipo']

    return this.generateExerciseBatch({
      cantidad,
      nivel,
      tipos,
      mezclarPreguntas: true,
      mezclarOpciones: true,
    })
  }
}
