<script setup>
import { storeToRefs } from 'pinia'
import { useRoomsStore } from '@/stores/RoomsStore'
import { ref, defineProps } from 'vue'
import { useSlotStore } from '@/stores/SlotStore'
import { useTestStore } from '@/stores/TestStore'
import RoomButton from './RoomButton.vue'
import RoomDesc from './RoomDesc.vue'

const { rooms, loading, error } = storeToRefs(useRoomsStore())
const { fetchRooms } = useRoomsStore()
// const { selectedRoom } = storeToRefs(useSlotStore())
// const { setSelectedRoom } = useSlotStore()
const { selectedRoom } = storeToRefs(useTestStore())

const { setSelectedRoom } = useTestStore()

const activeRoom = ref(null)
const props = defineProps({
  navigateToSlotView: {
    type: Function,
    required: true
  }
})
fetchRooms()

const setActiveRoom = (room) => {
  if (activeRoom.value === room) {
    activeRoom.value = null
  } else {
    activeRoom.value = room
  }
}

const handleRoomSelection = (roomName) => {
  setSelectedRoom(roomName)
}
</script>

<template>
  <main id="roomSelection">
    <h1>Salles de réunion disponibles</h1>
    <p v-if="loading">Chargement...</p>
    <p v-if="error">{{ error.message }}</p>
    <div class="roomContainer">
      <div v-if="rooms">
        <div class="rooms">
          <RoomButton
            :room="room"
            v-for="room in rooms"
            :key="room.name"
            :isActive="activeRoom === room"
            @activate="setActiveRoom(room)"
            @click="handleRoomSelection(room.name)"
          />
        </div>
      </div>
    </div>
    <div class="info">
      <RoomDesc v-if="activeRoom" :room="activeRoom" />
    </div>
    <button type="button" class="guideMessage" @click="props.navigateToSlotView">
      Choisir un créneau
    </button>
  </main>
</template>

<style scoped>
#roomSelection {
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
#roomSelection h1 {
  max-width: 70%;
  margin-bottom: calc(var(--margin) * 3);
  font-family: Viga, sans-serif;
  font-size: var(--header-size);
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
}
.rooms {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: calc(var(--margin) * 4);
}
.info {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: calc(var(--margin) * 3);
}
.availability {
  width: 140px;
  height: 42px;
  margin-bottom: calc(var(--margin) * 4);
  padding: var(--padding);
  background-color: var(--button-bcg);
  color: var(--light-text);
  font-weight: 600;
  border-radius: 8px;
  border: none;
}
.guideMessage {
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

@media screen and (max-width: 640px) {
  #roomSelection h1 {
    font-size: calc(var(--header-size) / 1.3);
  }
}
</style>
