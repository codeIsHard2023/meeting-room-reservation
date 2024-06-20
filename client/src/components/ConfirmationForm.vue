<script setup>
import { storeToRefs } from 'pinia'
import { useReservationsStore } from '@/stores/ReservationsStore'
import { ref } from 'vue'
import NavHeader from './NavHeader.vue'

const { reservation, error } = storeToRefs(useReservationsStore())
const { postNewReservation, fetchReservations } = useReservationsStore()
const firstname = ref('')
const lastname = ref('')
const succesMessage = ref('')
const messageOpacity = ref(0)

const dateString = reservation.value.date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  return new Intl.DateTimeFormat('fr-FR', options).format(date)
}
const displayDate = formatDate(dateString)

const handleFirstnameChange = (event) => {
  firstname.value = event.target.value
  reservation.value.firstname = firstname.value
}

const handleLastnameChange = (event) => {
  lastname.value = event.target.value
  reservation.value.lastname = lastname.value
}

const handleSubmitReservation = async (event) => {
  event.preventDefault()
  try {
    await postNewReservation()
    succesMessage.value = 'Votre réservation est enregistrée'
    messageOpacity.value = 1
    if (error.value) {
      succesMessage.value =
        'Il y a eu une erreur lors de la soumission. Veuillez vérifier vos choix : le nom de la salle, la date et les créneaux horaires.'
      messageOpacity.value = 1
    }
    await fetchReservations()
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <NavHeader />
  <form @submit.prevent="handleSubmitReservation" class="reservationForm">
    <h2>Vos Informations</h2>
    <span>{{ reservation.roomName }}</span>
    <span> {{ displayDate }} de {{ reservation.start }} à {{ reservation.end }}</span>
    <label for="firstname">Prénom</label>
    <input
      v-model="firstname"
      @input="handleFirstnameChange"
      type="text"
      id="firstname"
      required
      placeholder="Prénom"
    />
    <label for="lastname">Nom</label>
    <input
      v-model="lastname"
      @input="handleLastnameChange"
      type="text"
      id="lastname"
      required
      placeholder="Nom"
    />
    <p :style="{ opacity: messageOpacity }">{{ succesMessage }}</p>
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
.reservationForm input,
.reservationForm p {
  margin-inline: 5rem;
}
.reservationForm p {
  font-weight: 400;
  text-align: center;
  margin-top: calc(var(--margin) * 10);
}
.bookButton {
  width: 100%;
  height: 70px;
  margin-top: calc(var(--margin) * 4);
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
.bookButton:hover {
  background-color: #425b76d4;
}
</style>
