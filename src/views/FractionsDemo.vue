<template>
  <div class="fractions-demo">
    <div class="demo-container">
      <!-- Breadcrumb -->
      <div style="padding-top: var(--spacing-lg)">
        <BreadcrumbNav :items="breadcrumbs" />
      </div>

      <!-- Header -->
      <header class="demo-header">
        <h1>🎨 Demostración de Fracciones</h1>
        <p>Prueba el visualizador interactivo de fracciones</p>
      </header>

      <!-- Controles -->
      <div class="controls-section">
        <h2>⚙️ Controles</h2>

        <div class="controls-grid">
          <div class="control-group">
            <label for="numerador">Numerador:</label>
            <input
              id="numerador"
              v-model.number="numerador"
              type="number"
              min="1"
              max="50"
              class="control-input"
            />
          </div>

          <div class="control-group">
            <label for="denominador">Denominador:</label>
            <input
              id="denominador"
              v-model.number="denominador"
              type="number"
              min="1"
              max="20"
              class="control-input"
            />
          </div>
        </div>

        <!-- Botones rápidos -->
        <div class="quick-buttons">
          <button @click="setFraction(1, 2)" class="quick-btn">1/2</button>
          <button @click="setFraction(3, 4)" class="quick-btn">3/4</button>
          <button @click="setFraction(5, 8)" class="quick-btn">5/8</button>
          <button @click="setFraction(7, 4)" class="quick-btn">7/4</button>
          <button @click="setFraction(11, 3)" class="quick-btn">11/3</button>
          <button @click="randomFraction" class="quick-btn random">🎲 Aleatorio</button>
        </div>
      </div>

      <!-- Visualizador de Fracciones -->
      <div class="visualizer-section">
        <h2>📊 Visualización</h2>
        <FractionVisualizer
          :numerador="numerador"
          :denominador="denominador"
          :show-controls="true"
          :show-info="true"
        />
      </div>

      <!-- Display matemático -->
      <div class="display-section">
        <h2>🔢 Representación Matemática</h2>
        <div class="display-showcase">
          <div class="display-item">
            <h3>Normal</h3>
            <FractionDisplay :numerador="numerador" :denominador="denominador" size="normal" />
          </div>

          <div class="display-item">
            <h3>Grande</h3>
            <FractionDisplay :numerador="numerador" :denominador="denominador" size="large" />
          </div>

          <div class="display-item">
            <h3>Pequeña</h3>
            <FractionDisplay :numerador="numerador" :denominador="denominador" size="small" />
          </div>

          <div v-if="numeroMixto.esMixto" class="display-item">
            <h3>Número Mixto</h3>
            <FractionDisplay
              :entero="numeroMixto.entero"
              :numerador="numeroMixto.numerador"
              :denominador="numeroMixto.denominador"
              size="normal"
            />
          </div>
        </div>
      </div>

      <!-- Información de conversiones -->
      <div class="conversions-section">
        <h2>🔄 Conversiones</h2>
        <div class="conversions-grid">
          <div class="conversion-card">
            <h3>Decimal</h3>
            <p class="conversion-value">{{ conversionDecimal.texto }}</p>
            <span class="conversion-tag">{{
              conversionDecimal.esFinito ? 'Finito' : 'Periódico'
            }}</span>
          </div>

          <div class="conversion-card">
            <h3>Simplificada</h3>
            <p class="conversion-value">{{ conversionSimplificada.texto }}</p>
            <span v-if="!conversionSimplificada.yaSimplificada" class="conversion-tag success">
              MCD: {{ conversionSimplificada.factorSimplificacion }}
            </span>
            <span v-else class="conversion-tag">Ya simplificada</span>
          </div>

          <div class="conversion-card">
            <h3>Tipo</h3>
            <p class="conversion-value">{{ tipoFraccion.tipo }}</p>
            <span class="conversion-tag">{{ tipoFraccion.descripcion }}</span>
          </div>

          <div v-if="numeroMixto.esMixto" class="conversion-card">
            <h3>Número Mixto</h3>
            <p class="conversion-value">{{ numeroMixto.texto }}</p>
            <span class="conversion-tag success">{{ numeroMixto.entero }} enteros</span>
          </div>
        </div>
      </div>

      <!-- Ejemplos de ejercicios -->
      <div class="exercises-section">
        <h2>📝 Ejemplos de Ejercicios</h2>
        <button @click="generateExercises" class="generate-btn">Generar Ejercicios</button>

        <div v-if="ejercicios.length > 0" class="exercises-list">
          <div v-for="(ejercicio, idx) in ejercicios" :key="ejercicio.id" class="exercise-card">
            <div class="exercise-header">
              <span class="exercise-number">{{ idx + 1 }}</span>
              <span class="exercise-type">{{ ejercicio.tipo }}</span>
            </div>
            <p class="exercise-question">{{ ejercicio.pregunta }}</p>
            <div class="exercise-options">
              <button
                v-for="(opcion, oIdx) in ejercicio.opciones"
                :key="oIdx"
                class="exercise-option"
                :class="{ correct: opcion === ejercicio.correcta }"
                @click="showExplanation(idx)"
              >
                {{ opcion }}
              </button>
            </div>
            <div v-if="showExplanations[idx]" class="exercise-explanation">
              💡 {{ ejercicio.explicacion }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import FractionVisualizer from '@/components/FractionVisualizer.vue'
import FractionDisplay from '@/components/FractionDisplay.vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import { FractionConverter } from '@/services/FractionConverter'
import { FractionExerciseGenerator } from '@/services/FractionExerciseGenerator'
import { random } from '@/utils/mathUtils'
import type { ExerciseQuestion } from '@/services/FractionExerciseGenerator'

const breadcrumbs = [
  { label: 'Inicio', path: '/' },
  { label: 'Lecciones', path: '/' },
  { label: 'Demostración de Fracciones' },
]

const numerador = ref(3)
const denominador = ref(4)
const ejercicios = ref<ExerciseQuestion[]>([])
const showExplanations = reactive<Record<number, boolean>>({})

const numeroMixto = computed(() => {
  return FractionConverter.toMixedNumber(numerador.value, denominador.value)
})

const conversionDecimal = computed(() => {
  return FractionConverter.toDecimal(numerador.value, denominador.value)
})

const conversionSimplificada = computed(() => {
  return FractionConverter.simplify(numerador.value, denominador.value)
})

const tipoFraccion = computed(() => {
  return FractionConverter.identifyType(numerador.value, denominador.value)
})

function setFraction(num: number, den: number) {
  numerador.value = num
  denominador.value = den
}

function randomFraction() {
  numerador.value = random(1, 20)
  denominador.value = random(2, 12)
}

function generateExercises() {
  ejercicios.value = FractionExerciseGenerator.generateExerciseBatch({
    cantidad: 5,
    nivel: 'medio',
    tipos: ['impropia-a-mixto', 'mixto-a-impropia', 'simplificar', 'identificar-tipo'],
    mezclarPreguntas: true,
  })

  // Reset explanations
  Object.keys(showExplanations).forEach((key) => {
    delete showExplanations[Number(key)]
  })
}

function showExplanation(index: number) {
  showExplanations[index] = !showExplanations[index]
}
</script>

<style scoped>
.fractions-demo {
  min-height: 100vh;
  background: var(--color-background);
  padding: 20px;
}

.demo-container {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-header {
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: #f1f5f9;
  color: #64748b;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #e2e8f0;
  transform: translateX(-5px);
}

.demo-header h1 {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 10px;
}

.demo-header p {
  color: #64748b;
  font-size: 1.1rem;
}

.controls-section,
.visualizer-section,
.display-section,
.conversions-section,
.exercises-section {
  background: white;
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 20px;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-weight: 600;
  color: #64748b;
}

.control-input {
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.control-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.quick-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.quick-btn {
  padding: 10px 20px;
  background: #f1f5f9;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-btn:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

.quick-btn.random {
  background: var(--color-academic-yellow);
  color: white;
}

.display-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.display-item {
  background: #f8fafc;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
}

.display-item h3 {
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 15px;
}

.conversions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.conversion-card {
  background: #f8fafc;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
}

.conversion-card h3 {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 10px;
}

.conversion-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e293b;
  margin: 10px 0;
}

.conversion-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #e2e8f0;
  color: #64748b;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.conversion-tag.success {
  background: var(--color-success-green);
  color: white;
}

.generate-btn {
  padding: 15px 30px;
  background: var(--color-sep-blue);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-base);
  box-shadow: var(--shadow-md);
}

.generate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.exercises-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.exercise-card {
  background: #f8fafc;
  padding: 20px;
  border-radius: 15px;
}

.exercise-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.exercise-number {
  width: 35px;
  height: 35px;
  background: var(--color-sep-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.exercise-type {
  padding: 4px 12px;
  background: #e2e8f0;
  color: #64748b;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.exercise-question {
  font-size: 1.1rem;
  color: #1e293b;
  margin-bottom: 15px;
  font-weight: 500;
}

.exercise-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 10px;
}

.exercise-option {
  padding: 12px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.exercise-option:hover {
  border-color: #6366f1;
  transform: translateY(-2px);
}

.exercise-option.correct {
  border-color: #10b981;
  background: #f0fdf4;
}

.exercise-explanation {
  margin-top: 15px;
  padding: 15px;
  background: var(--color-gray-50);
  border-left: 4px solid var(--color-academic-yellow);
  border-radius: var(--radius-md);
  color: var(--color-gray-800);
  font-weight: 500;
}

@media (max-width: 768px) {
  .demo-header {
    padding: 30px 20px;
  }

  .demo-header h1 {
    font-size: 2rem;
  }

  .back-button {
    position: static;
    display: inline-block;
    margin-bottom: 20px;
  }

  .display-showcase {
    grid-template-columns: 1fr;
  }
}
</style>
