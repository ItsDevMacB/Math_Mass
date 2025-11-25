/// <reference lib="webworker" />
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

declare const self: ServiceWorkerGlobalScope

// Limpia cachés antiguas
cleanupOutdatedCaches()

// Precachea archivos inyectados por Vite PWA
precacheAndRoute(self.__WB_MANIFEST)

// Ruta de navegación para SPA
const navigationRoute = new NavigationRoute(
  new StaleWhileRevalidate({
    cacheName: 'navigations',
  }),
  {
    // Excluye URLs que empiezan con estos patrones
    denylist: [/^\/api\//, /\.json$/, /\.map$/],
  },
)
registerRoute(navigationRoute)

// Cache para archivos estáticos (CSS, JS, imágenes)
registerRoute(
  ({ request }) => {
    return (
      request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image'
    )
  },
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  }),
)

// Cache para fuentes
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
)

registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
    ],
  }),
)

// Manejo de instalación
self.addEventListener('install', () => {
  console.log('Service Worker installing...')
})

// Manejo de activación
self.addEventListener('activate', () => {
  console.log('Service Worker activated')
})

// Manejo de mensajes desde el cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

console.log('Math Mass Service Worker loaded')
