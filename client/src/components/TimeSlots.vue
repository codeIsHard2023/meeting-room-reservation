<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useReservationsStore } from '@/stores/ReservationsStore'

// Test props in vue 3
const props = defineProps(['timeSlots'])
const { timeSlots, newChoice } = storeToRefs(useReservationsStore())
const selectedSlots = ref([])

// Called when time slot selected or unselected
const handleSlotSelect = (slot) => {
  if (!slot.booked) {
    const index = selectedSlots.value.findIndex((s) => s.start === slot.start && s.end === slot.end)
    if (index === -1) {
      // Slot is not selected, select it
      selectedSlots.value.push(slot)
    } else {
      // Slot is already selected, deselect it
      selectedSlots.value.splice(index, 1)
    }
    updateNewChoice()
  }
}

// Checks if time slot is a first selected
const isFirstSelected = (slot) => {
  return (
    selectedSlots.value.length > 0 &&
    selectedSlots.value[0].start === slot.start &&
    selectedSlots.value[0].end === slot.end
  )
}

// Checks if time slot is a last selected
const isLastSelected = (slot) => {
  return (
    selectedSlots.value.length > 0 &&
    selectedSlots.value[selectedSlots.value.length - 1].start === slot.start &&
    selectedSlots.value[selectedSlots.value.length - 1].end === slot.end
  )
}

// Checks if time slot includes selected slots
const isBothSelected = (slot) => {
  return selectedSlots.value.some((s) => s.start === slot.start && s.end === slot.end)
}

// Update values of start and end
const updateNewChoice = () => {
  if (selectedSlots.value.length === 0) {
    newChoice.value.start = null
    newChoice.value.end = null
  } else {
    newChoice.value.start = selectedSlots.value[0].start
    newChoice.value.end = selectedSlots.value[selectedSlots.value.length - 1].end
  }
}
</script>

<template>
  <div class="slotsContainer">
    <div class="timeSlots">
      <h2>Matin</h2>
      <div
        v-for="(slot, index) in props.timeSlots.am"
        :key="slot.start"
        class="slot"
        :class="{
          booked: slot.booked,
          selected: selectedSlot === slot,
          firstSelected: isFirstSelected(slot),
          lastSelected: isLastSelected(slot),
          bothSelected: isBothSelected(slot)
        }"
        @click="handleSlotSelect(slot)"
      >
        {{ slot.start }} - {{ slot.end }}
      </div>
    </div>
    <div class="timeSlots">
      <h2>Après-midi</h2>
      <div
        v-for="(slot, index) in props.timeSlots.pm"
        :key="slot.start"
        class="slot"
        :class="{
          booked: slot.booked,
          selected: selectedSlot === slot,
          firstSelected: isFirstSelected(slot),
          lastSelected: isLastSelected(slot),
          bothSelected: isBothSelected(slot)
        }"
        @click="handleSlotSelect(slot)"
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
  background-color: #425b7670;
  cursor: not-allowed;
}
.selected,
.firstSelected,
.lastSelected,
.bothSelected {
  background-color: #4a7642c2;
}
</style>
