<template>
    <header class="headeroptions flex">
        <div class="flex">
            <div class="headeroptions__icon-calendar">
                <div class="headeroptions__icon">
                    <BaseSystemIcons icon="calendar" />
                </div>
            </div>
            <div class="headeroptions__title">
                <h4>Carreras</h4>
                <p>Selecciona las opciones de la lista</p>
            </div>
        </div>
        <div class="flex" @click="showCarrers()">
            <div class="headeroptions__icon headeroptions__icon-row headeroptions__icon-row-bottom"><BaseSystemIcons icon="angle" /></div>
        </div>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import BaseSystemIcons from '@/components/BaseSystemIcons.vue'

@Component({
    components: {
        BaseSystemIcons
    }
})
export default class extends Vue {
    showCarrers() {
        this.$emit('show-carrers')
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/variables.scss';
@import '@/scss/abstracts/mixins.scss';

.headeroptions {
    background-color: $primary_color;
    border-top-right-radius: $border-radius;
    border-top-left-radius: $border-radius;
    justify-content: space-around;
    border-bottom: 3px solid $primary_color;

    &__icon {
        width: 26px;
        height: 26px;

        &-calendar {
            border-radius: 50%;
            background: rgba($font-color, 20%);
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &-row {
            padding-top: 1rem;
            padding-bottom: 25px;
            margin-right: 1rem;
        }

        &-row-bottom {
            // transform: rotate(180deg);
        }
    }

    &__title {
        p,
        h4 {
            margin: 0;
            margin-left: 1rem;
            padding-bottom: 4px;
            height: 16px;
        }

        h4 {
            font-size: 18px;
        }

        p {
            font-size: 12px;
            margin-bottom: 8px;
        }
    }
}

.flex {
    display: flex;
    align-items: center;
}
</style>
