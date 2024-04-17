<template>
        <div class="equipement">
            <h2>Equipements</h2>
            <div class="items">
                <span> Projector</span>
                <span>TV </span>
            </div>
        </div>
        <div class="capacity">
            <h2> Capacité </h2>
            <span>5 personnes</span>
        </div>
</template>

<script>
</script>

<style scoped>
    .equipement, .capacity {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .equipement h2, .capacity h2 {
        /* font-family: var(--body-text-font); */
        font-family: Open Sans, sans-serif;
        font-size: calc(var(--text-size) * 2.5);
        font-weight: 600;
        text-decoration: underline;

    }
    .items {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }
    .capacity span {
        color: var(--dark-text);
        font-weight: 600;

    }


</style>