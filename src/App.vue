<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import FooterInstitucional from '@/components/FooterInstitucional.vue'
import { useNotifications } from '@/composables/useNotifications'

const { showWelcomeNotification } = useNotifications()

onMounted(async () => {
  console.log('App montada - Verificando notificaciones...')
  console.log('Soporte de notificaciones:', 'Notification' in window)
  console.log('Permiso actual:', Notification.permission)

  // Solicitar permisos INMEDIATAMENTE al cargar la página
  if ('Notification' in window && Notification.permission === 'default') {
    console.log('🔔 Solicitando permisos de notificaciones inmediatamente...')
    const permission = await Notification.requestPermission()
    console.log('📝 Permiso otorgado:', permission)
  }

  // Mostrar notificación de bienvenida solo la primera vez
  const hasSeenWelcome = localStorage.getItem('math-mass-welcome-shown')
  console.log('¿Ya vio bienvenida?', hasSeenWelcome)

  if (!hasSeenWelcome && Notification.permission === 'granted') {
    console.log('Programando notificación de bienvenida en 2 segundos...')
    // Esperar 2 segundos para que la página cargue completamente
    setTimeout(() => {
      console.log('Mostrando notificación de bienvenida...')
      showWelcomeNotification()
      localStorage.setItem('math-mass-welcome-shown', 'true')
    }, 2000)
  }
})
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
