<script setup>
import NavHeader from './NavHeader.vue'
</script>

<template>
  <NavHeader />
  <form action="submit" class="reservationForm">
    <h2>Vos Informations</h2>
    <span>Salle#1</span>
    <span>lundi 22 avril 2024 de 16h00 à 18h00</span>
    <label for="firstname">Prénom</label>
    <input type="text" id="firstname" required placeholder="Prénom" />
    <label for="lastname">Nom</label>
    <input type="text" id="lastname" required placeholder="Nom" />
    <button type="submit" class="bookButton">Réserver la salle</button>
  </form>
</template>

<style scoped>
.reservationForm {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.reservationForm h2 {
  font-family: Viga, sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: calc(var(--margin) * 2);
}
.reservationForm span {
  font-size: 1rem;
  font-weight: 600;
}
.reservationForm label {
  margin-top: 1rem;
}
.reservationForm input {
  outline: none;
  padding: 10px;
}
#firstname,
#lastname {
  height: 40px;
  border: none;
  background: #f3f3f3;
  border-radius: 4px;
}
.reservationForm h2,
.reservationForm span,
.reservationForm label,
.reservationForm input {
  margin-inline: 5rem;
}
.bookButton {
  width: 100%;
  margin-top: calc(var(--margin) * 10);
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
