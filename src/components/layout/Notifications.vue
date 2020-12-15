<template>
    <span class="notifications">
        <SystemIcons icon="bell" />
    </span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import SystemIcons from '@/components/SystemIcons.vue'

@Component({
    components: {
        SystemIcons,
    },
})
export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/abstracts/variables.scss';
@import '@/scss/abstracts/mixins.scss';

.notifications {
    svg {
        width: 26px;
    }

    @include large {
        width: 32px;
    }
}
</style>
