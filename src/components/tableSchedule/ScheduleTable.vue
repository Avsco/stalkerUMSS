<template>
  <div class="table">
    <table>
      <tr class="table_days">
        <th :key="index" v-for="(value, index) in days">
          <span>{{ value }}</span>
        </th>
      </tr>

      <tr>
        <th>
          <span>6:45-8:15</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1, 7)"></th>
      </tr>

      <tr>
        <th>
          <span>8:15-9:45</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1, 7)"></th>
      </tr>

      <tr>
        <th>
          <span>9:45-11:15</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1, 7)"></th>
      </tr>

      <tr>
        <th>
          <span>11:15-12:45</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1, 7)"></th>
      </tr>

      <tr>
        <th>
          <span>12:45-14:15</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1, 7)"></th>
      </tr>

      <tr>
        <th>
          <span>14:15-15:45</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1, 7)"></th>
      </tr>

      <tr>
        <th>
          <span>15:45-17:15</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1, 7)"></th>
      </tr>

      <tr>
        <th>
          <span>17:15-18:45</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1, 7)"></th>
      </tr>

      <tr>
        <th>
          <span>18:45-20:15</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1, 7)"></th>
      </tr>

      <tr>
        <th>
          <span>20:15-21:45</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1, 7)"></th>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";

import { ScheduleItem } from "@/@types/scheduleItem";

@Component({})
export default class extends Vue {
  @Prop({ required: true }) schedules!: ScheduleItem[];

  indexColor: number = 0;
  tableRows: any = "";
  days: string[] = [
    "",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado"
  ];
  colors: string[] = [
    "#BFDDE7",
    "#E2D3A8",
    "#E6AC86",
    "#F4D1C4",
    "#B29299",
    "#d89b96",
    "#C4D7D1"
  ];

  mounted() {
    this.tableRows = document.querySelectorAll("table")[0].childNodes;
  }

  @Watch("schedules")
  onChildschedules() {
    this.stripContent();
    this.inyectTable();
  }

  clearHour(hour: string) {
    const firstHour: string = hour.slice(0, hour.indexOf("-"));
    const cut: number = hour.indexOf(":");
    return firstHour.slice(0, cut) + firstHour.slice(cut + 1);
  }

  setIndexColor() {
    if (this.indexColor === this.colors.length - 1) this.indexColor = -1;
    this.indexColor += 1;
  }

  inyectTable() {
    this.schedules.forEach((schedule: ScheduleItem) => {
      for (let index = 1; index < this.tableRows.length; index++) {
        const hour: string = this.clearHour(
          this.tableRows[index].childNodes[0].textContent
        );
        if (hour == schedule.start) {
          this.selectDay(schedule, index);
          break;
        }
      }
    });
  }

  insertSchedule(schedule: ScheduleItem, rowIndex: number, columIndex: number) {
    this.tableRows[rowIndex].childNodes[
      columIndex
    ].innerHTML = `<span>${schedule.room}<span/>`;
    this.tableRows[rowIndex].childNodes[columIndex].classList.add(
      `selected${this.indexColor}`
    );
    this.tableRows[rowIndex].childNodes[
      columIndex
    ].style.background = this.colors[this.indexColor];
  }

  selectDay(schedule: ScheduleItem, rowIndex: number) {
    for (let columIndex = 1; columIndex < this.days.length; columIndex++) {
      if (schedule.day === this.days[columIndex].slice(0, 2).toUpperCase())
        this.insertSchedule(schedule, rowIndex, columIndex);
    }
  }

  stripContent() {
    const selecteds: any = document.querySelectorAll(
      `.selected${this.indexColor}`
    );
    selecteds.forEach((selected: any) => {
      selected.removeChild(selected.firstChild);
      selected.classList.remove(`selected${this.indexColor}`);
      selected.style.background = "none";
    });
  }
}
</script>

<style lang="scss">
@import "@/scss/abstracts/_variables.scss";
.table {
  background-color: #f1f9ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem;

  @media (max-width: $small) {
    padding: 5rem 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    overflow-x: scroll;
    display: table;

    @media (max-width: $small) {
      display: block;
    }
  }

  tr,
  th {
    border: 1px solid $primary_color;
  }

  tr:first-child,
  th:first-child {
    background-color: $primary_color;
    border: none;
    padding: 1.4rem 0;
    span {
      color: white;
    }
  }

  &_days {
    th {
      padding: 1rem;
      border: none;
      border-left: 1px solid $primary_color;
      border-right: 1px solid $primary_color;
    }
  }
}
</style>
