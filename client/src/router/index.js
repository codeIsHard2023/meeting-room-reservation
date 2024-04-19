import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import SlotView from '@/views/SlotView.vue'
import BookingView from '@/views/BookingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/slot',
      name: 'slot',
      component: SlotView
    },
    {
      path: '/booking',
      name: 'booking',
      component: BookingView
    }
  ]
})

export default router
