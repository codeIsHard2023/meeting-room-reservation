import { defineStore } from 'pinia'

export const useRoomsStore = defineStore({
  id: 'roomStore',
  state: () => ({
    rooms: [],
    loading: false,
    error: null
  }),
  getters: {},
  actions: {
    async fetchRooms() {
      this.rooms = []
      this.loading = true
      try {
        const response = await fetch('http://localhost:3330/api/rooms')
        if (!response.ok) {
          throw new Error('Failed to fetch rooms')
        }
        const data = await response.json()
        this.rooms = data.rooms
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
