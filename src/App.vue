<script setup lang="ts">
import { RouterView } from 'vue-router'
import FooterInstitucional from '@/components/FooterInstitucional.vue'
</script>

<template>
  <div id="app-wrapper">
    <RouterView />
    <FooterInstitucional />
  </div>
</template>

<style>
/* Los estilos globales están en main.css */

#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
