<template>
    <header class="header">
        <router-link class="header_linkmain" to="/">
            <h2>EN DESARROLLO</h2>
        </router-link>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';

.header {
    width: 100%;
    height: 80px;
    background-color: $primary_color;
    display: flex;
    align-items: center;
    justify-content: center;

    &_linkmain {
        text-decoration: none;

        h2 {
            font-weight: 700;
            font-size: 1.8rem;
            color: $font_color;
        }
    }
}
</style>
