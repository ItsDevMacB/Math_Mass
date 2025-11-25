/**
 * Calcula el Máximo Común Divisor (MCD) usando algoritmo de Euclides
 */
export function calcularMCD(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)

  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }

  return a
}

/**
 * Calcula el Mínimo Común Múltiplo (MCM)
 */
export function calcularMCM(a: number, b: number): number {
  return Math.abs(a * b) / calcularMCD(a, b)
}

/**
 * Simplifica una fracción
 */
export function simplificarFraccion(numerador: number, denominador: number) {
  if (denominador === 0) {
    throw new Error('El denominador no puede ser 0')
  }

  const mcd = calcularMCD(numerador, denominador)

  return {
    numerador: numerador / mcd,
    denominador: denominador / mcd,
    factorSimplificacion: mcd,
  }
}

/**
 * Convierte fracción impropia a número mixto
 */
export function impropiaAMixto(numerador: number, denominador: number) {
  if (denominador === 0) {
    throw new Error('El denominador no puede ser 0')
  }

  if (numerador < denominador) {
    return {
      entero: 0,
      numerador,
      denominador,
      esMixto: false,
    }
  }

  const entero = Math.floor(numerador / denominador)
  const resto = numerador % denominador

  return {
    entero,
    numerador: resto,
    denominador,
    esMixto: true,
  }
}

/**
 * Convierte número mixto a fracción impropia
 */
export function mixtoAImpropia(entero: number, numerador: number, denominador: number) {
  if (denominador === 0) {
    throw new Error('El denominador no puede ser 0')
  }

  const nuevoNumerador = entero * denominador + numerador

  return {
    numerador: nuevoNumerador,
    denominador,
  }
}

/**
 * Identifica el tipo de fracción
 */
export function identificarTipoFraccion(
  numerador: number,
  denominador: number,
): 'propia' | 'impropia' | 'unitaria' | 'aparente' {
  if (numerador < denominador) {
    return 'propia'
  }

  if (numerador === denominador) {
    return 'unitaria'
  }

  if (numerador % denominador === 0) {
    return 'aparente'
  }

  return 'impropia'
}

/**
 * Verifica si dos fracciones son equivalentes
 */
export function sonEquivalentes(num1: number, den1: number, num2: number, den2: number): boolean {
  return num1 * den2 === num2 * den1
}

/**
 * Compara dos fracciones
 * @returns 1 si fracción1 > fracción2, -1 si fracción1 < fracción2, 0 si son iguales
 */
export function compararFracciones(num1: number, den1: number, num2: number, den2: number): number {
  const valor1 = num1 / den1
  const valor2 = num2 / den2

  if (valor1 > valor2) return 1
  if (valor1 < valor2) return -1
  return 0
}

/**
 * Genera fracciones equivalentes
 */
export function generarEquivalentes(numerador: number, denominador: number, cantidad: number = 3) {
  const equivalentes = []

  for (let i = 2; i <= cantidad + 1; i++) {
    equivalentes.push({
      numerador: numerador * i,
      denominador: denominador * i,
      factor: i,
    })
  }

  return equivalentes
}

/**
 * Convierte fracción a decimal
 */
export function fraccionADecimal(
  numerador: number,
  denominador: number,
  decimales: number = 4,
): string {
  if (denominador === 0) {
    throw new Error('El denominador no puede ser 0')
  }

  const resultado = numerador / denominador
  return resultado.toFixed(decimales)
}

/**
 * Formatea una fracción como texto
 */
export function formatearFraccion(
  numerador: number,
  denominador: number,
  formato: 'simple' | 'unicode' | 'latex' = 'simple',
): string {
  if (formato === 'unicode') {
    return `${numerador}⁄${denominador}`
  }

  if (formato === 'latex') {
    return `\\frac{${numerador}}{${denominador}}`
  }

  return `${numerador}/${denominador}`
}

/**
 * Formatea un número mixto como texto
 */
export function formatearNumeroMixto(
  entero: number,
  numerador: number,
  denominador: number,
): string {
  if (entero === 0) {
    return formatearFraccion(numerador, denominador)
  }

  if (numerador === 0) {
    return entero.toString()
  }

  return `${entero} ${numerador}/${denominador}`
}

/**
 * Formatea tiempo en segundos a formato legible
 */
export function formatearTiempo(segundos: number): string {
  if (segundos < 60) {
    return `${segundos}s`
  }

  if (segundos < 3600) {
    const minutos = Math.floor(segundos / 60)
    const segs = segundos % 60
    return segs > 0 ? `${minutos}m ${segs}s` : `${minutos}m`
  }

  const horas = Math.floor(segundos / 3600)
  const minutos = Math.floor((segundos % 3600) / 60)
  return minutos > 0 ? `${horas}h ${minutos}m` : `${horas}h`
}

/**
 * Genera un número aleatorio entre min y max (inclusivo)
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Mezcla un array aleatoriamente (Fisher-Yates shuffle)
 */
export function mezclarArray<T>(array: T[]): T[] {
  const resultado = [...array]

  for (let i = resultado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = resultado[i]
    resultado[i] = resultado[j]!
    resultado[j] = temp!
  }

  return resultado
}

/**
 * Valida si un valor es un número entero positivo
 */
export function esEnteroPositivo(valor: unknown): boolean {
  return typeof valor === 'number' && Number.isInteger(valor) && valor > 0
}

/**
 * Valida estructura de fracción
 */
export function validarFraccion(
  numerador: number,
  denominador: number,
): { valida: boolean; error?: string } {
  if (!Number.isInteger(numerador)) {
    return { valida: false, error: 'El numerador debe ser un número entero' }
  }

  if (!Number.isInteger(denominador)) {
    return { valida: false, error: 'El denominador debe ser un número entero' }
  }

  if (denominador === 0) {
    return { valida: false, error: 'El denominador no puede ser 0' }
  }

  if (numerador < 0 || denominador < 0) {
    return { valida: false, error: 'Los números deben ser positivos' }
  }

  return { valida: true }
}

/**
 * Genera un ID único
 */
export function generarId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Calcula porcentaje
 */
export function calcularPorcentaje(parte: number, total: number): number {
  if (total === 0) return 0
  return Math.round((parte / total) * 100)
}
