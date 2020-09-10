<template>
    <div class="search">
        <div class="container">
            <div class="search_bar">
                <input
                    type="text"
                    @input="verifyTeacher($event)"
                    autofocus
                    v-model="inputSearch"
                    :spellcheck="false"
                    placeholder="Ingresa el nombre del docente a buscar"
                />
                <button class="search_button" @click="searchForMatches()">BU</button>
            </div>
            <ul class="search_options" v-show="search.length > 0">
                <div>Resultados</div>
                <li
                    :key="index"
                    class="search_option"
                    v-for="(value, index) in search.slice(0, 6)"
                    @click="fillInput(value), searchForMatches()"
                >
                    <div>{{ value }}</div>
                    <div>Facultad de Ciencias y Tecnologia | Fcyt</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
    @Prop({ required: true }) content!: string[]
    @Prop({ required: true }) dispatchTo!: string
    search: string[] = []
    inputSearch: string = ''

    mounted() {
        document.addEventListener('click', (e) => {
            const target: any = e.target
            if (!(target.nodeName === 'INPUT')) this.search = []
        })
    }

    verifyTeacher(event: any) {
        const expReg = RegExp(this.inputSearch.toUpperCase())
        this.search = this.content.filter((option) => expReg.test(option))
    }

    fillInput(option: string) {
        this.inputSearch = option.toUpperCase()
        this.search = []
    }

    searchForMatches() {
        this.$store.dispatch(this.dispatchTo, this.inputSearch)
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';

.search {
    width: 100%;

    &_bar {
        height: 40px;
        border-radius: $border_radius;
        background-color: $primary_color;
        display: flex;
    }

    &_options {
        background-color: $primary_color;
        border-radius: $border_radius;
        padding: 0 1rem;
        transition: 1s;

        > div {
            padding: 0.7rem 0;
            padding-bottom: 0.4rem;
        }

        li:nth-child(2) {
            border-top: 3px solid $secondary_color;
        }
    }

    &_option {
        width: 100%;
        list-style: none;
        transition: 1s;
        padding: 1rem 0;

        &:not(:last-child) {
            border-bottom: 1px solid $font_color;
        }

        div:nth-child(2) {
            font-size: 0.76rem;
            opacity: 0.7;
        }
    }

    &_button {
        background-color: transparent;
        border: none;
        color: $font_color;
        width: 5rem;
        cursor: pointer;
    }

    input[type='text'] {
        border: none;
        border-radius: $border_radius;
        height: calc(100% - 50%);
        padding: 10px 8px;
        padding-left: 1rem;
        width: 100%;
        background-color: $primary_color;
        color: $font_color;
    }

    ::placeholder {
        color: $font_color;
    }
}

.container {
    margin-left: 2rem;
    margin-right: 2rem;
}
</style>
