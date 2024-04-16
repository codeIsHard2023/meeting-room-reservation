<template>
    <NavHeader/>
    <form action="submit" class="reservationForm">
        <h2>Vos Informations</h2>
        <span>Salle#1</span>
        <span>lundi 22 avril 2024 de 16h00 à 18h00</span>
        <label for="firstname">Prénom</label>
        <input type="text" for="firstname">
        <label for="lastname"></label>
        <input type="text" for="lastname">
        <button type="submit">
            Réserver la salle
        </button>
    </form>
</template>
<script setup>
import NavHeader from './NavHeader.vue';
</script>

<style scoped>
.reservationForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

</style>