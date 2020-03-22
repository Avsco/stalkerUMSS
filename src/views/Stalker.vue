<template>
  <div class="stalker">
    <SearchDocent :contend="teachers" />
    <ScheduleTable :schedules="schedules" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import axios from "axios";

import SearchDocent from "@/components/SearchDocent.vue";
import ScheduleTable from "@/components/tableSchedule/ScheduleTable.vue";

@Component({
  components: {
    SearchDocent,
    ScheduleTable
  }
})
export default class extends Vue {
  @Getter("stalking/schedulesTeacher") readonly schedules!: any[];
  carrerCode: string = "";
  teachers: string[] = [];
  async mounted() {
    try {
      this.carrerCode = this.$route.params.codeCarrer;
      let teachers: any[] = [];
      const response = await axios.get(
        `http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT/${this.carrerCode}`
      );
      const data: any = response.data;
      data.levels.forEach((level: any) => {
        level.subjects.forEach((subject: any) => {
          subject.groups.forEach((group: any) => {
            group.schedule.forEach((schedule: any) => {
              teachers.push(schedule.teacher);
            });
          });
        });
      });

      const filter = new Set(teachers);
      filter.forEach((teacher: any) => {
        this.teachers.push(teacher);
      });
    } catch (e) {
      console.log(e);
    }
  }
}
</script>