<template>
  <header class="header">
    <img
      :src="chevronLeft"
      alt="click to go back"
      @click="
        () => {
          navigateToPreviousView()
          isFormSubmission()
        }
      "
    />
    <router-link to="/"
      ><img :src="homeIcon" alt="click to go home" @click="resetReservationStates()"
    /></router-link>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useReservationsStore } from '@/stores/ReservationsStore'
import { useRouter } from 'vue-router'
import chevronLeft from '@/assets/icons/chevronLeft.svg'
import homeIcon from '@/assets/icons/homeIcon.svg'

const { reservation } = storeToRefs(useReservationsStore())
const { fetchReservations } = useReservationsStore()

const router = useRouter()
const currentRoute = router.currentRoute.value.fullPath

const resetReservationStates = () => {
  for (const key in reservation.value) {
    reservation.value[key] = null
  }
}

const navigateToPreviousView = () => {
  if (currentRoute === '/slot') {
    router.push('/')
    resetReservationStates()
  } else {
    router.push('/slot')
    reservation.value.date = null
    reservation.value.start = null
    reservation.value.end = null
  }
}

const isFormSubmission = () => {
  if (currentRoute === '/booking') {
    fetchReservations(reservation.value.roomName, reservation.value.date)
  }
}
</script>

<style scoped>
.header {
  width: 80%;
  margin-block: calc(var(--margin) * 2);
  display: flex;
  justify-content: space-between;
}
.header img {
  width: 34px;
  height: 34px;
  cursor: pointer;
}
.header a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
}
.header a:last-child img {
  width: 34px;
  height: 34px;
  filter: invert(31%) sepia(6%) saturate(3307%) hue-rotate(171deg) brightness(98%) contrast(82%);
}
</style>
