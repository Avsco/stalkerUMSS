<template>
  <div class="table">
    <table>
      <tr class="table_days">
        <th :key="index" v-for="(value, index) in days">
          <span>{{value}}</span>
        </th>
      </tr>
      <tr>
        <th>
          <span>6:45-8:15</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1,7)"></th>
      </tr>
      <tr>
        <th>
          <span>8:15-9:45</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1,7)"></th>
      </tr>
      <tr>
        <th>
          <span>9:45-11:15</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1,7)"></th>
      </tr>
      <tr>
        <th>
          <span>11:15-12:45</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1,7)"></th>
      </tr>
      <tr>
        <th>
          <span>12:45-14:15</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1,7)"></th>
      </tr>
      <tr>
        <th>
          <span>14:15-15:45</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1,7)"></th>
      </tr>
      <tr>
        <th>
          <span>15:45-17:15</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1,7)"></th>
      </tr>
      <tr>
        <th>
          <span>17:15-18:45</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1,7)"></th>
      </tr>
      <tr>
        <th>
          <span>18:45-20:15</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1,7)"></th>
      </tr>
      <tr>
        <th>
          <span>20:15-21:45</span>
        </th>
        <th :key="index" v-for="(value, index) in days.slice(1,7)"></th>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ScheduleItem from "../../Class/ScheduleItem";

@Component({})
export default class extends Vue {
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
  Schedules: ScheduleItem[] = [
    {
      day: "MA",
      start: "815",
      end: "945",
      duration: 2,
      room: "690A",
      teacher: "FERNANDEZ TERRAZAS ERIKA"
    },
    {
      day: "JU",
      start: "945",
      end: "1115",
      duration: 2,
      room: "690A",
      teacher: "FERNANDEZ TERRAZAS ERIKA"
    },
    {
      day: "LU",
      start: "1115",
      end: "1245",
      duration: 2,
      room: "690A",
      teacher: "FERNANDEZ TERRAZAS ERIKA"
    },
    {
      day: "MI",
      start: "815",
      end: "945",
      duration: 2,
      room: "690A",
      teacher: "FERNANDEZ TERRAZAS ERIKA"
    },
    {
      day: "VI",
      start: "815",
      end: "945",
      duration: 2,
      room: "690A",
      teacher: "FERNANDEZ TERRAZAS ERIKA"
    },
    {
      day: "MA",
      start: "1845",
      end: "2015",
      duration: 2,
      room: "690A",
      teacher: "FERNANDEZ TERRAZAS ERIKA"
    }
  ];

  mounted() {
    this.tableRows = document.querySelectorAll("table")[0].childNodes;
    this.inyectTable();

    // this.stripContent();
  }

  inyectTable() {
    this.Schedules.forEach((schedule: ScheduleItem) => {
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

  selectDay(schedule: ScheduleItem, rowIndex: number) {
    for (let columIndex = 1; columIndex < this.days.length; columIndex++) {
      if (schedule.day === this.days[columIndex].slice(0, 2).toUpperCase()) {
        this.insertSchedule(schedule, rowIndex, columIndex);
      }
    }
  }

  insertSchedule(schedule: ScheduleItem, rowIndex: number, columIndex: number) {
    this.tableRows[rowIndex].childNodes[
      columIndex
    ].innerHTML = `<span>${schedule.room}<span/>`;
    this.tableRows[rowIndex].childNodes[columIndex].classList.add("selected");
  }

  clearHour(hour: string) {
    const firstHour: string = hour.slice(0, hour.indexOf("-"));
    const cut: number = hour.indexOf(":");
    return firstHour.slice(0, cut) + firstHour.slice(cut + 1);
  }

  stripContent() {
    const selecteds: any = document.querySelectorAll(".selected");
    selecteds.forEach((selected: any) => {
      selected.removeChild(selected.firstChild);
      selected.classList.remove("selected");
    });
  }
}
</script>

<style lang="scss">
@import "@/scss/abstracts/_variables.scss";
.table {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;

  tr,
  th {
    border: 1px solid black;
  }

  tr:first-child,
  th:first-child {
    background-color: $primary_color;
    border: none;
    padding: 1rem;
    span {
      color: white;
    }
  }

  @media (max-width: $medium) {
    tr:first-child,
    th:first-child {
      padding: 0.7rem;
    }
  }

  @media (max-width: $small) {
    padding-left: 7rem;
    overflow-x: scroll;
    tr:first-child,
    th:first-child {
      padding: 0.5rem;
    }
  }

  &_days {
    th {
      padding: 1rem;
    }

    @media (max-width: $medium) {
      th {
        padding: 0.7rem;
      }
    }

    @media (max-width: $small) {
      th {
        padding: 0.5rem;
      }
    }
  }
}

.selected {
  background: $secundary_color;
}
</style>
