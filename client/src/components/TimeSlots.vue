<!-- <script setup>
import { storeToRefs } from 'pinia'
import { useReservations } from '@/stores/ReservationsStore'

const props = defineProps(['timeSlots'])
const { newChosedSlot } = storeToRefs(useReservations())

const handleStartSelect = (selectedStart) => {
  newChosedSlot.value.start = selectedStart
}

const handleEndSelect = (selectedEnd) => {
  newChosedSlot.value.end = selectedEnd
}
</script>

<template>
  <div class="slotsContainer">
    <div class="timeSlots">
      <h2>Matin</h2>
      <div
        v-for="slot in props.timeSlots.am"
        :key="slot.start"
        class="slot"
        :class="{ booked: slot.booked }"
        @click="handleStartSelect(slot.start)"
      >
        {{ slot.start }} - {{ slot.end }}
      </div>
    </div>
    <div class="timeSlots">
      <h2>Après-midi</h2>
      <div
        v-for="slot in props.timeSlots.pm"
        :key="slot.start"
        class="slot"
        :class="{ booked: slot.booked }"
        @click="handleEndSelect(slot.end)"
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
</style> -->

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useReservationsStore } from '@/stores/ReservationsStore'

const props = defineProps(['timeSlots'])
const { timeSlots, newChosedSlot } = storeToRefs(useReservationsStore())
const selectedSlot = ref(null)

const handleSlotSelect = (slot) => {
  if (!slot.booked) {
    if (selectedSlot.value === slot) {
      selectedSlot.value = null
      newChosedSlot.value.start = null
      newChosedSlot.value.end = null
    } else if (selectedSlot.value) {
      newChosedSlot.value.end = slot.end
      selectedSlot.value = null
    } else {
      newChosedSlot.value.start = slot.start
      selectedSlot.value = slot
    }
  }
}
</script>

<template>
  <div class="slotsContainer">
    <div class="timeSlots">
      <h2>Matin</h2>
      <div
        v-for="slot in props.timeSlots.am"
        :key="slot.start"
        class="slot"
        :class="{
          booked: slot.booked,
          selected: selectedSlot === slot
        }"
        @click="handleSlotSelect(slot)"
      >
        {{ slot.start }} - {{ slot.end }}
      </div>
    </div>
    <div class="timeSlots">
      <h2>Après-midi</h2>
      <div
        v-for="slot in props.timeSlots.pm"
        :key="slot.start"
        class="slot"
        :class="{
          booked: slot.booked,
          selected: selectedSlot === slot
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

.selected {
  background-color: #4a7642c2;
}
</style>
