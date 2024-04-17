<template>
     <main id="roomSelection">
        <NavHeader/>
        <h2>Choisissez une date</h2>  
        <VueDatePicker v-model="date" :enable-time-picker="false"></VueDatePicker>
        <div v-if="date && isPastDate(date)">
          La date sélectionnée est déjà passée. Veuillez choisir une date future.
        </div>
        <TimeSlot v-if="date"/>
        <div class="validateSlot">
            <span>Choisir un créneau </span>
        </div>
      
    </main>
   
</template>

<script setup>
import NavHeader from '@/components/NavHeader.vue';
import TimeSlot from '@/components/TimeSlot.vue';
import { ref, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref(null);

// Here we check if selected date is not passed
const isPastDate = (selectedDate) => {
  const today = new Date();
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.
  getDate());
  const selectedDateWithoutTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
  return selectedDateWithoutTime < todayWithoutTime; 
}

// Watcher for date change
watch(date, (newValue) => {
  console.log(newValue);
});

</script>

<style scoped>
    #roomSelection {
        margin-inline: calc(var(--margin) * 3);
        padding-top: calc(var(--padding) * 3);
        width: clamp(250px, 500px, 660px);
        background-color: var(--form-bcg);
        border-radius: 16px;
        filter: drop-shadow(var(--shadow));
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .validateSlot{
        width: 100%;
        height: 70px;
        border-end-start-radius: 16px;
        border-end-end-radius: 16px;
        border: none;
        background-color: var(--button-bcg);
        color: var(--light-text);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: calc(var(--text-size) * 2.5);
    }
    
    
</style>