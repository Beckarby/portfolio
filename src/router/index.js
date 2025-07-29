import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import { initAuthGuard } from './authGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true } // Protect this route
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true } // Only for non-authenticated users
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