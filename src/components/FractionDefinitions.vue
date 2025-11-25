<template>
  <div class="fraction-definitions">
    <!-- Encabezado con botón -->
    <div class="definition-header">
      <h2>{{ titulo }}</h2>
    </div>

    <!-- Definición principal -->
    <div class="definition-content">
      <div class="subtitulo-container">
        <h3>{{ subtitulo }}</h3>
      </div>
      <p class="definition-text">{{ definicion }}</p>

      <!-- Componentes de la fracción (si es intro) -->
      <div v-if="showComponents" class="fraction-components">
        <div class="component-diagram">
          <FractionDisplay
            :numerador="ejemploNumerador"
            :denominador="ejemploDenominador"
            size="large"
          />
          <div class="component-labels">
            <div class="label numerador-label">
              <span class="arrow">↑</span>
              <span class="text"
                ><strong>Numerador:</strong> Indica cuántas partes tomamos ({{
                  ejemploNumerador
                }})</span
              >
            </div>
            <div class="label denominador-label">
              <span class="arrow">↓</span>
              <span class="text"
                ><strong>Denominador:</strong> Indica en cuántas partes se divide el todo ({{
                  ejemploDenominador
                }})</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Ejemplo dinámico con visualización -->
      <div class="example-section">
        <div class="example-header">
          <h4>Ejemplo Aleatorio:</h4>
          <button @click="refreshExample" class="refresh-btn" title="Generar nuevo ejemplo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            Nuevo Ejemplo
          </button>
        </div>
        <div class="example-container">
          <div class="example-text">
            <FractionDisplay
              :numerador="ejemploNumerador"
              :denominador="ejemploDenominador"
              :entero="ejemploEntero"
              size="normal"
              inline
            />
            <span class="example-description">{{ ejemploDescripcion }}</span>
          </div>

          <!-- Visualización gráfica del ejemplo -->
          <div class="example-visual">
            <FractionVisualizer
              :numerador="ejemploNumerador"
              :denominador="ejemploDenominador"
              tipo="circular"
              :show-controls="false"
              :show-info="false"
            />
          </div>
        </div>
      </div>

      <!-- Tipos de fracciones (si aplica) -->
      <div v-if="showTypes" class="fraction-types">
        <h4>Tipos de Fracciones:</h4>
        <div class="types-grid">
          <div
            v-for="tipo in tiposFracciones"
            :key="tipo.nombre"
            class="type-card"
            :class="{ active: esTipoActual(tipo.condicion) }"
          >
            <div class="type-header">
              <span class="type-icon">{{ tipo.icono }}</span>
              <h5>{{ tipo.nombre }}</h5>
            </div>
            <p class="type-description">{{ tipo.descripcion }}</p>
            <div class="type-example">
              <span>Ejemplo: </span>
              <FractionDisplay
                :numerador="tipo.ejemplo.numerador"
                :denominador="tipo.ejemplo.denominador"
                size="small"
                inline
              />
            </div>
            <div v-if="esTipoActual(tipo.condicion)" class="type-badge">
              ✓ Tu ejemplo es {{ tipo.nombre.toLowerCase() }}
            </div>
          </div>
        </div>
      </div>

      <!-- Explicación adicional para números mixtos -->
      <div v-if="showMixedExplanation && esImpropia" class="mixed-explanation">
        <div class="info-box">
          <div class="info-icon">💡</div>
          <div class="info-content">
            <h4>¿Por qué es impropia?</h4>
            <p>
              Esta fracción es <strong>impropia</strong> porque el numerador ({{
                ejemploNumerador
              }}) es mayor que el denominador ({{ ejemploDenominador }}). Esto significa que
              representa más de un entero completo.
            </p>
            <p v-if="ejemploEntero > 0">
              Podemos convertirla a número mixto:
              <FractionDisplay
                :numerador="ejemploNumerador"
                :denominador="ejemploDenominador"
                size="small"
                inline
              />
              =
              <FractionDisplay
                :numerador="ejemploNumerador % ejemploDenominador"
                :denominador="ejemploDenominador"
                :entero="ejemploEntero"
                size="small"
                inline
              />
            </p>
          </div>
        </div>
      </div>

      <!-- Cita bibliográfica -->
      <div class="citation">
        <p class="citation-text">{{ cita }}</p>
        <a v-if="citaUrl" :href="citaUrl" target="_blank" rel="noopener" class="citation-link">
          {{ citaAutor }} - {{ citaPagina }}
        </a>
        <span v-else class="citation-author"> {{ citaAutor }} - {{ citaPagina }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FractionDisplay from './FractionDisplay.vue'
import FractionVisualizer from './FractionVisualizer.vue'
import { FractionConverter } from '@/services/FractionConverter'
import { random } from '@/utils/mathUtils'

interface Props {
  tema:
    | 'introduccion'
    | 'numeros-mixtos'
    | 'equivalentes'
    | 'simplificacion'
    | 'comparacion'
    | 'operaciones'
  showComponents?: boolean // Mostrar etiquetas de numerador/denominador
  showTypes?: boolean // Mostrar tipos de fracciones
  showMixedExplanation?: boolean // Mostrar explicación de impropias
}

const props = withDefaults(defineProps<Props>(), {
  showComponents: false,
  showTypes: false,
  showMixedExplanation: false,
})

// Ejemplo dinámico
const ejemploNumerador = ref(3)
const ejemploDenominador = ref(4)
const ejemploEntero = ref(0)

// Contenido según el tema
const contenidoTema = computed(() => {
  const contenidos = {
    introduccion: {
      titulo: 'Definiciones y Conceptos',
      subtitulo: '¿Qué es una Fracción?',
      definicion:
        'Una fracción representa una parte de un todo. Se compone de dos números separados por una línea: el numerador (arriba) indica cuántas partes tomamos, y el denominador (abajo) indica en cuántas partes se divide el todo.',
      cita: '"Las fracciones son números que expresan una o varias partes iguales de una unidad."',
      citaAutor: 'Baldor, A.',
      citaPagina: 'Aritmética, p. 142',
      citaUrl: '',
    },
    'numeros-mixtos': {
      titulo: 'Números Mixtos',
      subtitulo: '¿Qué es un Número Mixto?',
      definicion:
        'Un número mixto está formado por una parte entera y una fracción propia. Se utiliza para representar fracciones impropias de forma más intuitiva. Por ejemplo, 2 ½ pizzas es más claro que 5/2 pizzas.',
      cita: '"Un número mixto consta de un número entero y una fracción."',
      citaAutor: 'Moise, E. & Downs, F.',
      citaPagina: 'Geometría Moderna, p. 89',
      citaUrl: '',
    },
    equivalentes: {
      titulo: 'Fracciones Equivalentes',
      subtitulo: '¿Qué son Fracciones Equivalentes?',
      definicion:
        'Dos fracciones son equivalentes cuando representan la misma cantidad, aunque tengan numeradores y denominadores diferentes. Se obtienen multiplicando o dividiendo el numerador y denominador por el mismo número.',
      cita: '"Las fracciones equivalentes representan el mismo valor numérico."',
      citaAutor: 'Stewart, J.',
      citaPagina: 'Precálculo, p. 12',
      citaUrl: '',
    },
    simplificacion: {
      titulo: 'Simplificación de Fracciones',
      subtitulo: '¿Cómo Simplificar una Fracción?',
      definicion:
        'Simplificar una fracción significa reducirla a su mínima expresión, dividiendo el numerador y denominador por su máximo común divisor (MCD). Una fracción simplificada es más fácil de comprender y trabajar.',
      cita: '"Una fracción está en su forma más simple cuando el MCD de numerador y denominador es 1."',
      citaAutor: 'Miller, C. D.',
      citaPagina: 'Matemáticas: Razonamiento y Aplicaciones, p. 234',
      citaUrl: '',
    },
    comparacion: {
      titulo: 'Comparación de Fracciones',
      subtitulo: '¿Cómo Comparar Fracciones?',
      definicion:
        'Para comparar fracciones, podemos usar varios métodos: convertirlas a común denominador, convertirlas a decimales, o usar productos cruzados. Si tienen el mismo denominador, la fracción con mayor numerador es la mayor.',
      cita: '"Para comparar fracciones con diferentes denominadores, primero se reducen a un común denominador."',
      citaAutor: 'Zill, D. G.',
      citaPagina: 'Álgebra y Trigonometría, p. 45',
      citaUrl: '',
    },
    operaciones: {
      titulo: 'Operaciones con Fracciones',
      subtitulo: 'Suma, Resta, Multiplicación y División',
      definicion:
        'Las fracciones se pueden sumar, restar, multiplicar y dividir siguiendo reglas específicas. Para suma y resta necesitamos común denominador. Para multiplicación, multiplicamos numeradores entre sí y denominadores entre sí. Para división, multiplicamos por el recíproco.',
      cita: '"Las operaciones con fracciones siguen las mismas propiedades que los números enteros."',
      citaAutor: 'Larson, R. & Hostetler, R.',
      citaPagina: 'Álgebra Intermedia, p. 178',
      citaUrl: '',
    },
  }

  return contenidos[props.tema]
})

const titulo = computed(() => contenidoTema.value.titulo)
const subtitulo = computed(() => contenidoTema.value.subtitulo)
const definicion = computed(() => contenidoTema.value.definicion)
const cita = computed(() => contenidoTema.value.cita)
const citaAutor = computed(() => contenidoTema.value.citaAutor)
const citaPagina = computed(() => contenidoTema.value.citaPagina)
const citaUrl = computed(() => contenidoTema.value.citaUrl)

// Tipos de fracciones
const tiposFracciones = [
  {
    nombre: 'Propia',
    icono: '✅',
    descripcion: 'El numerador es menor que el denominador (< 1)',
    condicion: 'propia',
    ejemplo: { numerador: 3, denominador: 5 },
  },
  {
    nombre: 'Impropia',
    icono: '⚠️',
    descripcion: 'El numerador es mayor que el denominador (> 1)',
    condicion: 'impropia',
    ejemplo: { numerador: 7, denominador: 4 },
  },
  {
    nombre: 'Unitaria',
    icono: '🎯',
    descripcion: 'El numerador y denominador son iguales (= 1)',
    condicion: 'unitaria',
    ejemplo: { numerador: 5, denominador: 5 },
  },
  {
    nombre: 'Aparente',
    icono: '💫',
    descripcion: 'Es impropia y su resultado es un entero exacto',
    condicion: 'aparente',
    ejemplo: { numerador: 8, denominador: 4 },
  },
]

// Computed
const esImpropia = computed(
  () => ejemploNumerador.value > ejemploDenominador.value && ejemploDenominador.value > 0,
)

const tipoFraccionActual = computed(() => {
  return FractionConverter.identifyType(ejemploNumerador.value, ejemploDenominador.value)
})

const ejemploDescripcion = computed(() => {
  const tipoInfo = tipoFraccionActual.value
  const decimal = FractionConverter.toDecimal(ejemploNumerador.value, ejemploDenominador.value)

  if (tipoInfo.tipo === 'propia') {
    return `es una fracción propia (${decimal.valor.toFixed(2)})`
  } else if (tipoInfo.tipo === 'impropia') {
    return `es una fracción impropia (${decimal.valor.toFixed(2)})`
  } else if (tipoInfo.tipo === 'unitaria') {
    return `es una fracción unitaria (= 1)`
  } else if (tipoInfo.tipo === 'aparente') {
    return `es una fracción aparente (= ${Math.floor(decimal.valor)})`
  }
  return ''
})

// Métodos
const esTipoActual = (condicion: string): boolean => {
  return tipoFraccionActual.value.tipo === condicion
}

const refreshExample = () => {
  // Generar ejemplo según el tema
  if (props.tema === 'introduccion' || props.tema === 'equivalentes') {
    // Generar diferentes tipos de fracciones aleatoriamente
    const tipoAleatorio = random(1, 4) // 1=propia, 2=impropia, 3=unitaria, 4=aparente

    if (tipoAleatorio === 1) {
      // Fracción propia: numerador < denominador
      ejemploDenominador.value = random(2, 12)
      ejemploNumerador.value = random(1, ejemploDenominador.value - 1)
    } else if (tipoAleatorio === 2) {
      // Fracción impropia: numerador > denominador (pero no aparente)
      ejemploDenominador.value = random(2, 8)
      // Generar un numerador que NO sea múltiplo del denominador
      let num = random(ejemploDenominador.value + 1, ejemploDenominador.value * 3)
      while (num % ejemploDenominador.value === 0) {
        num = random(ejemploDenominador.value + 1, ejemploDenominador.value * 3)
      }
      ejemploNumerador.value = num
    } else if (tipoAleatorio === 3) {
      // Fracción unitaria: numerador = denominador
      const valor = random(2, 10)
      ejemploNumerador.value = valor
      ejemploDenominador.value = valor
    } else {
      // Fracción aparente: numerador es múltiplo del denominador
      ejemploDenominador.value = random(2, 8)
      const multiplo = random(2, 5)
      ejemploNumerador.value = ejemploDenominador.value * multiplo
    }
  } else if (props.tema === 'numeros-mixtos') {
    // Fracciones impropias
    ejemploDenominador.value = random(3, 8)
    ejemploNumerador.value = random(ejemploDenominador.value + 1, ejemploDenominador.value * 3)
    const mixto = FractionConverter.toMixedNumber(ejemploNumerador.value, ejemploDenominador.value)
    ejemploEntero.value = mixto.entero
  } else {
    // Mixto - generar diferentes tipos
    const tipoAleatorio = random(1, 4)

    if (tipoAleatorio === 1) {
      ejemploDenominador.value = random(2, 12)
      ejemploNumerador.value = random(1, ejemploDenominador.value - 1)
    } else if (tipoAleatorio === 2) {
      ejemploDenominador.value = random(2, 8)
      let num = random(ejemploDenominador.value + 1, ejemploDenominador.value * 3)
      while (num % ejemploDenominador.value === 0) {
        num = random(ejemploDenominador.value + 1, ejemploDenominador.value * 3)
      }
      ejemploNumerador.value = num
    } else if (tipoAleatorio === 3) {
      const valor = random(2, 10)
      ejemploNumerador.value = valor
      ejemploDenominador.value = valor
    } else {
      ejemploDenominador.value = random(2, 8)
      const multiplo = random(2, 5)
      ejemploNumerador.value = ejemploDenominador.value * multiplo
    }
  }
}

onMounted(() => {
  refreshExample()
})
</script>

<style scoped>
.fraction-definitions {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.definition-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 3px solid var(--primary, #6366f1);
}

.definition-header h2 {
  font-size: 2rem;
  color: var(--primary, #6366f1);
  margin: 0;
}

.refresh-btn {
  padding: 10px 20px;
  background: var(--color-sep-blue);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: var(--transition-base);
  display: flex;
  align-items: center;
  gap: 8px;
}

.refresh-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.refresh-btn:hover {
  background: var(--color-sep-blue-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.subtitulo-container {
  margin-bottom: 16px;
}

.definition-content h3 {
  font-size: 1.5rem;
  color: var(--dark, #1f2937);
  margin: 0;
}

.definition-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--dark, #374151);
  text-align: justify;
  margin-bottom: 24px;
}

/* Componentes de fracción */
.fraction-components {
  background: var(--color-gray-50);
  border: 2px solid var(--color-sep-blue-light);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin: 24px 0;
}

.component-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.component-labels {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 500px;
}

.label {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.numerador-label {
  border-left: 4px solid var(--primary, #6366f1);
}

.denominador-label {
  border-left: 4px solid var(--dark, #1f2937);
}

.arrow {
  font-size: 1.5rem;
}

.label .text {
  font-size: 0.95rem;
  color: var(--dark, #374151);
}

/* Ejemplo dinámico */
.example-section {
  margin: 32px 0;
}

.example-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.example-section h4 {
  font-size: 1.3rem;
  color: var(--primary, #6366f1);
  margin: 0;
}

.example-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: center;
}

.example-text {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 1.1rem;
}

.example-description {
  color: var(--dark, #4b5563);
  font-style: italic;
}

.example-visual {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Tipos de fracciones */
.fraction-types {
  margin: 32px 0;
}

.fraction-types h4 {
  font-size: 1.3rem;
  color: var(--primary, #6366f1);
  margin-bottom: 16px;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.type-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
}

.type-card.active {
  border-color: var(--color-success-green);
  background: var(--color-gray-50);
  border-width: 2px;
  box-shadow: var(--shadow-md);
}

.type-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.type-icon {
  font-size: 1.5rem;
}

.type-header h5 {
  font-size: 1.1rem;
  color: var(--dark, #1f2937);
  margin: 0;
}

.type-description {
  font-size: 0.9rem;
  color: var(--dark, #6b7280);
  margin-bottom: 12px;
  line-height: 1.5;
}

.type-example {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: var(--dark, #374151);
}

.type-badge {
  margin-top: 12px;
  padding: 8px 12px;
  background: var(--success, #10b981);
  color: white;
  border-radius: 6px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Explicación de números mixtos */
.mixed-explanation {
  margin: 24px 0;
}

.info-box {
  display: flex;
  gap: 16px;
  background: var(--color-gray-50);
  border-left: 4px solid var(--color-academic-yellow);
  border-radius: var(--radius-md);
  padding: 20px;
}

.info-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.info-content h4 {
  font-size: 1.1rem;
  color: var(--dark, #1f2937);
  margin: 0 0 8px 0;
}

.info-content p {
  font-size: 0.95rem;
  color: var(--dark, #374151);
  line-height: 1.6;
  margin: 8px 0;
}

/* Cita bibliográfica */
.citation {
  margin-top: 32px;
  padding: 20px;
  background: var(--color-gray-50);
  border-left: 4px solid var(--color-sep-blue);
  border-radius: var(--radius-md);
}

.citation-text {
  font-size: 1rem;
  font-style: italic;
  color: var(--dark, #1f2937);
  margin-bottom: 8px;
}

.citation-link,
.citation-author {
  font-size: 0.9rem;
  color: var(--primary, #6366f1);
  font-weight: 600;
}

.citation-link {
  text-decoration: none;
  transition: color 0.3s ease;
}

.citation-link:hover {
  color: var(--secondary, #8b5cf6);
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .fraction-definitions {
    padding: 20px;
  }

  .definition-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .definition-header h2 {
    font-size: 1.5rem;
  }

  .subtitulo-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .refresh-btn {
    width: 100%;
    padding: 12px;
  }

  .example-container {
    grid-template-columns: 1fr;
  }

  .types-grid {
    grid-template-columns: 1fr;
  }
}
</style>
