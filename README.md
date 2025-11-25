# Math Mass - Ejercicios de Matemática 📐

Generador interactivo de ejercicios matemáticos con soporte PWA (Progressive Web App), sincronización offline y estadísticas de desempeño.

## Características ✨

- ✅ **Generación ilimitada de ejercicios** - Crea ejercicios de suma, resta, multiplicación y división
- ✅ **Tres niveles de dificultad** - Fácil, Medio y Difícil
- ✅ **Reproducibilidad** - Usa semillas (seedrandom) para reproducir los mismos ejercicios
- ✅ **Sincronización offline** - Funciona sin conexión a internet (PWA + Service Worker)
- ✅ **Persistencia de datos** - Guarda ejercicios en IndexedDB
- ✅ **Estadísticas** - Accuracidad, progreso y más métricas
- ✅ **Interfaz moderna** - Diseño responsive con Tailwind CSS v4
- ✅ **TypeScript** - Código completamente tipado

## Stack Tecnológico 🛠️

- **Frontend Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Pinia
- **Database**: IndexedDB
- **PWA**: vite-plugin-pwa + Workbox
- **Testing**: Vitest
- **Linting**: ESLint + Prettier

## Requisitos previos 📋

- Node.js ≥ 20.19.0 o ≥ 22.12.0
- npm (incluido con Node.js)

## Instalación 🚀

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd Math_Mass
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Crea un archivo `.env.local` (opcional)**
   ```bash
   cp .env.example .env.local
   ```

## Uso 📖

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

### Preview de la build

```bash
npm run preview
```

### Ejecutar tests

```bash
npm run test:unit
```

### Linting y formato

```bash
npm run lint        # ESLint
npm run format      # Prettier
```

## Estructura del proyecto 📁

```
src/
├── components/
│   └── exercise/          # Componentes de ejercicios
│       ├── ExerciseDisplay.vue       # Mostrar ejercicio
│       └── ExerciseGenerator.vue     # Generar ejercicios
├── composables/           # Composables reutilizables
│   └── useIndexedDB.ts    # Manejo de IndexedDB
├── services/              # Lógica de negocio
│   ├── ExerciseGenerator.ts   # Generador de ejercicios
│   └── api.ts                 # Llamadas a API
├── stores/                # Pinia stores
│   └── exerciseStore.ts   # Estado global
├── types/                 # Tipos TypeScript
│   ├── Exercise.ts
│   └── index.ts
├── views/                 # Vistas principales
│   ├── HomeView.vue
│   ├── GenerateView.vue
│   └── ExerciseView.vue
├── router/                # Vue Router
│   └── index.ts
├── assets/                # Estilos y recursos
├── App.vue                # Componente raíz
├── main.ts                # Punto de entrada
└── service-worker.ts      # Service Worker para PWA

public/
├── manifest.json          # Metadatos PWA
├── icons/                 # Iconos PWA
│   ├── icon-48x48.png
│   ├── icon-72x72.png
│   ├── icon-192x192.png
│   └── icon-512x512.png
└── favicon.ico
```

## API Reference 📚

### ExerciseGenerator

```typescript
import { ExerciseGenerator } from '@/services/ExerciseGenerator'

const generator = new ExerciseGenerator(seed?: number)
const exercises = generator.generateExercises(count, difficulty)
```

### useIndexedDB

```typescript
const {
  saveExercise,
  saveExercises,
  getExercise,
  getExercises,
  saveSession,
  getSession,
  getSessions,
  deleteExercise,
  clearExercises
} = useIndexedDB()
```

### useExerciseStore

```typescript
import { useExerciseStore } from '@/stores/exerciseStore'

const exerciseStore = useExerciseStore()

// Propiedades
exerciseStore.exercises          // Array de ejercicios
exerciseStore.currentExercise    // Ejercicio actual
exerciseStore.accuracy           // Precisión (%)
exerciseStore.progressPercentage // Progreso (%)

// Métodos
exerciseStore.initializeSession(sessionId, exercises)
exerciseStore.submitAnswer(answer)
exerciseStore.nextExercise()
exerciseStore.previousExercise()
```

## Variables de entorno 🔐

```
VITE_API_URL=http://localhost:3000
VITE_API_GENERATE_ENDPOINT=/api/generate
VITE_PWA_ENABLED=true
```

## Rutas disponibles 🗺️

- `/` - Página de inicio
- `/generate` - Generador de ejercicios
- `/exercise` - Resolver ejercicios
- `/about` - Acerca de

## Instalación como PWA 📱

### En navegadores de escritorio:
1. Abre DevTools (F12)
2. Ve a Application → Manifest
3. Haz clic en "Install" o busca el símbolo de instalación en la barra de dirección

### En dispositivos móviles:
1. Abre la app en el navegador
2. Toca el menú (⋮) → "Instalar app"
3. ¡Listo! Se instalará como una app nativa

## Características PWA 🌐

- ✅ Funciona offline
- ✅ Instalable como app
- ✅ Sincronización en segundo plano
- ✅ Push notifications (preparado para futuro)
- ✅ Cachés inteligentes

## Contribución 🤝

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia 📄

Este proyecto está bajo la licencia MIT.

## Autor 👨‍💻

Desarrollado como parte del programa Progressive Web Apps de UTP.

## Changelog 📝

### v0.1.0 (Inicial)
- Setup inicial con Vue 3 + TypeScript + Vite
- Generador de ejercicios matemáticos
- Persistencia con IndexedDB
- PWA completa con Service Worker
- UI con Tailwind CSS
