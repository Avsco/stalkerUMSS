<template>
    <div class="cappuchino">
        <Options />
        <ScheduleTable class="cappuchino_schedule" :subjectMatters="subjectsMatter" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import ScheduleTable from '@/components/tableSchedule/index.vue'
import Options from '@/components/capucchino/Options/index.vue'

import { subjectMatters } from '@/classes/subjectMatter'

@Component({
    components: {
        ScheduleTable,
        Options,
    },
})
export default class extends Vue {
    @Getter('capucchino/subjectsMatter') readonly subjectsMatter!: subjectMatters[]
}
</script>

<style lang="scss">
@import '@/scss/abstracts/variables.scss';
@import '@/scss/abstracts/mixins.scss';

.cappuchino {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 2rem;
    padding: 2rem;

    &_schedule {
        padding-top: 3rem;
        padding-left: 2rem;
    }
}
</style>
