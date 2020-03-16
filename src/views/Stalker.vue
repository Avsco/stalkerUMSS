<template>
  <div class="home">
    <SearchDocent />
    <ScheduleTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import SearchDocent from "../components/SearchDocent.vue";
import ScheduleTable from "../components/tableSchedule/ScheduleTable.vue";
import axios from "axios";
import Scheduleitem from "../Class/ScheduleItem";

@Component({
  components: {
    SearchDocent,
    ScheduleTable
  }
})
export default class extends Vue {
  @Getter("stalking/nameTeacher") nameTeacher!: string;
  async mounted() {
    try {
      let schedules: Scheduleitem[] = [];
      const codeCarrers = await this.getCodes();
      codeCarrers.forEach(async (code: string) => {
        const response = await axios.get(
          `http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT/${code}`
        );
        const data = response.data;
        data.levels.forEach((level: any) => {
          level.subjects.forEach((subject: any) => {
            subject.groups.forEach((group: any) => {
              group.schedule.forEach((schedule: Scheduleitem) => {
                if (schedule.teacher === this.nameTeacher) {
                  schedules.push(schedule);
                }
              });
            });
          });
        });
      });
      this.$store.commit("stalking/mutationSchedules", schedules);
    } catch (error) {
      console.error(error);
    }
  }

  async getCodes() {
    try {
      const codeCarrers: string[] = [];
      const response = await axios.get(
        `http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT`
      );
      const data = response.data;
      data.forEach((carrer: any) => {
        codeCarrers.push(carrer.code);
      });
      return codeCarrers;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/abstracts/_variables.scss";
</style>
