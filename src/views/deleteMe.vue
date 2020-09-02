<template>
    <div class="delete">
        <router-link class="delete_button" to="/stalker">stalker</router-link>
        <router-link class="delete_button" to="/capucchino">capucchino</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';
.delete {
    height: 84.9vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &_button {
        display: block;
        background-color: $primary_color;
        margin-left: 2rem;
        color: $white;
        text-decoration: none;
        text-align: center;
        padding: 2rem;
        font-size: 2rem;
        text-transform: capitalize;
    }
}
</style>
