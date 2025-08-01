import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import { initAuthGuard } from './authGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true } 
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true } 
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: { requiresGuest: true } // Only for non-authenticated users
    }
  ]
})

initAuthGuard(router)

export default router