// Script para limpiar caché y localStorage
// Ejecutar en la consola del navegador (F12)

// 1. Limpiar localStorage
console.log('Limpiando localStorage...');
localStorage.clear();

// 2. Limpiar Service Worker y caché
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('Service Worker desregistrado');
    }
  });
}

// 3. Limpiar todas las cachés
if ('caches' in window) {
  caches.keys().then(function(names) {
    for (let name of names) {
      caches.delete(name);
      console.log('Caché eliminada: ' + name);
    }
  });
}

console.log('Limpieza completada. Por favor recarga la página (Ctrl+Shift+R para recarga forzada)');
