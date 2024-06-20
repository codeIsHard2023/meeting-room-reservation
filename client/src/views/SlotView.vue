<template>
  <DatePicker :navigateToBookingView="navigateToBookingView" />
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToBookingView = () => {
  router.push('/booking')
}
import DatePicker from '@/components/DatePicker.vue'
</script>
