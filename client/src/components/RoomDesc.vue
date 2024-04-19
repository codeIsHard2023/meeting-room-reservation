<script setup>
import { defineProps } from 'vue'

const props = defineProps(['room'])
</script>

<template>
  <div class="equipement">
    <h2>Equipements</h2>
    <div class="items">
      <span v-if="room.equipements.length === 0"> Sans équipements</span>
      <img
        v-for="equipement in room.equipements"
        :key="equipement"
        :src="`${$env.VITE_BACKEND_URL}${equipement.imgSrc}`"
        :alt="equipement.name"
        class="equipementImage"
      />
    </div>
  </div>
  <div class="capacity">
    <h2>Capacité</h2>
    <span> {{ room.capacity }} personnes</span>
  </div>
</template>

<style scoped>
.equipement,
.capacity {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.equipement h2,
.capacity h2 {
  font-family:
    Open Sans,
    sans-serif;
  font-size: calc(var(--text-size) * 2.5);
  font-weight: 600;
  text-decoration: underline;
}
.items {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.equipementImage {
  width: 50px;
  height: 50px;
}
.items span,
.capacity span {
  color: var(--dark-text);
  font-weight: 600;
}
</style>
