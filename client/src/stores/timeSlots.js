import { defineStore } from 'pinia'

export const useTimeSlotsStore = defineStore({
  id: 'timeSlots',
  state: () => ({
    timeSlots: {
      AM: [
        '8:00-8:30',
        '8:30-9:00',
        '9:00-9:30',
        '9:30-10:00',
        '10:30-11:00',
        '11:00-11:30',
        '11:30-12:00'
      ],
      PM: [
        '13:30-14:00',
        '14:00-14:30',
        '14:30-15:00',
        '15:00-15:30',
        '15:30-16:00',
        '16:00-16:30',
        '16:30-17:00'
        // '17:00-17:30',
        // '17:30-18:00'
      ]
    }
  })
})