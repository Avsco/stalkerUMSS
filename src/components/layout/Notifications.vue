<template>
    <span class="notifications">
        <BaseSystemIcons icon="bell" />
    </span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import BaseSystemIcons from '@/components/BaseSystemIcons.vue'

@Component({
    components: {
        BaseSystemIcons
    }
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
