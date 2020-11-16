<template>
    <header class="header">
        <router-link class="header_linkmain" to="/">
            <h2>En Desarrollo</h2>
        </router-link>
        <Notifications class="header_notifications" />
    </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import Notifications from '@/components/Notifications.vue'

@Component({
    components: {
        Notifications,
    },
})
export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/abstracts/variables.scss';

.header {
    // position: relative;
    width: 100%;
    height: 100%;
    background-color: $primary_color;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: $box-shadow;

    &_linkmain {
        text-decoration: none;

        h2 {
            color: $font_color;
        }
    }

    &_notifications {
        position: absolute;
        right: 40px;
        top: 25px;
    }
}
</style>
