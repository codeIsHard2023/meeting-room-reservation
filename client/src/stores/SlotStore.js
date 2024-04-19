import { defineStore } from 'pinia'

export const useSlotStore = defineStore({
  id: 'slotStore',
  state: () => ({
    selectedRoom: null,
    selectedDate: null,
    bookedSlots: [],
    loading: false,
    error: null
  }),

  actions: {
    setSelectedRoom(selectedRoom) {
      this.selectedRoom = selectedRoom
    },
    setSelectedDate(date) {
      this.selectedDate = date
    },

    async fetchReservations(selectedRoom, selectedDate) {
      this.bookedSlots = []
      this.loading = true
      try {
        const response = await fetch(
          `http://localhost:3330/api/reservations/${selectedRoom}/${selectedDate}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch reservations')
        }
        const data = await response.json()

        this.bookedSlots = data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
