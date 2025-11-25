/**
 * Servicio de conversión de fracciones
 * Basado en Convertidor.js del proyecto AWP
 */

import {
  calcularMCM,
  simplificarFraccion,
  impropiaAMixto,
  mixtoAImpropia,
  identificarTipoFraccion,
  sonEquivalentes,
  compararFracciones,
  generarEquivalentes,
  fraccionADecimal,
  formatearFraccion,
  formatearNumeroMixto,
  validarFraccion,
} from '@/utils/mathUtils'

export interface FractionResult {
  numerador: number
  denominador: number
  texto: string
}

export interface MixedNumberResult {
  entero: number
  numerador: number
  denominador: number
  texto: string
  esMixto: boolean
}

export interface SimplificationResult {
  numerador: number
  denominador: number
  factorSimplificacion: number
  texto: string
  yaSimplificada: boolean
}

export interface DecimalResult {
  valor: number
  texto: string
  esFinito: boolean
  periodico?: string
}

export class FractionConverter {
  /**
   * Convierte fracción impropia a número mixto
   */
  static toMixedNumber(numerador: number, denominador: number): MixedNumberResult {
    const validation = validarFraccion(numerador, denominador)
    if (!validation.valida) {
      throw new Error(validation.error)
    }

    const resultado = impropiaAMixto(numerador, denominador)

    return {
      ...resultado,
      texto: formatearNumeroMixto(resultado.entero, resultado.numerador, resultado.denominador),
    }
  }

  /**
   * Convierte número mixto a fracción impropia
   */
  static toImproperFraction(
    entero: number,
    numerador: number,
    denominador: number,
  ): FractionResult {
    const validation = validarFraccion(numerador, denominador)
    if (!validation.valida) {
      throw new Error(validation.error)
    }

    const resultado = mixtoAImpropia(entero, numerador, denominador)

    return {
      ...resultado,
      texto: formatearFraccion(resultado.numerador, resultado.denominador),
    }
  }

  /**
   * Simplifica una fracción
   */
  static simplify(numerador: number, denominador: number): SimplificationResult {
    const validation = validarFraccion(numerador, denominador)
    if (!validation.valida) {
      throw new Error(validation.error)
    }

    const resultado = simplificarFraccion(numerador, denominador)
    const yaSimplificada = resultado.factorSimplificacion === 1

    return {
      ...resultado,
      texto: formatearFraccion(resultado.numerador, resultado.denominador),
      yaSimplificada,
    }
  }

  /**
   * Convierte fracción a decimal
   */
  static toDecimal(numerador: number, denominador: number, decimales: number = 4): DecimalResult {
    const validation = validarFraccion(numerador, denominador)
    if (!validation.valida) {
      throw new Error(validation.error)
    }

    const valor = numerador / denominador
    const texto = fraccionADecimal(numerador, denominador, decimales)
    const esFinito = this.isFiniteDecimal(numerador, denominador)

    return {
      valor,
      texto,
      esFinito,
      periodico: esFinito ? undefined : this.encontrarPeriodo(numerador, denominador),
    }
  }

  /**
   * Verifica si un decimal es finito
   */
  private static isFiniteDecimal(numerador: number, denominador: number): boolean {
    const { denominador: denSimplificado } = simplificarFraccion(numerador, denominador)
    let den = denSimplificado

    // Eliminar factores de 2 y 5
    while (den % 2 === 0) den /= 2
    while (den % 5 === 0) den /= 5

    // Si queda 1, el decimal es finito
    return den === 1
  }

  /**
   * Encuentra el período de un decimal periódico
   */
  private static encontrarPeriodo(numerador: number, denominador: number): string {
    const restos = new Map<number, number>()
    let resto = numerador % denominador
    let posicion = 0
    const decimales: number[] = []

    while (resto !== 0 && !restos.has(resto)) {
      restos.set(resto, posicion)
      resto *= 10
      decimales.push(Math.floor(resto / denominador))
      resto %= denominador
      posicion++

      if (posicion > 20) break // Límite de seguridad
    }

    if (resto === 0) {
      return '' // No es periódico
    }

    const inicioPeriodo = restos.get(resto) || 0
    const periodo = decimales.slice(inicioPeriodo).join('')

    return periodo
  }

  /**
   * Compara dos fracciones
   */
  static compare(num1: number, den1: number, num2: number, den2: number): number {
    return compararFracciones(num1, den1, num2, den2)
  }

  /**
   * Verifica si dos fracciones son equivalentes
   */
  static areEquivalent(num1: number, den1: number, num2: number, den2: number): boolean {
    return sonEquivalentes(num1, den1, num2, den2)
  }

  /**
   * Genera fracciones equivalentes
   */
  static generateEquivalents(numerador: number, denominador: number, cantidad: number = 3) {
    const validation = validarFraccion(numerador, denominador)
    if (!validation.valida) {
      throw new Error(validation.error)
    }

    return generarEquivalentes(numerador, denominador, cantidad).map((eq) => ({
      ...eq,
      texto: formatearFraccion(eq.numerador, eq.denominador),
    }))
  }

  /**
   * Identifica el tipo de fracción
   */
  static identifyType(numerador: number, denominador: number) {
    const validation = validarFraccion(numerador, denominador)
    if (!validation.valida) {
      throw new Error(validation.error)
    }

    const tipo = identificarTipoFraccion(numerador, denominador)

    const descripciones = {
      propia: 'Fracción propia (menor que 1)',
      impropia: 'Fracción impropia (mayor que 1)',
      unitaria: 'Fracción unitaria (igual a 1)',
      aparente: 'Fracción aparente (equivalente a un entero)',
    }

    return {
      tipo,
      descripcion: descripciones[tipo],
      valor: numerador / denominador,
    }
  }

  /**
   * Encuentra el común denominador de dos fracciones
   */
  static findCommonDenominator(den1: number, den2: number) {
    const mcm = calcularMCM(den1, den2)

    return {
      denominadorComun: mcm,
      factor1: mcm / den1,
      factor2: mcm / den2,
    }
  }

  /**
   * Convierte múltiples fracciones a común denominador
   */
  static toCommonDenominator(fractions: Array<{ numerador: number; denominador: number }>) {
    if (fractions.length === 0) {
      return []
    }

    // Calcular MCM de todos los denominadores
    let mcm = fractions[0]!.denominador
    for (let i = 1; i < fractions.length; i++) {
      mcm = calcularMCM(mcm, fractions[i]!.denominador)
    }

    // Convertir todas las fracciones
    return fractions.map(({ numerador, denominador }) => {
      const factor = mcm / denominador
      return {
        numerador: numerador * factor,
        denominador: mcm,
        factorMultiplicacion: factor,
        texto: formatearFraccion(numerador * factor, mcm),
      }
    })
  }

  /**
   * Suma dos fracciones
   */
  static add(num1: number, den1: number, num2: number, den2: number): FractionResult {
    const mcm = calcularMCM(den1, den2)
    const nuevoNum1 = num1 * (mcm / den1)
    const nuevoNum2 = num2 * (mcm / den2)
    const resultadoNum = nuevoNum1 + nuevoNum2

    const simplificado = simplificarFraccion(resultadoNum, mcm)

    return {
      numerador: simplificado.numerador,
      denominador: simplificado.denominador,
      texto: formatearFraccion(simplificado.numerador, simplificado.denominador),
    }
  }

  /**
   * Resta dos fracciones
   */
  static subtract(num1: number, den1: number, num2: number, den2: number): FractionResult {
    const mcm = calcularMCM(den1, den2)
    const nuevoNum1 = num1 * (mcm / den1)
    const nuevoNum2 = num2 * (mcm / den2)
    const resultadoNum = nuevoNum1 - nuevoNum2

    const simplificado = simplificarFraccion(Math.abs(resultadoNum), mcm)

    return {
      numerador: resultadoNum < 0 ? -simplificado.numerador : simplificado.numerador,
      denominador: simplificado.denominador,
      texto: formatearFraccion(
        resultadoNum < 0 ? -simplificado.numerador : simplificado.numerador,
        simplificado.denominador,
      ),
    }
  }

  /**
   * Multiplica dos fracciones
   */
  static multiply(num1: number, den1: number, num2: number, den2: number): FractionResult {
    const resultadoNum = num1 * num2
    const resultadoDen = den1 * den2

    const simplificado = simplificarFraccion(resultadoNum, resultadoDen)

    return {
      numerador: simplificado.numerador,
      denominador: simplificado.denominador,
      texto: formatearFraccion(simplificado.numerador, simplificado.denominador),
    }
  }

  /**
   * Divide dos fracciones
   */
  static divide(num1: number, den1: number, num2: number, den2: number): FractionResult {
    if (num2 === 0) {
      throw new Error('No se puede dividir por cero')
    }

    // Dividir es multiplicar por el recíproco
    return this.multiply(num1, den1, den2, num2)
  }
}
