<template>
    <div class="selectCarrer">
        <h3 class="selectCarrer_text">Selecciona tu Carrera</h3>
        <router-link :key="index" v-for="(value, index) in carrers" class="selectCarrer_carrer" :to="'/searchDocent/' + value.code">{{ value.name }}</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Carrer from '../Class/Carrer'
import axios from 'axios'

@Component({})
export default class extends Vue {
    carrers: any[] = []
    async mounted() {
        try {
            const response = await axios.get('http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT/')
            const data = response.data
            data.forEach((carrer: any) => {
                this.carrers.push(new Carrer(carrer.code, carrer.name))
            })
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';
.selectCarrer {
    padding: 0 1rem;
    &_carrer {
        border-bottom: 1px solid darken($white, 30);
        cursor: pointer;
        padding: 0.62rem;
        text-decoration: none;
        display: block;
    }
    &_carrer:last-child {
        border-bottom: 0 solid #000;
    }
    &_text {
        text-align: center;
        font-size: 1.8rem;
        font-weight: 700;
        padding-top: 1rem;
    }
}
</style>
