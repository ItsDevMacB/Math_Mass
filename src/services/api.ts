/**
 * Servicio de API para comunicación con el servidor
 * Puede ser usado para llamadas a funciones serverless
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

interface FetchOptions extends RequestInit {
  timeout?: number
}

/**
 * Realizar una petición fetch con timeout
 */
async function fetchWithTimeout(url: string, options: FetchOptions = {}): Promise<Response> {
  const { timeout = 10000, ...fetchOptions } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    })

    clearTimeout(id)

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }

    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

/**
 * GET request
 */
export async function get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  const url = `${API_URL}${endpoint}`
  const response = await fetchWithTimeout(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  return response.json()
}

/**
 * POST request
 */
export async function post<T, D extends Record<string, unknown> = Record<string, unknown>>(
  endpoint: string,
  data?: D,
  options?: FetchOptions,
): Promise<T> {
  const url = `${API_URL}${endpoint}`
  const response = await fetchWithTimeout(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  })

  return response.json()
}

/**
 * PUT request
 */
export async function put<T, D extends Record<string, unknown> = Record<string, unknown>>(
  endpoint: string,
  data?: D,
  options?: FetchOptions,
): Promise<T> {
  const url = `${API_URL}${endpoint}`
  const response = await fetchWithTimeout(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  })

  return response.json()
}

/**
 * DELETE request
 */
export async function del<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  const url = `${API_URL}${endpoint}`
  const response = await fetchWithTimeout(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  return response.json()
}

/**
 * Generar ejercicios desde el servidor (opcional)
 */
export async function generateExercisesFromServer(
  count: number,
  difficulty: 'facil' | 'medio' | 'dificil',
  seed?: number,
) {
  const endpoint = import.meta.env.VITE_API_GENERATE_ENDPOINT || '/api/generate'

  return post(endpoint, {
    count,
    difficulty,
    seed,
  })
}
