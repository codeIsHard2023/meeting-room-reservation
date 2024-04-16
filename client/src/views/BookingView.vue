<template>
    <div id="formContainer">
        <Form/>
    </div>
</template>

<script setup>
import Form from '@/components/Form.vue';
</script>

<style scoped>
 #formContainer{
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