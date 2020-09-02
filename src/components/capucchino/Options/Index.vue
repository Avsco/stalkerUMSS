<template>
    <div class="options">
        <div style="text-align: center; padding: 2.4rem; background-color: white;">SEARCH</div>
        <div v-for="(valueOne, indexOne) in carrers" :key="indexOne">
            <div class="options_nameCarrer" @click="showCarrer(indexOne, valueOne)">
                <span>{{ valueOne.name | simplifyCareers | capitalize }}</span>
                <span>></span>
            </div>
            <div v-if="indexOne == IndexCarrerActive">
                <div
                    class="options_level"
                    v-for="(valueTwo, indexTwo) in carrerActive.levels"
                    :key="indexTwo"
                >
                    <span @click="dropLevel(indexTwo)">{{levels.get(valueTwo.code)}}</span>
                    <!-- <pre>{{valueTwo}}</pre> -->
                    <div
                        class="options_subject"
                        v-show="activeLevels.includes(indexTwo)"
                        v-for="(valueThree, indexThree) in carrerActive.levels[indexTwo].subjects"
                        :key="indexThree"
                    >
                        <div>
                            <span>{{valueThree.name | capitalize }}</span>
                            <span>Grupo</span>
                        </div>
                        <div
                            v-for="(valueFour, indexFour) in carrerActive.levels[indexTwo].subjects[indexThree].groups"
                            :key="indexFour"
                            class="options_groups"
                        >
                            <label :for="'group' + indexTwo + indexThree + indexFour">
                                <span>
                                    <input
                                        type="checkbox"
                                        :id="'group'+ indexTwo + indexThree + indexFour"
                                        :value="getSubjectMatter(indexTwo, indexThree, indexFour)"
                                        v-model="subjectsMatter"
                                    />
                                    {{valueFour.teacher | capitalizeName}}
                                </span>
                                <span>{{valueFour.code}}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="options_footer">SCESI 2020</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { basicCarrer, carrer } from '@/@types/cappuchino'
import { scheduleCell } from '@/@types/schedule'
import { subjectMatter } from '@/classes/subjectMatter'

@Component({})
export default class extends Vue {
    @Getter('capucchino/carrers') readonly carrers!: basicCarrer[]
    IndexCarrerActive: number = -1
    activeLevels: number[] = []
    @Getter('capucchino/carrerSelected') readonly carrerActive!: carrer
    levels: Map<string, string> = new Map()
    subjectsMatter: subjectMatter[] = []

    @Watch('IndexCarrerActive')
    onIndexCarrerActive() {
        this.activeLevels = []
    }

    @Watch('subjectsMatter')
    async onSubjectsMatter() {
        this.$store.commit('capucchino/mutationSubjectsMatter', this.subjectsMatter)
    }

    async mounted() {
        this.mountMap()
        this.$store.dispatch('capucchino/actionGetCarrers')
    }

    async showCarrer(index: number, value: basicCarrer) {
        this.$store.dispatch('capucchino/actionGetCarrerSelected', value.code)
        if (this.IndexCarrerActive != index) this.IndexCarrerActive = index
        else this.IndexCarrerActive = -1
    }

    mountMap() {
        this.levels.set('A', 'Semestre 1')
        this.levels.set('B', 'Semestre 2')
        this.levels.set('C', 'Semestre 3')
        this.levels.set('D', 'Semestre 4')
        this.levels.set('E', 'Semestre 5')
        this.levels.set('F', 'Semestre 6')
        this.levels.set('G', 'Semestre 7')
        this.levels.set('H', 'Semestre 8')
        this.levels.set('I', 'Semestre 9')
        this.levels.set('J', 'Semestre 10')
    }

    dropLevel(index: number) {
        if (this.activeLevels.includes(index)) this.activeLevels = this.activeLevels.filter((activeLevel) => activeLevel != index)
        else this.activeLevels.push(index)
    }

    getSubjectMatter(level: number, subject: number, group: number): subjectMatter {
        return {
            subjectName: this.carrerActive.levels[level].subjects[subject].name,
            groupCode: this.carrerActive.levels[level].subjects[subject].groups[group].code,
            schedules: this.carrerActive.levels[level].subjects[subject].groups[group].schedules,
        }
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';

.options {
    border: 1px solid black;
    &_nameCarrer {
        padding: 1rem;
        color: $white;
        background-color: $primary-color;
        display: flex;
        justify-content: space-between;
        border: 1px solid black;
        cursor: pointer;

        span {
            color: $white;
            font-size: 1rem;
            font-weight: 700;
        }
    }

    &_level {
        padding: 10px;
        padding-left: 1.5rem;
        border: 1px solid black;
    }

    &_subject {
        padding: 5px;

        > div {
            display: flex;
            justify-content: space-between;
            border: 1px solid black;
        }
    }

    &_groups {
        input {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }

        input:checked {
            background-color: black;
        }

        > label {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
    }
}
</style>
