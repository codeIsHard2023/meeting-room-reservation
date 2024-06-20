<script setup>
import { storeToRefs } from 'pinia'
import { useRoomsStore } from '@/stores/RoomsStore'
import { ref, defineProps, watch } from 'vue'
import { useReservationsStore } from '@/stores/ReservationsStore'
import RoomButton from './RoomButton.vue'
import RoomDesc from './RoomDesc.vue'

const { rooms, loading } = storeToRefs(useRoomsStore())
const { fetchRooms } = useRoomsStore()
const { reservation, selectedRoom } = storeToRefs(useReservationsStore())
// const { fetchReservations } = useReservationsStore()
const activeRoom = ref(null)
const buttonText = ref('Choisissez une salle')
const props = defineProps({
  navigateToSlotView: {
    type: Function,
    required: true
  }
})

// fetching existing rooms
fetchRooms()
// Manager for active room
const setActiveRoom = (room) => {
  if (activeRoom.value === room) {
    activeRoom.value = null
  } else {
    activeRoom.value = room
  }
}

// Manager for room states
const handleRoomSelection = (roomName) => {
  const previousRoom = roomName

  if (
    typeof reservation.value.roomName === 'string' &&
    reservation.value.roomName == previousRoom
  ) {
    reservation.value.roomName = null
    selectedRoom.value = null
  } else {
    reservation.value.roomName = roomName
    selectedRoom.value = roomName
  }
}

watch(selectedRoom, (newValue) => {
  if (newValue) {
    buttonText.value = 'Choisir un créneau'
    // fetchReservations(newValue, reservation.value.date)
  }
})
</script>

<template>
  <main id="roomSelection">
    <h1>Salles de réunion disponibles</h1>
    <p v-if="loading">Chargement...</p>
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
    <button
      :disabled="!reservation.roomName"
      type="button"
      class="guideMessage"
      @click="props.navigateToSlotView"
    >
      {{ buttonText }}
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
  font-family: var(--header-font);
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
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
.guideMessage:hover {
  background-color: #425b76d4;
}
@media screen and (max-width: 640px) {
  #roomSelection h1 {
    font-size: calc(var(--header-size) / 1.3);
  }
}
</style>
