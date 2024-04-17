<template>
    <HomeForm :redirectToSlotPick="redirectToSlotPick"/>
</template>

<script setup>
import HomeForm from '@/components/HomeForm.vue';
import { useRouter } from 'vue-router';

// This function send to date picker
const redirectToSlotPick = () => {
    const router = useRouter();
    router.push({name: 'slotPick'})
    console.log("click")
}
</script>