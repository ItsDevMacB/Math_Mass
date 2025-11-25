import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GenerateView from '../views/GenerateView.vue'
import ExerciseView from '../views/ExerciseView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/generate',
      name: 'generate',
      component: GenerateView,
    },
    {
      path: '/exercise',
      name: 'exercise',
      component: ExerciseView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/demo/fractions',
      name: 'fractions-demo',
      component: () => import('../views/FractionsDemo.vue'),
    },
    {
      path: '/demo/definitions',
      name: 'definitions-demo',
      component: () => import('../views/DefinitionsDemo.vue'),
    },
  ],
})

export default router
