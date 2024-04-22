<script setup>
import { storeToRefs } from 'pinia'
import { useReservationsStore } from '@/stores/ReservationsStore'
import { ref, watch } from 'vue'
import NavHeader from '@/components/NavHeader.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import TimeSlots from './TimeSlots.vue'

const { timeSlots, newChoice, selectedRoom, selectedDate, loading } =
  storeToRefs(useReservationsStore())
const { fetchReservations, resetTimeSlots } = useReservationsStore()

const buttonText = ref('Choisissez le début et la fin de créneau')
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
  const userDate = new Date(date)
  const year = userDate.getFullYear()
  const month = String(userDate.getMonth() + 1).padStart(2, '0')
  const day = String(userDate.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  selectedDate.value = formattedDate
  newChoice.value.date = formattedDate

  if (selectedRoom.value && selectedDate.value) {
    // ResetTimeSlots function reset timeSlots to default booked state
    resetTimeSlots()

    // Fetch reservations
    fetchReservations(selectedRoom.value, selectedDate.value)
  }
}
const displayDate = ref(newChoice.value.date)
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  return new Intl.DateTimeFormat('fr-FR', options).format(date)
}

watch(
  [
    () => newChoice.value.start,
    () => newChoice.value.end,
    () => newChoice.value.date,
    newChoice.value.roomName
  ],
  ([newStart, newEnd, newDate]) => {
    if (newStart && newEnd) {
      buttonText.value = 'Passer à la réservation'
    } else {
      buttonText.value = 'Choisissez le début et la fin du créneau'
    }
    displayDate.value = formatDate(newDate)
  }
)
</script>

<template>
  <main id="timeSlotSelection">
    <NavHeader />
    <h2>Choisissez une date ici</h2>
    <VueDatePicker
      v-model="pickedDate"
      @update:modelValue="handleDateChange"
      :enable-time-picker="false"
      class="vueDatePicker"
    ></VueDatePicker>
    <p v-if="pickedDate && isPastDate(pickedDate)" class="alertMessage">
      La date {{ displayDate }} est déjà passée. Veuillez choisir une date future.
    </p>
    <p v-else-if="displayDate || newChoice.date">Vous avez choisie le {{ displayDate }}</p>

    <p v-if="loading">Chargement...</p>
    <TimeSlots
      v-if="(pickedDate && !isPastDate(pickedDate)) || (newChoice.date && newChoice.roomName)"
      :timeSlots="timeSlots"
    />
    <button
      :disabled="!newChoice.start && !newChoice.end"
      type="button"
      class="validateSlot"
      @click="navigateToBookingView"
    >
      {{ buttonText }}
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

.vueDatePicker {
  width: 83%;
  margin-bottom: 2rem;
}
.alertMessage {
  width: 83%;
  margin-bottom: 1rem;
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
.validateSlot:hover {
  background-color: #425b76d4;
}
</style>
