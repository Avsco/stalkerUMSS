<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

Vue.filter('simplifyCareers', (word: string) => word.slice(16, word.length))

Vue.filter('capitalize', (word: string) => {
    let capitalize: string = word.charAt(0)
    for (let index = 1; index < word.length; index++) {
        capitalize += word[index].toLocaleLowerCase()
    }

    if (capitalize[capitalize.length - 1] == 'i') {
        let arrayWord = capitalize.split(' ')
        arrayWord[arrayWord.length - 1] = arrayWord[arrayWord.length - 1].toLocaleUpperCase()
        capitalize = arrayWord.join(' ')
    }
    return capitalize
})

Vue.filter('capitalizeName', (value: string) => {
    let arrayName = value.split(' ')
    for (let indexOne = 0; indexOne < arrayName.length; indexOne++) {
        let capitalize = value.charAt(0)
        for (let indexTwo = 1; indexTwo < arrayName[indexOne].length; indexTwo++) {
            capitalize += arrayName[indexOne][indexTwo].toLowerCase()
        }
        arrayName[indexOne] = capitalize
    }
    return arrayName.join(' ')
})

export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/index.scss';
body {
    margin: 0;
}
</style>
