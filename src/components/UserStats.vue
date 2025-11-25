<template>
  <div class="user-stats-grid">
    <div class="stat-card">
      <div class="stat-icon">🎓</div>
      <div class="stat-value">{{ stats.leccionesCompletadas }}</div>
      <div class="stat-label">Lecciones completadas</div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">✅</div>
      <div class="stat-value">{{ stats.ejerciciosResueltos }}</div>
      <div class="stat-label">Ejercicios resueltos</div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">⏱️</div>
      <div class="stat-value">{{ tiempoFormateado }}</div>
      <div class="stat-label">Tiempo total</div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">🎯</div>
      <div class="stat-value" :style="{ color: precisionColor }">{{ precisionFormateada }}</div>
      <div class="stat-label">Precisión promedio</div>
    </div>

    <div v-if="stats.racha > 0" class="stat-card stat-racha">
      <div class="stat-icon">🔥</div>
      <div class="stat-value">{{ stats.racha }}</div>
      <div class="stat-label">Días de racha</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { UserStats } from '@/types/Lesson'

interface Props {
  stats: UserStats
}

const props = defineProps<Props>()

const tiempoFormateado = computed(() => {
  const minutos = props.stats.tiempoTotal
  if (minutos < 60) {
    return `${minutos}m`
  }
  const horas = Math.floor(minutos / 60)
  const mins = minutos % 60
  return mins > 0 ? `${horas}h ${mins}m` : `${horas}h`
})

const precisionFormateada = computed(() => {
  return `${Math.round(props.stats.precisionPromedio)}%`
})

const precisionColor = computed(() => {
  const precision = Math.round(props.stats.precisionPromedio)
  if (precision >= 80) return '#10b981' // Verde - Excelente
  if (precision >= 60) return '#f59e0b' // Ámbar - Bien
  if (precision >= 40) return '#ef4444' // Rojo - Necesita mejora
  return '#ef4444' // Rojo - Insuficiente
})
</script>

<style scoped>
.user-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-sep-blue);
  margin-bottom: 5px;
}

.stat-label {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-racha {
  background: var(--color-academic-yellow);
  color: white;
}

.stat-racha .stat-value {
  color: white;
}

.stat-racha .stat-label {
  color: rgba(255, 255, 255, 0.9);
}
</style>
