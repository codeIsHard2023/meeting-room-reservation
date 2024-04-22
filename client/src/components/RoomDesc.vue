<script setup>
import { defineProps } from 'vue'

const props = defineProps(['room'])
</script>

<template>
  <h2 class="titleRoom">Salle choisie : {{ room.name }}</h2>
  <div class="roomCharacteristics">
    <div class="equipement">
      <h3>Equipements</h3>
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
      <h3>Capacité</h3>
      <span> {{ room.capacity }} personnes</span>
    </div>
  </div>
</template>

<style scoped>
.titleRoom {
  font-weight: 600;
  text-decoration: underline;
}
.roomCharacteristics {
  display: flex;
  gap: 2rem;
}
.equipement,
.capacity {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.equipement h3,
.capacity h3 {
  font-family:
    Open Sans,
    sans-serif;
  font-size: calc(var(--text-size) * 2.5);
  font-weight: 600;
  /* text-decoration: underline; */
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
