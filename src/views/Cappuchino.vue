<template>
    <main class="cappuchino">
        <section class="cappuchino_container">
            <ScheduleTable class="cappuchino_schedule" :subjectMatters="subjectsMatter" />
            <Options class="cappuchino_options" />
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
        display: grid;
        grid-template-rows: 1fr auto;
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    &_schedule {
        margin: 2rem;
    }

    @include medium {
        &_container {
            grid-template-rows: 1fr;
            grid-template-columns: 400px 1fr;
        }

        &_schedule {
            grid-column: 2/3;
            // grid-row: 1/2;
        }

        &_options {
            grid-column: 1/2;
            // grid-row: 0/1;
        }
    }
}
</style>
