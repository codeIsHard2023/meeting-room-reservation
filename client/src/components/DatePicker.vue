<script setup>
import { storeToRefs } from 'pinia'
import { useReservations } from '@/stores/ReservationsStore'
import NavHeader from '@/components/NavHeader.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import TimeSlots from './TimeSlots.vue'

const { timeSlots, selectedRoom, selectedDate, loading } = storeToRefs(useReservations())
const { fetchReservations, resetTimeSlots } = useReservations()

const props = defineProps({
  navigateToBookingView: {
    type: Function,
    required: true
  }
})

// Here we check if selected date is not passed
const isPastDate = (pickedDate) => {
  selectedDate.value = pickedDate

  // Here we define today date
  const today = new Date()
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  // Here we transform picked date
  const selectedDateWithoutTime = new Date(
    selectedDate.value.getFullYear(),
    selectedDate.value.getMonth(),
    selectedDate.value.getDate()
  )
  return selectedDateWithoutTime < todayWithoutTime
}

// Here we set new selected date and fetch corresponding data
const handleDateChange = (date) => {
  selectedDate.value = date

  if (selectedRoom.value && selectedDate.value) {
    // ResetTimeSlots function reset timeSlots to default booked state
    resetTimeSlots()

    // Fetch reservations in funciton of selected meeting room and selected date
    fetchReservations(selectedRoom.value, selectedDate.value)
  }
}
</script>

<template>
  <main id="timeSlotSelection">
    <NavHeader />
    <h2>Choisissez une date</h2>
    <VueDatePicker
      v-model="pickedDate"
      @update:modelValue="handleDateChange"
      :enable-time-picker="false"
      class="vueDatePicker"
    ></VueDatePicker>
    <div v-if="pickedDate && isPastDate(pickedDate)" class="alertMessage">
      La date sélectionnée est déjà passée. Veuillez choisir une date future.
    </div>
    <p v-if="loading">Chargement...</p>
    <TimeSlots v-if="pickedDate && !isPastDate(pickedDate)" :timeSlots="timeSlots" />
    <button type="button" class="validateSlot" @click="navigateToBookingView">
      Passer à la reservation
    </button>
  </main>
</template>

<style scoped>
#timeSlotSelection {
  margin-inline: calc(var(--margin) * 3);
  padding-top: calc(var(--padding) * 3);
  width: clamp(250px, 500px, 660px);
  background-color: var(--form-bcg);
  border-radius: 16px;
  filter: drop-shadow(var(--shadow));
  display: flex;
  flex-direction: column;
  align-items: center;
}
.validateSlot {
  width: 100%;
  height: 70px;
  border-end-start-radius: 16px;
  border-end-end-radius: 16px;
  border: none;
  background-color: var(--button-bcg);
  color: var(--light-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--text-size) * 2.5);
}
.vueDatePicker {
  width: 83%;
  margin-bottom: 2rem;
}
.alertMessage {
  width: 83%;
  margin-bottom: 1rem;
}
</style>
