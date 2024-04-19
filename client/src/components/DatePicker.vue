<script setup>
import { defineProps, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSlotStore } from '@/stores/SlotStore'
import NavHeader from '@/components/NavHeader.vue'
import TimeSlot from '@/components/TimeSlot.vue'
import TestComponent from '@/components/TestComponent.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useTestStore } from '@/stores/TestStore'

// const { selectedRoom, selectedDate, bookedSlots, loading, error } = storeToRefs(useSlotStore())
// const { setSelectedDate, fetchReservations } = useSlotStore()

const { timeSlots, selectedRoom, selectedDate, loading, error } = storeToRefs(useTestStore())
const { setSelectedDate, fetchReservations } = useTestStore()

const props = defineProps({
  navigateToBookingView: {
    type: Function,
    required: true
  }
})
const pickedDate = ref(null)

// Here we check if selected date is not passed
const isPastDate = (selectedDate) => {
  if (!selectedDate || !selectedDate.value) {
    return false
  }
  const today = new Date()
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const selectedDateWithoutTime = new Date(
    selectedDate.value.getFullYear(),
    selectedDate.value.getMonth(),
    selectedDate.value.getDate()
  )
  return selectedDateWithoutTime < todayWithoutTime
}

const handleDateChange = (date) => {
  // pickedDate.value = date
  setSelectedDate(date)

  if (selectedRoom.value !== null) {
    if (selectedRoom.value && selectedDate.value) {
      fetchReservations(selectedRoom.value, selectedDate.value)
    }
  }
}
watch(selectedDate, (newValue) => {
  console.log(newValue)
  if (selectedRoom.value && selectedDate.value) {
    fetchReservations(selectedRoom.value, selectedDate.value)
  }
})
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
    <!-- <TimeSlot v-if="pickedDate && !isPastDate(selectedDate)" :timeSlots="timeSlots" /> -->
    <TestComponent v-if="pickedDate && !isPastDate(selectedDate)" :timeSlots="timeSlots" />
    <button type="button" class="validateSlot" @click="props.navigateToBookingView">
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
