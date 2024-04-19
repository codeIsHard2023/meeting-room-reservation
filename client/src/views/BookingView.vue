<script setup>
import ConfirmationForm from '../components/ConfirmationForm.vue'
</script>

<template>
  <div id="formContainer">
    <ConfirmationForm />
  </div>
</template>

<style scoped>
#formContainer {
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
</style>
