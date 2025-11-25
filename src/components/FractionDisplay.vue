<template>
  <span
    class="fraction-display"
    :class="[sizeClass, { inline, 'with-simplified': showSimplified && esSimplificable }]"
  >
    <!-- Fracción renderizada con KaTeX -->
    <span v-html="fractionHtml" class="katex-wrapper"></span>

    <!-- Fracción simplificada (si aplica) -->
    <span v-if="showSimplified && esSimplificable" class="simplified-indicator">
      = <span v-html="simplifiedHtml" class="katex-wrapper"></span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FractionConverter } from '@/services/FractionConverter'
import { useKaTeX } from '@/composables/useKaTeX'

interface Props {
  numerador: number
  denominador: number
  entero?: number
  size?: 'small' | 'normal' | 'large'
  inline?: boolean
  showSimplified?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  entero: 0,
  size: 'normal',
  inline: false,
  showSimplified: false,
})

const { renderFraction, renderMixedNumber } = useKaTeX()

// Computed para la clase de tamaño
const sizeClass = computed(() => `size-${props.size}`)

// Verificar si es simplificable
const esSimplificable = computed(() => {
  const resultado = FractionConverter.simplify(props.numerador, props.denominador)
  return !resultado.yaSimplificada
})

// Renderizar fracción principal con KaTeX
const fractionHtml = computed(() => {
  if (props.entero && props.entero > 0) {
    // Número mixto
    return renderMixedNumber(props.entero, props.numerador, props.denominador, {
      displayMode: !props.inline,
    })
  } else {
    // Fracción simple
    return renderFraction(props.numerador, props.denominador, {
      displayMode: !props.inline,
    })
  }
})

// Renderizar fracción simplificada
const simplifiedHtml = computed(() => {
  if (!esSimplificable.value) return ''
  const resultado = FractionConverter.simplify(props.numerador, props.denominador)
  return renderFraction(resultado.numerador, resultado.denominador, {
    displayMode: !props.inline,
  })
})
</script>

<style scoped>
.fraction-display {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  user-select: none;
  animation: popIn 0.4s ease-out;
}

.fraction-display.inline {
  display: inline-flex;
  vertical-align: middle;
}

/* Wrapper de KaTeX */
.katex-wrapper {
  display: inline-block;
}

/* Tamaños */
.fraction-display.size-small :deep(.katex) {
  font-size: 1.2em;
}

.fraction-display.size-normal :deep(.katex) {
  font-size: 1.8em;
}

.fraction-display.size-large :deep(.katex) {
  font-size: 2.5em;
}

/* Indicador de simplificación */
.simplified-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--success, #10b981);
  font-weight: 600;
  font-size: 0.9em;
}

/* Personalización de colores KaTeX */
.fraction-display :deep(.katex .mfrac .frac-line) {
  border-bottom-width: 0.08em;
  border-bottom-color: var(--dark, #1f2937);
}

.fraction-display :deep(.katex .mord) {
  color: var(--primary, #6366f1);
}

/* Animación de entrada */
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  60% {
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .fraction-display.size-small :deep(.katex) {
    font-size: 1em;
  }

  .fraction-display.size-normal :deep(.katex) {
    font-size: 1.4em;
  }

  .fraction-display.size-large :deep(.katex) {
    font-size: 2em;
  }

  .simplified-indicator {
    font-size: 0.85em;
  }
}
</style>
