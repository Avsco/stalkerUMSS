<template>
    <nav class="navbar">
        <router-link class="navbar_linkmain" to="/">
            <h2>Docent Stalking</h2>
        </router-link>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';

.navbar {
    width: 100%;
    height: 4rem;
    background-color: $primary_color;
    display: flex;
    align-items: center;
    justify-content: center;

    &_linkmain {
        text-decoration: none;
        h2 {
            font-weight: 700;
            font-size: 1.8rem;
            color: $white;
        }
    }
}
</style>
