<template>
    <main id="roomSelection">
        <h1>Salles de réunion disponibles chez Adlin Science</h1>
        <div class="roomContainer">
            <div class="rooms">
                <RoomButton/>
                <RoomButton/>
                <RoomButton/>
                <RoomButton/>
                <RoomButton/>
            </div>
        </div>
        <div class="info">
            <RoomDesc/>
        </div>
        <div class="checkAvailability">
            <button type="button" class="availability" @click="redirectToSlotPick">
                Disponibilités
            </button>
        </div>
        <div class="guideMessage">
            <span>Choisir une salle</span>
        </div>

    </main>
</template>

<script setup props="props">
    import RoomButton from '@/components/RoomButton.vue';
    import RoomDesc from '@/components/RoomDesc.vue';
    import { defineProps, onMounted } from 'vue';

    const props = defineProps({
        redirectToSlotPick: {
            type: Function,
        }})

    // const {redirectToSlotPick} = props;
    onMounted(() => props.methodes());
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
    #roomSelection h1 {
        max-width: 70%;
        margin-bottom: calc(var(--margin) * 3);
        font-family: Viga, sans-serif;
        font-size: var(--header-size);
        font-weight: 600;
        line-height: 1.3;
        text-align: center;     
    }
    .rooms {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: calc(var(--margin) * 4);
    }
    .info {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 2rem;
        margin-bottom: calc(var(--margin) * 3);
    }
    .availability {
        width: 140px;
        height: 42px;
        margin-bottom: calc(var(--margin) * 4);
        padding: var(--padding);
        background-color: var(--button-bcg);
        color: var(--light-text);
        font-weight: 600;
        border-radius: 8px;
        border: none;
    }
    .guideMessage{
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

    @media screen and (max-width: 640px ) {
        #roomSelection h1 {
            font-size: calc(var(--header-size)/1.3);
        }
    }

</style>