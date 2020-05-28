<template>
  <div class="table">
    <table>
      <tr>
        <th v-for="(value, index) in days" :class="index == 0 ? '' : 'table_days'" :key="index">
          <span>{{ value }}</span>
        </th>
      </tr>
      <tr v-for="(valueOne, indexOne) in hours.dataForHTML()" :key="indexOne">
        <template v-for="(valueTwo, indexTwo) in days">
          <td v-if="indexTwo == 0" :key="indexTwo" class="table_hours">
            <span>{{valueOne}}</span>
          </td>
          <ScheduleItem
            v-else-if="isThereContent(indexOne, valueTwo)"
            :key="indexTwo"
            :schedules="getContend(indexOne, valueTwo)"
          />
          <td v-else :key="indexTwo"></td>
        </template>
      </tr>
      <tr>
        <td class="table_hours">
          <span>21:45</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";

import ScheduleItem from "./ScheduleItem.vue";

import { subjectMatter } from "@/@types/subjectMatter";
import colorManager from "@/@types/colorManager";
import hoursManager from "@/@types/hoursManager";
import { scheduleCell } from "../../@types/scheduleCell";

@Component({
  components: {
    ScheduleItem
  }
})
export default class extends Vue {
  @Prop({ required: true }) subjectMatters!: subjectMatter[];
  hours: hoursManager = new hoursManager();
  colors: colorManager = new colorManager();
  days: string[] = [
    "",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado"
  ];

  @Watch("subjectMatters")
  onChildChanged() {
    this.colors.watchColors(this.subjectMatters.length);
  }

  compareDay = (day: string, scheduleDay: string) =>
    day.slice(0, 2).toUpperCase() === scheduleDay;

  compareHour = (indexHour: number, scheduleHour: string) =>
    this.hours.getValue(indexHour) == scheduleHour;

  isThereContent = (indexHour: number, day: string) => {
    let isThere: boolean = false;
    this.subjectMatters.forEach(subjectMatter => {
      subjectMatter.schedules.forEach(schedule => {
        if (
          this.compareDay(day, schedule.day) &&
          this.compareHour(indexHour, schedule.start)
        )
          isThere = true;
      });
    });
    return isThere;
  };

  getContend = (indexHour: number, day: string) => {
    let scheduleItems: scheduleCell[] = [];
    this.subjectMatters.forEach((subjectMatter, indexOne) => {
      subjectMatter.schedules.forEach(schedule => {
        if (
          this.compareDay(day, schedule.day) &&
          this.compareHour(indexHour, schedule.start)
        )
          scheduleItems.push({
            color: this.colors.getColor(indexOne),
            subjectName: subjectMatter.subjectName,
            room: schedule.room,
            groupCode: subjectMatter.groupCode,
            times: schedule.duration
          });
      });
    });
    return scheduleItems;
  };
}
</script>

<style lang="scss">
@import "@/scss/abstracts/_variables.scss";
.table {
  display: flex;
  justify-content: center;
  padding-right: 1rem;
  padding-bottom: 2rem;

  table {
    border-collapse: collapse;
    // width: 100%;
    overflow-x: scroll;
  }

  &_days {
    border: 1px solid #7cbbee;

    background-color: $white;
    width: 100px;
    height: 50px;
  }

  td {
    border: 1px solid #7cbbee;
    &:first-child {
      border: none;
    }
  }

  tr {
    td:not(:first-child) {
      background-color: $white;
    }
  }

  &_hours {
    height: 30px;
    text-align: end;
    span {
      position: relative;
      top: -50%;
      padding-right: 1rem;
    }

    &:last-child {
      height: 0.1px;
      span {
        top: -10000%;
      }
    }
  }
}
</style>
