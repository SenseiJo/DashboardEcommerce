import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/dashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'customer',
      component: () => import('@/views/customerView.vue'),
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import('@/views/employeesView.vue'), // Composant pour /employees
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/ordersView.vue'), // Composant pour /orders
    },
  ],
})

export default router
