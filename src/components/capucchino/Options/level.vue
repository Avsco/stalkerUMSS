<template>
    <div>
        <div @click="showSubjects = !showSubjects">{{content.code}}</div>
        <span v-show="false">{{selectedGroups}}</span>
        <div v-if="showSubjects">
            <div v-for="(valueOne, indexOne) in content.subjets" :key="indexOne">
                <div @click="isSelectedGroup(indexOne)">{{valueOne.name}}</div>
                <div v-if="inSelectedSubjects(indexOne)">
                    <div v-for="(valueTwo, indexTwo) in valueOne.groups" :key="indexTwo">
                        Code:{{valueTwo.code}}
                        Teacher:{{valueTwo.teacher}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
    @Prop({ required: true }) content!: any[]
    showSubjects: boolean = false
    selectedGroups: number[] = []

    isSelectedGroup = (select: number) => {
        let isHere = false
        for (let index = 0; index < this.selectedGroups.length; index++) {
            if (select == this.selectedGroups[index]) {
                isHere = true
                this.selectedGroups.splice(index, 1)
            }
        }
        if (!isHere) this.selectedGroups.push(select)
    }

    inSelectedSubjects = (index: number) => {
        for (const iterator of this.selectedGroups) {
            if (iterator == index) return true
        }
        return false
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';
</style>
