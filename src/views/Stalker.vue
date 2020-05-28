<template>
  <div class="stalker">
    <p class="stalker_text">Prueba buscando a un docente!</p>
    <Search :content="teachers" dispatchTo="stalking/actionSearch" />
    <ScheduleTable :subjectMatters="schedules" />
    <pre>{{schedules}}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";

import Search from "@/components/Search.vue";
import ScheduleTable from "@/components/tableSchedule/ScheduleTable.vue";

import { ScheduleItem } from "@/@types/scheduleItem";
import { getAllTeachers } from "@/services/teachers";

@Component({
  components: {
    Search,
    ScheduleTable
  }
})
export default class extends Vue {
  @Getter("stalking/schedulesTeacher") readonly schedules!: ScheduleItem[];
  teachers: string[] = [];

  async mounted() {
    this.teachers = await getAllTeachers();
  }
}
</script>

<style lang="scss">
.stalker {
  padding-top: 2rem;
  background-color: #f1f9ff;
  &_text {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 4rem;
  }
}
</style>