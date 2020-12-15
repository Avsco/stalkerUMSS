<template>
    <div class="frontend">
        <Header />
        <router-view />
        <Footer />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Footer from '@/components/layout/Footer.vue'
import Header from '@/components/layout/Header.vue'

@Component({
    components: {
        Header,
        Footer
    }
})
export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';

.frontend {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 80px calc(100% - 160px) 80px;
}
</style>
