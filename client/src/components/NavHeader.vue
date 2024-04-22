<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useReservationsStore } from '@/stores/ReservationsStore'
import chevronLeft from '@/assets/icons/chevronLeft.svg'
import homeIcon from '@/assets/icons/homeIcon.svg'

const { selectedDate, selectedRoom } = storeToRefs(useReservationsStore())
const { fetchReservations } = useReservationsStore()

const router = useRouter()

const navigateToPreviousView = () => {
  const previousRoute = router.currentRoute.value.from
  if (previousRoute === '/slot') {
    router.push('/')
  } else {
    router.push('/slot')
    fetchData()
  }
}

const fetchData = async () => {
  // Call fetchReservations for data reloading
  try {
    await fetchReservations(selectedRoom.value, selectedDate.value)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <header class="header">
    <img :src="chevronLeft" alt="click to go back" @click="navigateToPreviousView" />
    <router-link to="/"><img :src="homeIcon" alt="click to go home" /></router-link>
  </header>
</template>

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
