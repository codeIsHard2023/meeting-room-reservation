<script setup>
import { storeToRefs } from 'pinia'
import { useTestStore } from '@/stores/TestStore'

// const { timeSlots } = storeToRefs(useTestStore())
// console.log(timeSlots.value)
const props = defineProps(['timeSlots'])

console.log(props.timeSlots)
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
</style>
