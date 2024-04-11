<template>
  <div class="about">
    <h1>This is an about page </h1>
    <!-- <img v-if="meetingRooms.length > 0" :src="meetingRooms[0].roomPhoto" :alt="meetingRooms[0].name"> -->
    <img v-if="meetingRooms.length > 0" :src="$env.VITE_BACKEND_URL + meetingRooms[0].roomPhoto" :alt="meetingRooms[0].name">
    <p v-else> loading image </p>
  </div>
</template>

<script>
import axios from 'axios'

// export default {
//   data() {
//     return {
//       meetingRooms: []
//     }
//   },
//   mounted() { 
//     axios.get('http://localhost:3330/api/test-all-rooms')
//     .then((res) => this.meetingRooms = res.data.rooms)
//     .catch((err) => console.error("Error fetching data:", err))
//   }
// }
export default {
  data() {
    return {
      meetingRooms: [],
      loading: true
    }
  },
  async mounted() { 
    try {
      const response = await axios.get('http://localhost:3330/api/test-all-rooms')
      this.meetingRooms = response.data.rooms
      console.info(this.meetingRooms)
    } catch(err) {
      console.error("Error fetching data:", err)
    } finally {
    this.loading = false
    }
  }
}
    
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
