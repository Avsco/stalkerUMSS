<template>
    <div class="frontend">
        <BaseHeader />
        <router-view />
        <BaseFooter />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import BaseFooter from '@/components/layout/BaseFooter.vue'
import BaseHeader from '@/components/layout/BaseHeader.vue'

@Component({
    components: {
        BaseHeader,
        BaseFooter
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
