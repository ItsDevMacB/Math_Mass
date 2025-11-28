# 🔔 Guía de Depuración - Notificaciones Push

## ✅ Verificación Rápida

### 1. Abrir la Consola del Navegador

Presiona `F12` o `Ctrl+Shift+I` y ve a la pestaña **Console**.

### 2. Verificar Soporte

Ejecuta en la consola:

```javascript
console.log('Soporte:', 'Notification' in window)
console.log('Permiso actual:', Notification.permission)
```

Deberías ver:

- `Soporte: true`
- `Permiso actual: "default"` (primera vez) o `"granted"` (si ya aceptaste)

### 3. Solicitar Permiso Manualmente

Si el permiso está en `"default"`, ejecuta:

```javascript
Notification.requestPermission().then((permission) => {
  console.log('Nuevo permiso:', permission)
})
```

### 4. Probar Notificación Directamente

```javascript
if (Notification.permission === 'granted') {
  new Notification('Prueba', {
    body: 'Esta es una notificación de prueba',
    icon: '/Math_Mass/icons/icon-192x192.png',
  })
}
```

## 🔍 Logs de la Aplicación

Cuando la aplicación se carga, deberías ver en la consola:

```
App montada - Verificando notificaciones...
Soporte de notificaciones: true
Permiso actual: default (o granted)
¿Ya vio bienvenida? null
Programando notificación de bienvenida en 2 segundos...
🔔 Verificando soporte de notificaciones...
✅ Notificaciones soportadas
📋 Permiso actual: default
🙋 Solicitando permiso al usuario...
📝 Respuesta del usuario: granted (o denied)
Mostrando notificación de bienvenida...
✅ Permiso ya otorgado
Notificación de bienvenida mostrada
```

## 🚨 Problemas Comunes

### Problema 1: No aparece el diálogo de permiso

**Causa:** El navegador bloquea notificaciones si no se solicitan desde una interacción del usuario.

**Solución:**

1. Limpia la bandera de bienvenida: `localStorage.removeItem('math-mass-welcome-shown')`
2. Recarga la página
3. Interactúa con la página (haz clic en cualquier lugar)
4. Espera 2 segundos

### Problema 2: Permiso denegado

**Causa:** El usuario negó el permiso anteriormente.

**Solución:**

1. Ve a la configuración del sitio (ícono de candado en la barra de direcciones)
2. Busca "Notificaciones"
3. Cambia a "Permitir"
4. Recarga la página

### Problema 3: No se ven las notificaciones

**Causa:** Windows está en modo "No molestar" o las notificaciones están deshabilitadas a nivel de sistema.

**Solución:**

1. Ve a Configuración de Windows > Sistema > Notificaciones
2. Asegúrate de que las notificaciones estén habilitadas
3. Busca tu navegador (Chrome/Edge) y verifica que pueda enviar notificaciones

### Problema 4: Iconos no cargan en producción

**Causa:** Las rutas de los iconos no son correctas para GitHub Pages.

**Solución:** Ya está implementado con `getIconUrl()` que usa `import.meta.env.BASE_URL`

## 🧪 Probar Notificaciones por Puntaje

Para probar las notificaciones de resultado, ejecuta en la consola:

```javascript
// Importar el composable manualmente o usar desde Vue DevTools
// Simular diferentes puntajes:

// 100% - Perfecto
showExamResultNotification(100)

// 90% - Aprobado
showExamResultNotification(90)

// 70% - No aprobado
showExamResultNotification(70)

// 40% - Necesitas mejorar
showExamResultNotification(40)

// 10% - Intenta de nuevo
showExamResultNotification(10)
```

## 📱 Probar en Móvil

1. Asegúrate de que el sitio esté en HTTPS (GitHub Pages ya lo tiene)
2. Instala la PWA usando el botón "Agregar a pantalla de inicio"
3. Abre la app instalada
4. Las notificaciones deberían funcionar como en desktop

## 🔧 Resetear Todo

Para empezar desde cero:

```javascript
// En la consola del navegador
localStorage.removeItem('math-mass-welcome-shown')
location.reload()
```

## 📞 ¿Aún no funciona?

Verifica:

1. ✅ El navegador es Chrome, Edge o Firefox (Safari tiene limitaciones)
2. ✅ El sitio está en HTTPS (no localhost HTTP simple)
3. ✅ No estás en modo incógnito (las notificaciones pueden estar bloqueadas)
4. ✅ El service worker está registrado correctamente

Para verificar el service worker:

1. Abre DevTools > Application > Service Workers
2. Debe aparecer "Math Mass Service Worker loaded"
