import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import Forbidden from '@/views/Forbidden.vue'
import AdminView from '@/views/AdminView.vue'
import LoginView from '@/views/LoginView.vue'

import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: Forbidden,
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFound, 
    },
  ],
})

router.beforeEach( (to)=>{
  console.log('beforeEach')
  const user = useUserStore()
  
  
  if(to.name !=='login' && user.isCookieHasExpired()){
    return { name: 'login' }
  }
  user.fetchPersonalUserData()
  


  if(to.name ==='login' && !user.isCookieHasExpired()){
    return { name: 'home' }
  }

  if(to.name ==='admin' && !user.isAdminPerson()){
    return {name: 'forbidden'}
  }
  
})

export default router
