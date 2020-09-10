<template>
    <div class="frontend">
        <Header />
        <router-view />
        <Footer />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

@Component({
    components: {
        Header,
        Footer,
    },
})
export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';

.frontend {
}
</style>
