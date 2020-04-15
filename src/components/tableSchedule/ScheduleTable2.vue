<template>
  <div class="table">
    <table>
      <tr>
        <th v-for="(value, index) in days" :key="index" class="table_days">
          <span>{{ value }}</span>
        </th>
      </tr>
      <tr v-for="(valueOne, indexOne) in hours.dataForHTML()" :key="indexOne">
        <td
          v-for="(valueTwo, indexTwo) in days"
          :key="indexTwo"
          :class="indexTwo === 0 ? 'table_hours' : ''"
          v-html="indexTwo === 0 ? `<span>${valueOne}</span>` : insertSchedule(indexOne, valueTwo)"
        ></td>
      </tr>
      <tr>
        <td class="table_hours">
          <span>21:45</span>
        </td>
      </tr>
    </table>
    <pre>{{subjectMatters}}{{subjectMatters.length}}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";

import { subjectMatter } from "@/@types/subjectMatter";
import hourHandler from "@/@types/hourHandler";
import colorManager from "@/@types/colorManager";
import hoursManager from "@/@types/hoursManager";

@Component({})
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

  compareDay = (day: string, scheduleDay: string): boolean =>
    day.slice(0, 2).toUpperCase() === scheduleDay;

  builtBoxSchedule = (
    classBox: string,
    index: number,
    subjectMatter: subjectMatter,
    room: string
  ) =>
    `<span class='${classBox} color${index}'>
                <span> ${subjectMatter.subjectName} </span>
                <span> ${room} </span>
                <span> Groupo ${subjectMatter.groupCode} </span>
            </span>`;

  insertSchedule(IndexstartHour: number, day: string): string {
    let inyect: string = "";
    this.subjectMatters.forEach((subjectMatter, index) => {
      subjectMatter.schedules.forEach(schedule => {
        const hours: hourHandler = new hourHandler(
          this.hours.data[IndexstartHour],
          this.hours.data[IndexstartHour + 1],
          schedule
        );
        //descomponer el schedule y meterlo de nuevo en forma legible, sino desde el stalking
        if (this.compareDay(day, schedule.day) && hours.compareHour()) {
          let classBox: string = hours.assignClassType();
          inyect = this.builtBoxSchedule(
            classBox,
            index,
            subjectMatter,
            schedule.room
          );
        }
      });
    });
    return inyect;
  }
}
</script>

<style lang="scss">
@import "@/scss/abstracts/_variables.scss";
.table {
  padding-right: 15rem;

  table {
    border-collapse: collapse;
    width: 100%;
    overflow-x: scroll;
  }

  &_days {
    border: 1px solid black;
    width: calc(100% / 7);
    height: 50px;

    &:first-child {
      width: 10%;
      border: none;
    }
  }

  td {
    border: 1px solid black;

    &:first-child {
      border: none;
    }
  }

  &_hours {
    height: 50px;
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

  &_schedule {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      text-transform: uppercase;
      text-align: center;
      font-size: 0.7rem;
    }
  }
}
</style>
