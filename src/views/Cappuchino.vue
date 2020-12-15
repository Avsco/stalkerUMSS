<template>
    <main class="cappuchino">
        <section class="cappuchino_container">
            <Options class="cappuchino_options" />
            <ScheduleTable class="cappuchino_schedule" :subjectMatters="subjectsMatter" />
        </section>
    </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import ScheduleTable from '@/components/tableSchedule/index.vue'
import Options from '@/components/capucchino/Options.vue'

import { subjectMatters } from '@/classes/subjectMatter'

@Component({
    components: {
        ScheduleTable,
        Options
    }
})
export default class extends Vue {
    @Getter('capucchino/subjectsMatter') readonly subjectsMatter!: subjectMatters[]
}
</script>

<style lang="scss">
@import '@/scss/abstracts/variables.scss';
@import '@/scss/abstracts/mixins.scss';

.cappuchino {
    &_container {
        display: flex;
        align-items: start;
        flex-direction: column-reverse;
    }

    &_schedule {
        margin: 2rem;
    }

    &_options {
        min-width: 100%;
    }

    @include medium {
        &_container {
            flex-direction: row;
        }

        &_schedule {
            flex-grow: 3;
        }

        &_options {
            flex-grow: 1;
            max-width: 400px;
            min-width: 0;
        }
    }
}
</style>
