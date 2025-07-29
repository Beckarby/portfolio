import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

export const initAuthGuard = (router) => {
  router.beforeEach(async (to, from, next) => {
    // Check auth state
    const user = await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe() // Stop listening after first check
        resolve(user)
      })
    })

    // Route requires authentication but user is not logged in
    if (to.matched.some(record => record.meta.requiresAuth) && !user) {
      next('/login')
    } 
    // Route requires guest but user is logged in
    else if (to.matched.some(record => record.meta.requiresGuest) && user) {
      next('/dashboard')
    } 
    // Otherwise proceed
    else {
      next()
    }
  })
}