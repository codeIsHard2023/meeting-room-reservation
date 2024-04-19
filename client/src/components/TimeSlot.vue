<script setup>
import { storeToRefs } from 'pinia'
import { useDefaultTimeStore } from '@/stores/DefaultTimeStore'
import { useSlotStore } from '@/stores/SlotStore'
import { ref } from 'vue'

const { timeSlots } = storeToRefs(useDefaultTimeStore())
const { selectedRoom, selectedDate, bookedSlots, loading, error } = storeToRefs(useSlotStore())

const { fetchReservations } = useSlotStore()

fetchReservations(selectedRoom.value, selectedDate.value)
console.log(loading.value)
console.log(error)

const morningSlots = ref(timeSlots.value.AM.map((slot) => ({ ...slot, booked: false })))
const afternoonSlots = ref(timeSlots.value.PM.map((slot) => ({ ...slot, booked: false })))

bookedSlots.value.forEach((slot) => {
  let morgning = { startIndex: -1, endIndex: -1 }
  let afternoon = { startIndex: -1, endIndex: -1 }
  console.log(slot)
  // Trouver l'index de début et de fin du créneau horaire réservé
  morningSlots.value.forEach((morningSlot, index) => {
    if (slot.start === morningSlot.start) {
      morgning.startIndex = index
      console.log('morning start :', morgning.startIndex)
    }
    if (slot.end === morningSlot.end) {
      morgning.endIndex = index
      console.log('morning end :', morgning.endIndex)
    }
  })

  afternoonSlots.value.forEach((afternoonSlot, index) => {
    if (slot.start === afternoonSlot.start) {
      afternoon.startIndex = index
      console.log('afternoon start :', afternoon.startIndex)
    }
    if (slot.end === afternoonSlot.end) {
      afternoon.endIndex = index
      console.log('afternoon end :', afternoon.endIndex)
    }
  })

  // Désactiver tous les créneaux horaires correspondants
  if (morgning.startIndex !== -1 && morgning.endIndex !== -1) {
    for (let i = morgning.startIndex; i <= morgning.endIndex; i++) {
      morningSlots.value[i].booked = true
    }
  } else if (afternoon.startIndex !== -1 && afternoon.endIndex !== -1) {
    for (let i = afternoon.startIndex; i <= afternoon.endIndex; i++) {
      afternoonSlots.value[i].booked = true
      console.log(afternoonSlots.value[i])
    }
  }
})
</script>

<template>
  <div class="slotsContainer">
    <div class="timeSlots">
      <p v-if="loading">{{ loading }}</p>
      <h2>Matin</h2>
      <div
        v-for="slot in morningSlots"
        :key="slot.start"
        class="slot"
        :class="{ booked: slot.booked }"
      >
        {{ slot.start }} - {{ slot.end }}
      </div>
    </div>
    <div class="timeSlots">
      <h2>Après-midi</h2>
      <div
        v-for="slot in afternoonSlots"
        :key="slot.start"
        class="slot"
        :class="{ booked: slot.booked }"
      >
        {{ slot.start }} - {{ slot.end }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.slotsContainer {
  padding: calc(var(--padding) * 2);
  margin-block: calc(var(--margin) * 3);
  display: flex;
  gap: 10px;
  background-color: #425b7610;
  border-radius: 12px;
}
.timeSlots {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.slot {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--padding);
  width: 160px;
  height: 56px;
  border-radius: 8px;
  background-color: var(--button-bcg);
  color: var(--light-text);
}
.slot:hover {
  background-color: #425b7670;
  cursor: pointer;
}
.slot.booked {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
