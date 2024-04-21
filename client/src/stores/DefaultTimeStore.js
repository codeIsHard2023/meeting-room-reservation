import { defineStore } from 'pinia'

export const useDefaultTimeStore = defineStore({
  id: 'TimeStore',
  state: () => ({
    timeSlots: {
      AM: [
        { start: '8:00', end: '8:30' },
        { start: '8:30', end: '9:00' },
        { start: '9:00', end: '9:30' },
        { start: '9:30', end: '10:00' },
        { start: '10:30', end: '11:00' },
        { start: '11:00', end: '11:30' },
        { start: '11:30', end: '12:00' }
      ],
      PM: [
        { start: '13:30', end: '14:00' },
        { start: '14:00', end: '14:30' },
        { start: '14:30', end: '15:00' },
        { start: '15:00', end: '15:30' },
        { start: '15:30', end: '16:00' },
        { start: '16:00', end: '16:30' },
        { start: '16:30', end: '17:00' }
      ]
    }
  })
})
