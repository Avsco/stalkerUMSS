<template>
  <div class="stalker">
    <p class="stalker_text">Prueba buscando a un docente!</p>
    <Search :content="teachers" dispatchTo="stalking/actionSearch" />
    <ScheduleTable :schedules="schedules" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";

import Search from "@/components/Search.vue";
import ScheduleTable from "@/components/tableSchedule/ScheduleTable.vue";

import { ScheduleItem } from "@/@types/scheduleItem";
import { getTeachers } from "@/services/teachers";

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
    this.teachers = await getTeachers(this.$route.params.codeCarrer);
  }
}
</script>

<style lang="scss">
.stalker {
  &_text {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 4rem;
  }
}
</style>