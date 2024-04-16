import { createRouter, createWebHistory } from 'vue-router'
import MainBooking from '../views/MainBooking.vue'
import SlotPick from '@/views/SlotPick.vue'
import BookingView from '@/views/BookingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainBooking
    },
    {
      path: '/slot-pick',
      name: 'slotPick',
      component: SlotPick
    },
    {
      path: '/booking',
      name: 'booking',
      component: BookingView
    }
  ]
})

export default router
