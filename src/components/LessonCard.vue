<template>
  <div class="lesson-card" :class="{ bloqueada: isLocked }" @click="handleClick">
    <!-- Header con gradiente -->
    <div class="lesson-header">
      <div class="lesson-icon">{{ lesson.icono }}</div>
      <div class="lesson-numero">{{ lesson.numero }}</div>
    </div>

    <!-- Body con información -->
    <div class="lesson-body">
      <h3>{{ lesson.titulo }}</h3>
      <p>{{ lesson.descripcion }}</p>

      <!-- Barra de progreso -->
      <div class="lesson-progress">
        <div class="lesson-progress-bar" :style="{ width: `${progressPercent}%` }"></div>
      </div>

      <!-- Metadata -->
      <div class="lesson-meta">
        <div class="lesson-tiempo">
          <span>⏱️</span>
          <span>{{ lesson.tiempoEstimado }} min</span>
        </div>
        <div class="lesson-ejercicios">
          <span>📝</span>
          <span>{{ exerciseText }}</span>
        </div>
      </div>

      <!-- Estado -->
      <div class="lesson-estado" :class="statusClass">
        {{ statusText }}
      </div>

      <!-- Botón de acción -->
      <button class="lesson-btn" :disabled="isLocked">
        {{ buttonText }}
      </button>
    </div>

    <!-- Indicador de bloqueado -->
    <div v-if="isLocked" class="lock-overlay">
      <span class="lock-icon">🔒</span>
      <p>Completa las lecciones anteriores</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Lesson, LessonProgress } from '@/types/Lesson'

interface Props {
  lesson: Lesson
  progress?: LessonProgress
  isLocked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLocked: false,
})

const emit = defineEmits<{
  navigate: [url: string]
}>()

const progressPercent = computed(() => {
  if (!props.progress) return 0
  return Math.round((props.progress.ejerciciosCompletados / props.lesson.ejerciciosTotal) * 100)
})

const exerciseText = computed(() => {
  if (!props.progress) {
    return `${props.lesson.ejerciciosTotal} ejercicios`
  }
  return `${props.progress.ejerciciosCompletados}/${props.lesson.ejerciciosTotal}`
})

const statusClass = computed(() => {
  if (props.isLocked) return 'estado-bloqueado'
  if (!props.progress) return 'estado-nuevo'

  if (props.progress.estado === 'completado') return 'estado-completado'
  if (props.progress.estado === 'en-progreso') return 'estado-progreso'
  return 'estado-nuevo'
})

const statusText = computed(() => {
  if (props.isLocked) return '🔒 Bloqueado'
  if (!props.progress) return '✨ Nuevo'

  if (props.progress.estado === 'completado') return '✅ Completado'
  if (props.progress.estado === 'en-progreso') return '📚 En progreso'
  return '✨ Nuevo'
})

const buttonText = computed(() => {
  if (props.isLocked) return 'Bloqueado'
  if (!props.progress || props.progress.estado === 'nuevo') return 'Comenzar'
  if (props.progress.estado === 'completado') return 'Repasar'
  return 'Continuar'
})

const handleClick = () => {
  if (!props.isLocked) {
    emit('navigate', props.lesson.url)
  }
}
</script>

<style scoped>
.lesson-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.lesson-card:hover:not(.bloqueada) {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.lesson-header {
  background: var(--color-sep-blue);
  padding: 30px;
  text-align: center;
  position: relative;
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lesson-icon {
  font-size: 4rem;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.lesson-numero {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  backdrop-filter: blur(10px);
}

.lesson-body {
  padding: 25px;
}

.lesson-body h3 {
  font-size: 1.4rem;
  color: #1e293b;
  margin-bottom: 12px;
  font-weight: 600;
}

.lesson-body p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  min-height: 60px;
}

.lesson-progress {
  background: #f1f5f9;
  height: 8px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
}

.lesson-progress-bar {
  height: 100%;
  background: var(--color-success-green);
  border-radius: 10px;
  transition: width 0.5s ease;
}

.lesson-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  gap: 10px;
}

.lesson-tiempo,
.lesson-ejercicios {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.9rem;
}

.lesson-tiempo span:first-child,
.lesson-ejercicios span:first-child {
  font-size: 1.1rem;
}

.lesson-estado {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.estado-nuevo {
  background: var(--color-academic-yellow);
  color: white;
}

.estado-progreso {
  background: var(--color-sep-blue);
  color: white;
}

.estado-completado {
  background: var(--color-success-green);
  color: white;
}

.estado-bloqueado {
  background: #e2e8f0;
  color: #94a3b8;
}

.lesson-btn {
  width: 100%;
  padding: 14px;
  background: var(--color-sep-blue);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-base);
}

.lesson-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}

.lesson-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

.bloqueada {
  opacity: 0.7;
  cursor: not-allowed;
}

.bloqueada .lesson-btn {
  background: #cbd5e1;
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  backdrop-filter: blur(5px);
}

.lock-icon {
  font-size: 3rem;
  opacity: 0.5;
}

.lock-overlay p {
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
  padding: 0 20px;
}
</style>
