<template>
    <aside class="options">
        <div v-for="(valueOne, indexOne) in carrers" :key="indexOne">
            <div class="options_nameCarrer" @click="showCarrer(indexOne, valueOne)">
                <span>{{ valueOne.name | simplifyCareers | capitalize }}</span>
                <span>></span>
            </div>
            <div v-if="indexOne == IndexCarrerActive">
                <div class="options_level" v-for="(valueTwo, indexTwo) in carrerActive.levels" :key="indexTwo">
                    <span @click="dropLevel(indexTwo)">{{ levels.get(valueTwo.code) }}</span>
                    <div
                        class="options_subject"
                        v-show="activeLevels.includes(indexTwo)"
                        v-for="(valueThree, indexThree) in carrerActive.levels[indexTwo].subjects"
                        :key="indexThree"
                    >
                        <div>
                            <span>{{ valueThree.name | capitalize }}</span>
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
                                        :id="'group' + indexTwo + indexThree + indexFour"
                                        :value="getSubjectMatter(indexTwo, indexThree, indexFour)"
                                        v-model="subjectsMatter"
                                    />
                                    <span class="options_nameteacher">{{ valueFour.teacher }}</span>
                                </span>
                                <span>{{ valueFour.code }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="options_footer">SCESI 2020</div>
    </aside>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { BasicCarrer, Carrer } from '@/@types/cappuchino'

import { SubjectMatter } from '@/@types/schedule'
import LevelHash from '@/classes/levelHash'

@Component({})
export default class extends Vue {
    @Getter('capucchino/carrers') readonly carrers!: BasicCarrer[]
    @Getter('capucchino/carrerSelected') readonly carrerActive!: Carrer
    IndexCarrerActive: number = -1
    activeLevels: number[] = []
    levels: LevelHash = new LevelHash()
    subjectsMatter: SubjectMatter[] = []

    @Watch('IndexCarrerActive')
    onIndexCarrerActive() {
        this.activeLevels = []
    }

    @Watch('subjectsMatter')
    onSubjectsMatter() {
        this.$store.commit('capucchino/mutationSubjectsMatter', this.subjectsMatter)
    }

    async mounted() {
        await this.$store.dispatch('capucchino/actionGetCarrers')
    }

    async showCarrer(index: number, value: BasicCarrer) {
        await this.$store.dispatch('capucchino/actionGetCarrerSelected', value.code)
        if (this.IndexCarrerActive != index) this.IndexCarrerActive = index
        else this.IndexCarrerActive = -1
    }

    dropLevel(index: number) {
        if (this.activeLevels.includes(index)) this.activeLevels = this.activeLevels.filter((activeLevel) => activeLevel != index)
        else this.activeLevels.push(index)
    }

    getSubjectMatter(level: number, subject: number, group: number): SubjectMatter {
        return {
            subjectName: this.carrerActive.levels[level].subjects[subject].name,
            groupCode: this.carrerActive.levels[level].subjects[subject].groups[group].code,
            schedules: this.carrerActive.levels[level].subjects[subject].groups[group].schedules
        }
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';

.options {
    border: 1px solid white;
    border-radius: $border_radius;
    display: block;

    &_nameCarrer {
        padding: 1rem;
        background-color: $primary_color;
        display: flex;
        justify-content: space-between;
        border: 1px solid white;
        cursor: pointer;

        span {
            font-weight: 700;
        }
    }

    &_level {
        padding: 10px;
        padding-left: 1.5rem;
        border: 1px solid white;
    }

    &_subject {
        padding: 5px;

        > div {
            display: flex;
            justify-content: space-between;
            border: 1px solid white;
        }
    }

    &_groups {
        input {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }

        input:checked {
            background-color: white;
        }

        > label {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
    }

    &_nameteacher {
        text-transform: capitalize;
    }
}
</style>
