import { defineStore } from 'pinia'

export const useReservationsStore = defineStore({
  id: 'ReservationsStore',
  state: () => ({
    timeSlots: {
      am: [
        { start: '8:00', end: '8:30', booked: false },
        { start: '8:30', end: '9:00', booked: false },
        { start: '9:00', end: '9:30', booked: false },
        { start: '9:30', end: '10:00', booked: false },
        { start: '10:30', end: '11:00', booked: false },
        { start: '11:00', end: '11:30', booked: false },
        { start: '11:30', end: '12:00', booked: false }
      ],
      pm: [
        { start: '13:30', end: '14:00', booked: false },
        { start: '14:00', end: '14:30', booked: false },
        { start: '14:30', end: '15:00', booked: false },
        { start: '15:00', end: '15:30', booked: false },
        { start: '15:30', end: '16:00', booked: false },
        { start: '16:00', end: '16:30', booked: false },
        { start: '16:30', end: '17:00', booked: false }
      ]
    },
    reservation: {
      roomName: null,
      date: null,
      start: null,
      end: null,
      firstname: null,
      lastname: null
    },
    bookedSlots: [],
    loading: false,
    error: null
  }),
  actions: {
    // Fetch reservations
    async fetchReservations(pickedRoom, pickedDate) {
      this.bookedSlots = []
      this.loading = true
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/reservations/${pickedRoom}/${pickedDate}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch reservations')
        }
        const data = await response.json()

        this.bookedSlots = data
        this.setBookedSlots()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    // Function used to udate booked slots display
    setBookedSlots() {
      const morningSlots = this.timeSlots.am
      const afternoonSlots = this.timeSlots.pm

      return this.bookedSlots.forEach((slot) => {
        const morgning = { startIndex: -1, endIndex: -1 }
        const afternoon = { startIndex: -1, endIndex: -1 }

        // Find time slot start and end
        morningSlots.forEach((morningSlot, index) => {
          if (slot.start === morningSlot.start) {
            morgning.startIndex = index
          }
          if (slot.end === morningSlot.end) {
            morgning.endIndex = index
          }
        })

        afternoonSlots.forEach((afternoonSlot, index) => {
          if (slot.start === afternoonSlot.start) {
            afternoon.startIndex = index
          }
          if (slot.end === afternoonSlot.end) {
            afternoon.endIndex = index
          }
        })

        // Disable booked time slots
        if (morgning.startIndex !== -1 && morgning.endIndex !== -1) {
          for (let i = morgning.startIndex; i <= morgning.endIndex; i++) {
            morningSlots[i].booked = true
            morningSlots[i].active = false
          }
        } else if (afternoon.startIndex !== -1 && afternoon.endIndex !== -1) {
          for (let i = afternoon.startIndex; i <= afternoon.endIndex; i++) {
            afternoonSlots[i].booked = true
            afternoonSlots[i].active = false
          }
        }
      })
    },

    // Function used to reset timeslots booked value
    resetTimeSlots() {
      return (this.timeSlots = {
        am: [
          { start: '8:00', end: '8:30', booked: false },
          { start: '8:30', end: '9:00', booked: false },
          { start: '9:00', end: '9:30', booked: false },
          { start: '9:30', end: '10:00', booked: false },
          { start: '10:30', end: '11:00', booked: false },
          { start: '11:00', end: '11:30', booked: false },
          { start: '11:30', end: '12:00', booked: false }
        ],
        pm: [
          { start: '13:30', end: '14:00', booked: false },
          { start: '14:00', end: '14:30', booked: false },
          { start: '14:30', end: '15:00', booked: false },
          { start: '15:00', end: '15:30', booked: false },
          { start: '15:30', end: '16:00', booked: false },
          { start: '16:00', end: '16:30', booked: false },
          { start: '16:30', end: '17:00', booked: false }
        ]
      })
    },

    // Create new reservation
    async postNewReservation() {
      this.error = false
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post-reservation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.reservation)
        })

        if (response.ok) {
          console.log('Réservation créée avec succès')
        } else {
          console.error('Échec de la création de la réservation')
          this.error = true
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de la requête :", error)
        this.error = true
      }
    }
  }
})
