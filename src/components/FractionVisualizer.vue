<template>
  <div class="fraction-visualizer">
    <!-- Selector de tipo de visualización -->
    <div v-if="showControls" class="visualizer-controls">
      <button
        v-for="tipo in tiposVisualizacion"
        :key="tipo.value"
        class="control-btn"
        :class="{ active: tipoActual === tipo.value }"
        @click="tipoActual = tipo.value"
      >
        {{ tipo.label }}
      </button>
    </div>

    <!-- SVG Container -->
    <div class="svg-container">
      <svg
        ref="svgElement"
        :viewBox="viewBox"
        class="fraction-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Visualización circular -->
        <g v-if="tipoActual === 'circular'" class="visualization-circular">
          <g
            v-for="(circulo, idx) in circulos"
            :key="`circle-${idx}`"
            :transform="`translate(${circulo.cx}, ${circulo.cy})`"
          >
            <!-- Círculo base -->
            <circle
              :r="circulo.radio"
              fill="none"
              :stroke="colorBase"
              :stroke-width="grosorBorde"
            />

            <!-- Sectores -->
            <path
              v-for="(sector, sIdx) in circulo.sectores"
              :key="`sector-${sIdx}`"
              :d="sector.path"
              :fill="sector.filled ? coloresRelleno[sIdx % coloresRelleno.length] : 'transparent'"
              :stroke="colorBorde"
              :stroke-width="grosorBorde"
              class="sector"
            />
          </g>
        </g>

        <!-- Visualización en barra -->
        <g v-if="tipoActual === 'barra'" class="visualization-barra">
          <rect
            v-for="(celda, idx) in celdas"
            :key="`cell-${idx}`"
            :x="celda.x"
            :y="celda.y"
            :width="celda.width"
            :height="celda.height"
            :fill="celda.filled ? coloresRelleno[0] : 'transparent'"
            :stroke="colorBorde"
            :stroke-width="grosorBorde"
            class="celda"
          />
        </g>
      </svg>
    </div>

    <!-- Información adicional -->
    <div v-if="showInfo" class="fraction-info">
      <div class="info-item">
        <span class="info-label">Tipo:</span>
        <span class="info-value">{{ tipoFraccion }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Valor:</span>
        <span class="info-value">{{ valorDecimal }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { FractionConverter } from '@/services/FractionConverter'

interface Props {
  numerador: number
  denominador: number
  tipo?: 'circular' | 'barra' | 'auto'
  showControls?: boolean
  showInfo?: boolean
  coloresRelleno?: string[]
  colorBase?: string
  colorBorde?: string
  grosorBorde?: number
  tamañoCirculo?: number
}

const props = withDefaults(defineProps<Props>(), {
  tipo: 'auto',
  showControls: true,
  showInfo: true,
  coloresRelleno: () => ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc'],
  colorBase: '#f1f5f9',
  colorBorde: '#ffffff',
  grosorBorde: 2,
  tamañoCirculo: 80,
})

const tipoActual = ref<'circular' | 'barra'>(
  props.tipo === 'auto'
    ? props.numerador <= props.denominador
      ? 'circular'
      : 'circular'
    : props.tipo,
)

const tiposVisualizacion = [
  { value: 'circular', label: '🔵 Circular' },
  { value: 'barra', label: '📊 Barra' },
] as const

// Computed: Información de la fracción
const tipoFraccion = computed(() => {
  const result = FractionConverter.identifyType(props.numerador, props.denominador)
  return result.tipo.charAt(0).toUpperCase() + result.tipo.slice(1)
})

const valorDecimal = computed(() => {
  return (props.numerador / props.denominador).toFixed(3)
})

// Computed: ViewBox del SVG
const viewBox = computed(() => {
  if (tipoActual.value === 'circular') {
    const circulosNecesarios = Math.ceil(props.numerador / props.denominador)
    const ancho = Math.max(600, circulosNecesarios * (props.tamañoCirculo * 2.5) + 100)
    const alto = props.tamañoCirculo * 3
    return `0 0 ${ancho} ${alto}`
  } else {
    return '0 0 600 300'
  }
})

// Computed: Círculos para visualización circular
const circulos = computed(() => {
  if (tipoActual.value !== 'circular') return []

  const circulosCompletos = Math.floor(props.numerador / props.denominador)
  const resto = props.numerador % props.denominador

  const resultado = []
  const espaciado = props.tamañoCirculo * 2.5
  const yBase = props.tamañoCirculo * 1.5 // Centrado verticalmente

  // Círculos completos
  for (let i = 0; i < circulosCompletos; i++) {
    resultado.push({
      cx: 50 + espaciado / 2 + i * espaciado, // Espacio izquierdo
      cy: yBase,
      radio: props.tamañoCirculo,
      sectores: generarSectores(props.denominador, props.denominador),
    })
  }

  // Círculo parcial
  if (resto > 0) {
    resultado.push({
      cx: 50 + espaciado / 2 + circulosCompletos * espaciado,
      cy: yBase,
      radio: props.tamañoCirculo,
      sectores: generarSectores(props.denominador, resto),
    })
  }

  return resultado
})

// Computed: Celdas para visualización en barra
const celdas = computed(() => {
  if (tipoActual.value !== 'barra') return []

  const ancho = 400
  const alto = 80
  const x = 50
  const y = 60
  const anchoCelda = ancho / props.denominador

  const resultado = []

  for (let i = 0; i < props.denominador; i++) {
    resultado.push({
      x: x + i * anchoCelda,
      y,
      width: anchoCelda,
      height: alto,
      filled: i < props.numerador,
    })
  }

  return resultado
})

/**
 * Genera los sectores para un círculo
 */
function generarSectores(total: number, rellenos: number) {
  const sectores = []
  const anguloSector = 360 / total

  for (let i = 0; i < total; i++) {
    const startAngle = i * anguloSector - 90
    const endAngle = (i + 1) * anguloSector - 90

    sectores.push({
      path: crearPathSector(props.tamañoCirculo, startAngle, endAngle),
      filled: i < rellenos,
    })
  }

  return sectores
}

/**
 * Crea el path SVG para un sector circular
 */
function crearPathSector(radio: number, startAngle: number, endAngle: number): string {
  const start = polarACartesiano(0, 0, radio, startAngle)
  const end = polarACartesiano(0, 0, radio, endAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1

  return [
    'M',
    0,
    0,
    'L',
    start.x,
    start.y,
    'A',
    radio,
    radio,
    0,
    largeArc,
    1,
    end.x,
    end.y,
    'Z',
  ].join(' ')
}

/**
 * Convierte coordenadas polares a cartesianas
 */
function polarACartesiano(cx: number, cy: number, radio: number, angulo: number) {
  const radianes = (angulo * Math.PI) / 180
  return {
    x: cx + radio * Math.cos(radianes),
    y: cy + radio * Math.sin(radianes),
  }
}

// Watch: Auto-cambiar tipo según fracción
watch([() => props.numerador, () => props.denominador], () => {
  if (props.tipo === 'auto') {
    // Si es número mixto, mantener circular
    if (props.numerador > props.denominador) {
      tipoActual.value = 'circular'
    }
  }
})
</script>

<style scoped>
.fraction-visualizer {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.visualizer-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.control-btn {
  padding: 10px 20px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #64748b;
}

.control-btn:hover {
  border-color: #6366f1;
  color: #6366f1;
  transform: translateY(-2px);
}

.control-btn.active {
  background: var(--color-sep-blue);
  color: white;
  border-color: transparent;
  box-shadow: var(--shadow-md);
}

.svg-container {
  background: var(--color-gray-50);
  border: 2px solid var(--border-color-light);
  border-radius: var(--radius-xl);
  padding: 30px;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.fraction-svg {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
}

.sector {
  transition: all 0.3s ease;
}

.sector:hover {
  opacity: 0.8;
  transform: scale(1.05);
  transform-origin: center;
}

.celda {
  transition: all 0.3s ease;
}

.celda:hover {
  opacity: 0.9;
}

.fraction-info {
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.info-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

.info-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-sep-blue);
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.visualization-circular,
.visualization-barra {
  animation: fadeIn 0.5s ease-out;
}

/* Responsive */
@media (max-width: 768px) {
  .svg-container {
    padding: 20px;
  }

  .fraction-info {
    flex-direction: column;
    gap: 15px;
  }

  .control-btn {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
}
</style>
