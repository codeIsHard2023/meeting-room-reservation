<template>
    <div class=" slotsContainer">
        <div v-for="(slots, period) in timeSlots" :key=period class="timeSlots">
            <h2>{{ period }}</h2>
            <div v-for="slot in slots" :key="slot" class="slot"> 
                {{ slot }}
            </div>

        </div>
    </div>
    
</template>

<script setup>

import { useTimeSlotsStore } from '@/stores/timeSlots';
import { ref } from 'vue';

const timeSlotsStore = useTimeSlotsStore();
const timeSlots = ref(timeSlotsStore.timeSlots);

</script>

<style>
    .slotsContainer{
        padding: calc(var(--padding) * 2);
        margin-block: calc(var(--margin) * 3);
        display: flex;
        gap: 10px;
        background-color: #425b7610;    
        border-radius: 12px;


      }
    .timeSlots {
        display: flex;
        flex-direction: column;
        align-items: center;
     
        gap: 10px;
      }
    .slot {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--padding);
        width: 160px;
        height: 56px;
        border-radius: 8px;
        background-color: var(--button-bcg);
        color: var(--light-text);
      }
    .slot:hover {
        background-color: #425b7670;
        cursor: pointer;
    }
    
</style>