<template>
  <div class="generate-view">
    <div class="container-wide" style="padding-top: var(--spacing-lg)">
      <BreadcrumbNav :items="breadcrumbs" />
    </div>
    <ExerciseGenerator />
  </div>
</template>

<script setup lang="ts">
import ExerciseGenerator from '@/components/exercise/ExerciseGenerator.vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

const breadcrumbs = [{ label: 'Inicio', path: '/' }, { label: 'Generar Ejercicios' }]
</script>

<style scoped>
.generate-view {
  width: 100%;
  min-height: 100vh;
}
</style>
