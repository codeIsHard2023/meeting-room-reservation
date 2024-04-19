<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps(['room'])
const emit = defineEmits(['activate'])

const isActive = props.isActive
const room = props.room

const activate = () => {
  emit('activate', room)
}
</script>

<template>
  <button type="button" class="selectionButton" :class="{ active: isActive }" @click="activate">
    <img :src="`${$env.VITE_BACKEND_URL}${room.roomPhoto}`" :alt="room.name" class="roomImage" />
    <span class="roomName">{{ room.name }}</span>
  </button>
</template>

<style scoped>
.selectionButton {
  position: relative;
  width: 130px;
  height: 70px;
  padding: 0;
  background-color: transparent;
  border-radius: 8px;
  border: none;
  overflow: hidden;
  transition: filter 0.3s;
}
.roomImage {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  transition: filter 0.3s;
}
.roomName {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--light-text);
  font-size: 1rem;
  text-decoration: underline;
  font-weight: 600;
  text-align: center;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: opacity 0.3s;
}
.selectionButton:hover .roomImage {
  filter: blur(4px);
}
.selectionButton:hover .roomName {
  opacity: 1;
}
.selectionButton.active .roomName {
  opacity: 1;
}
.selectionButton.active .roomImage {
  filter: blur(4px);
}
</style>
