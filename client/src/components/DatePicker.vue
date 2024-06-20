<script setup>
import { storeToRefs } from 'pinia'
import { useReservationsStore } from '@/stores/ReservationsStore'
import { ref, watch } from 'vue'
import NavHeader from '@/components/NavHeader.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import TimeSlots from './TimeSlots.vue'

const { timeSlots, reservation, selectedDate, loading } = storeToRefs(useReservationsStore())
const { resetTimeSlots, fetchReservations } = useReservationsStore()

const buttonText = ref('Choisissez le début et la fin de créneau')
const props = defineProps({
  navigateToBookingView: {
    type: Function,
    required: true
  }
})

// Here we check if selected date is not passed
const isPassedDate = (pickedDate) => {
  // Here we define today date
  const today = new Date()
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  // Here we transform picked date
  const selectedDateWithoutTime = new Date(
    pickedDate.getFullYear(),
    pickedDate.getMonth(),
    pickedDate.getDate()
  )
  return selectedDateWithoutTime < todayWithoutTime
}
// Here we set new selected date
const handleDateChange = (date) => {
  selectedDate.value = formattedDate(date)
  reservation.value.date = formattedDate(date)
  reservation.value.start = null
  reservation.value.end = null

  if (reservation.value.date && reservation.value.date) {
    // ResetTimeSlots function reset timeSlots to default booked state
    resetTimeSlots()

    // Fetch reservations
    fetchReservations(reservation.value.roomName, reservation.value.date)
  }
}

// Transforming "2024/06/06" in "6 june 2024"
const formatDisplayDate = (date) => {
  if (!date) {
    return 'Choisissez la date de réservation souhaitée'
  } else {
    const chosedDate = new Date(date)
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    return new Intl.DateTimeFormat('fr-FR', options).format(chosedDate)
  }
}

const displayDate = ref(formatDisplayDate(reservation.value.date))

// Formate picked date in 'year-month-day' ==> to be send to backend
const formattedDate = (pickedDate) => {
  const userDate = new Date(pickedDate)
  const year = String(userDate.getFullYear())
  const month = String(userDate.getMonth() + 1).padStart(2, '0')
  const day = String(userDate.getDate()).padStart(2, '0')
  const result = `${year}-${month}-${day}`

  return result
}

watch(
  [
    () => reservation.value.start,
    () => reservation.value.end,
    () => reservation.value.date,
    reservation.value.roomName
  ],
  ([newStart, newEnd, newDate]) => {
    if (newStart && newEnd && isPassedDate) {
      buttonText.value = 'Passer à la réservation'
    } else {
      buttonText.value = 'Choisissez le début et la fin du créneau'
    }
    displayDate.value = formatDisplayDate(newDate)
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
    <p v-if="pickedDate && isPassedDate(pickedDate)" class="alertMessage">
      La date {{ displayDate }} est déjà passée. Veuillez choisir une date future.
    </p>
    <p v-else-if="reservation.date">Vous avez choisie le {{ displayDate }}</p>

    <p v-if="loading">Attendez nous vérifions les créneaux disponibles...</p>
    <TimeSlots
      v-if="(pickedDate && !isPassedDate(pickedDate)) || (reservation.date && reservation.roomName)"
      :timeSlots="timeSlots"
      :isPassedDate="isPassedDate"
    />
    <button
      :disabled="isPassedDate && !reservation.start && !reservation.end"
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
