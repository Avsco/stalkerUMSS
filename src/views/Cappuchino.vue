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

import ScheduleTable from '@/components/scheduleTable/ScheduleTable.vue'
import Options from '@/components/capucchino/Options.vue'

import SubjectMatters from '@/classes/subjectMatter'

@Component({
    components: {
        ScheduleTable,
        Options
    }
})
export default class extends Vue {
    @Getter('capucchino/subjectsMatter') readonly subjectsMatter!: SubjectMatters[]
}
</script>

<style lang="scss">
@import '@/scss/abstracts/mixins.scss';

.cappuchino {
    &_container {
        display: flex;
        align-items: flex-start;
        flex-direction: column-reverse;
        overflow-x: auto;
    }

    &_schedule {
        margin: 2rem;
        width: calc(100%);
    }

    &_options {
        min-width: 100%;
    }

    @include medium {
        &_container {
            flex-direction: row;
            overflow: none;
        }

        &_schedule {
            flex-grow: 3;
            overflow-x: none;
            width: 0;
        }

        &_options {
            flex-grow: 1;
            max-width: 400px;
            min-width: 0;
        }
    }
}
</style>
