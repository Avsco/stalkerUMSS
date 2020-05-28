<template>
  <td class="schedule">
    <div
      v-for="(value, index) in schedules"
      :key="index"
      :style="schedules.length == 1 ? `background-color: ${value.color};` : ''"
      :class="schedules.length > 1 ? 'schedule_error' : ''"
    >
      <div>{{value.subjectName}}</div>
      <div>Aula:{{value.room}}</div>
      <div>Grupo:{{value.groupCode}}</div>
    </div>
  </td>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { scheduleCell } from "@/@types/scheduleCell";

@Component({})
export default class extends Vue {
  @Prop({ required: true }) schedules!: scheduleCell[];
}
</script>

<style lang="scss">
@import "@/scss/abstracts/_variables.scss";

.schedule {
  text-align: center;
  min-height: 100%;
  margin: 0;
  div {
    font-size: 0.8rem;
  }

  &_error {
    div {
      color: red;
    }
  }
}
</style>
