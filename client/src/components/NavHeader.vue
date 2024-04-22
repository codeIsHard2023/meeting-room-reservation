<script setup>
import { useReservationsStore } from '@/stores/ReservationsStore'
import chevronLeft from '@/assets/icons/chevronLeft.svg'
import homeIcon from '@/assets/icons/homeIcon.svg'
import { storeToRefs } from 'pinia'

const { selectedDate, selectedRoom } = storeToRefs(useReservationsStore())
const { fetchReservations } = useReservationsStore()

const fetchData = async () => {
  // Appeler fetchReservations avec les paramètres appropriés
  await fetchReservations(selectedRoom, selectedDate)
}
</script>
<template>
  <header class="header">
    <RouterLink to="/slot" @click="fetchData"
      ><img :src="chevronLeft" alt="click to go back" />
    </RouterLink>
    <RouterLink to="/"><img :src="homeIcon" alt="click to go home" /> </RouterLink>
  </header>
</template>

<style scoped>
.header {
  width: 80%;
  margin-block: calc(var(--margin) * 2);
  display: flex;
  justify-content: space-between;
}
.header a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
}
.header a:first-child {
  background-color: var(--button-bcg);
  place-content: center;
  border-radius: 8px;
}
.header a:first-child img {
  width: 24px;
  height: 24px;
  filter: invert(100%) sepia(0%) saturate(1393%) hue-rotate(174deg) brightness(108%) contrast(102%);
}
.header a:last-child img {
  width: 34px;
  height: 34px;
  filter: invert(31%) sepia(6%) saturate(3307%) hue-rotate(171deg) brightness(98%) contrast(82%);
}
</style>
