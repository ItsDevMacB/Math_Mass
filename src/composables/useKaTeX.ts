/**
 * Composable para renderizar expresiones matemáticas con KaTeX
 */

import katex from 'katex'
import 'katex/dist/katex.min.css'

export interface KatexOptions {
  displayMode?: boolean // Block display (true) o inline (false)
  throwOnError?: boolean // Lanzar errores o mostrar texto rojo
  errorColor?: string // Color para errores
  macros?: Record<string, string> // Macros personalizados
  strict?: boolean // Modo estricto
  trust?: boolean // Permitir comandos confiables
  output?: 'html' | 'mathml' // Formato de salida
}

export function useKaTeX() {
  /**
   * Renderiza una expresión LaTeX a HTML
   */
  const renderToString = (expression: string, options?: KatexOptions): string => {
    const defaultOptions: KatexOptions = {
      displayMode: false,
      throwOnError: false,
      errorColor: '#cc0000',
      strict: false,
      trust: true,
      output: 'html',
    }

    try {
      return katex.renderToString(expression, {
        ...defaultOptions,
        ...options,
      })
    } catch (error) {
      console.error('Error renderizando KaTeX:', error)
      return `<span style="color: #cc0000;">${expression}</span>`
    }
  }

  /**
   * Renderiza directamente en un elemento DOM
   */
  const renderToElement = (
    element: HTMLElement,
    expression: string,
    options?: KatexOptions,
  ): void => {
    const defaultOptions: KatexOptions = {
      displayMode: false,
      throwOnError: false,
      errorColor: '#cc0000',
      strict: false,
      trust: true,
    }

    try {
      katex.render(expression, element, {
        ...defaultOptions,
        ...options,
      })
    } catch (error) {
      console.error('Error renderizando KaTeX:', error)
      element.innerHTML = `<span style="color: #cc0000;">${expression}</span>`
    }
  }

  /**
   * Genera LaTeX para una fracción simple
   */
  const fractionToLatex = (numerador: number, denominador: number): string => {
    return `\\frac{${numerador}}{${denominador}}`
  }

  /**
   * Genera LaTeX para un número mixto
   */
  const mixedNumberToLatex = (entero: number, numerador: number, denominador: number): string => {
    return `${entero}\\frac{${numerador}}{${denominador}}`
  }

  /**
   * Genera LaTeX para una ecuación de fracciones
   */
  const fractionEquationToLatex = (
    num1: number,
    den1: number,
    operador: '+' | '-' | '×' | '÷' | '=',
    num2: number,
    den2: number,
  ): string => {
    const operadorSymbol = operador === '×' ? '\\times' : operador === '÷' ? '\\div' : operador

    return `\\frac{${num1}}{${den1}} ${operadorSymbol} \\frac{${num2}}{${den2}}`
  }

  /**
   * Genera LaTeX para una comparación de fracciones
   */
  const fractionComparisonToLatex = (
    num1: number,
    den1: number,
    operador: '>' | '<' | '=' | '≥' | '≤',
    num2: number,
    den2: number,
  ): string => {
    const operadorSymbol = operador === '≥' ? '\\geq' : operador === '≤' ? '\\leq' : operador

    return `\\frac{${num1}}{${den1}} ${operadorSymbol} \\frac{${num2}}{${den2}}`
  }

  /**
   * Renderiza una fracción con opciones
   */
  const renderFraction = (
    numerador: number,
    denominador: number,
    options?: KatexOptions,
  ): string => {
    const latex = fractionToLatex(numerador, denominador)
    return renderToString(latex, options)
  }

  /**
   * Renderiza un número mixto
   */
  const renderMixedNumber = (
    entero: number,
    numerador: number,
    denominador: number,
    options?: KatexOptions,
  ): string => {
    const latex = mixedNumberToLatex(entero, numerador, denominador)
    return renderToString(latex, options)
  }

  /**
   * Renderiza una ecuación de fracciones
   */
  const renderFractionEquation = (
    num1: number,
    den1: number,
    operador: '+' | '-' | '×' | '÷' | '=',
    num2: number,
    den2: number,
    options?: KatexOptions,
  ): string => {
    const latex = fractionEquationToLatex(num1, den1, operador, num2, den2)
    return renderToString(latex, options)
  }

  /**
   * Renderiza una comparación de fracciones
   */
  const renderFractionComparison = (
    num1: number,
    den1: number,
    operador: '>' | '<' | '=' | '≥' | '≤',
    num2: number,
    den2: number,
    options?: KatexOptions,
  ): string => {
    const latex = fractionComparisonToLatex(num1, den1, operador, num2, den2)
    return renderToString(latex, options)
  }

  return {
    renderToString,
    renderToElement,
    fractionToLatex,
    mixedNumberToLatex,
    fractionEquationToLatex,
    fractionComparisonToLatex,
    renderFraction,
    renderMixedNumber,
    renderFractionEquation,
    renderFractionComparison,
  }
}
