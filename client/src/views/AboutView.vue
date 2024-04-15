<template>
  <div class="about" v-if="meetingRooms.length > 0">
    <h1>This is an about page </h1>
    <img :src="$env.VITE_BACKEND_URL + meetingRooms[1].roomPhoto" :alt="meetingRooms[1].name">
    <p> This is meeting room {{ meetingRooms[1].name }} its capacity is {{ meetingRooms[1].capacity }}</p>
    <div class="roomEquipement">
      <img :src="$env.VITE_BACKEND_URL + meetingRooms[0].equipements[0].imgSrc" :alt="meetingRooms[0].equipements[0].name">
      <img :src="$env.VITE_BACKEND_URL + meetingRooms[0].equipements[1].imgSrc" :alt="meetingRooms[0].equipements[1].name">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      meetingRooms: [],
      reservations: []
    }
  },
  mounted() { 

    // fetching rooms data
    axios.get('http://localhost:3330/api/all-rooms')
    .then((res) => this.meetingRooms = res.data.rooms)
    .catch((err) => console.error("Error fetching data:", err))

    //fetching reservation data
    axios.get('http://localhost:3330/api/all-reservations')
    .then((res) => {this.reservations = res.data.reservations; console.log(this.reservations)})
    .catch((err) => console.error("Error fetching data:", err))
  }
}  
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
.roomEquipement {
  display: flex;
  gap: 10px;
}
.roomEquipement img {
  width: 64px;
}
img {
  width: 300px;
  height: auto;
}
</style>
