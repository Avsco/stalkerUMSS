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
@import '@/scss/abstracts/variables.scss';
@import '@/scss/abstracts/mixins.scss';

.delete {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &_button {
        display: block;
        background-color: $primary_color;
        margin: 1rem;
        color: $font_color;
        text-decoration: none;
        text-align: center;
        padding: 1rem;
        font-size: 2rem;
        text-transform: capitalize;
    }

    @include for-desktop-up {
        flex-direction: row;
    }
}
</style>
