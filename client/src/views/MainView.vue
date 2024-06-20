<template>
  <RoomSelection :navigateToSlotView="navigateToSlotView" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import RoomSelection from '@/components/RoomSelection.vue'

const router = useRouter()

const navigateToSlotView = () => {
  router.push('/slot')
}
</script>
