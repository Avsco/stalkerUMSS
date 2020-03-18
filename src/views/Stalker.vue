<template>
  <div class="stalker">
    <SearchDocent />
    <ScheduleTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SearchDocent from "@/components/SearchDocent.vue";
import ScheduleTable from "@/components/tableSchedule/ScheduleTable.vue";

@Component({
  components: {
    SearchDocent,
    ScheduleTable
  }
})
export default class extends Vue {}
</script>