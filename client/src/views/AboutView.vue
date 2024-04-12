<template>
  <div class="about" v-if="meetingRooms.length > 0">
    <h1>This is an about page </h1>
    <img :src="$env.VITE_BACKEND_URL + meetingRooms[0].roomPhoto" :alt="meetingRooms[0].name">
    <p> This is meeting room {{ meetingRooms[0].name }} its capacity is {{ meetingRooms[0].capacity }}</p>
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
      meetingRooms: []
    }
  },
  mounted() { 
    axios.get('http://localhost:3330/api/test-all-rooms')
    .then((res) => this.meetingRooms = res.data.rooms)
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
