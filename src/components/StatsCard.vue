<template>
  <div class="stats-card bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-bold text-gray-800 mb-4">{{ title }}</h3>
    <div class="grid grid-cols-2 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="stat-item" :class="stat.color">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stat {
  label: string
  value: string | number
  color?: string
}

interface Props {
  title: string
  stats: Stat[]
}

defineProps<Props>()
</script>

<style scoped>
.stats-card {
  min-width: 280px;
}

.stat-item {
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  background-color: #f9fafb;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.stat-item.green {
  background-color: #dcfce7;
}

.stat-item.green .stat-value {
  color: #16a34a;
}

.stat-item.red {
  background-color: #fee2e2;
}

.stat-item.red .stat-value {
  color: #dc2626;
}

.stat-item.blue {
  background-color: #dbeafe;
}

.stat-item.blue .stat-value {
  color: #2563eb;
}

.stat-item.yellow {
  background-color: #fef3c7;
}

.stat-item.yellow .stat-value {
  color: #ca8a04;
}
</style>
