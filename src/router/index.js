import { createRouter, createWebHistory } from 'vue-router'

import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import Dashboard from '@/views/Dashboard.vue'
import Categories from '@/views/Categories.vue'
import Products from '@/views/Products.vue'
import CategoryCreate from '@/views/CategoryCreate.vue'
import ErrorDisplay from '@/views/ErrorDisplay.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  },

  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/category/create',
    name: 'CategoryCreate',
    component: CategoryCreate
  },
  {
    path: '/error/:error', 
    name: 'ErrorDisplay', 
    props: true,
    component: ErrorDisplay
  }
]

})

export default router
