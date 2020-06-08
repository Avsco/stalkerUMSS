<template>
    <div class="options">
        <div v-for="(value, index) in carrers" :key="index">
            <div class="options_nameCarrer" @click="showCarrer(index, value)">{{ value.name }}</div>
            <div class="options_levels" v-if="index == IndexCarrerActive">
                <Level v-for="(value, index) in carrerActive" :key="index" :content="value" />
                <!-- <pre v-for="(value, index) in carrerActive" :key="index">{{value}}</pre> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import Level from './level.vue'

import { basicCarrer, completeCarrer } from '@/@types/cappuchino'

@Component({
    components: {
        Level
    }
})
export default class extends Vue {
    @Getter('capucchino/carrers') readonly carrers!: basicCarrer[]
    IndexCarrerActive: number = -1
    @Getter('capucchino/carrerSelected') readonly carrerActive!: completeCarrer[]

    async mounted() {
        this.$store.dispatch('capucchino/acitonGetCarrers')
    }

    async showCarrer(index: number, value: basicCarrer) {
        this.$store.dispatch('capucchino/actionGetCarrerSelected', value.code)
        this.IndexCarrerActive = index
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';
</style>
