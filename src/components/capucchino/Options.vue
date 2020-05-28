<template>
  <div class="options">
    <div v-for="(value , index) in carrers" :key="index" @click="showCarrer(index, value)">
      <div class="options_main">{{value.name}}</div>
      <div v-if="index == IndexCarrerActive" class="options_list">
        <Carrer />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Carrer from "@/components/capucchino/Options/Carrer.vue";

import { getCarrers, getCarrer } from "@/services/carrer";
import { basicCarrer, completeCarrer } from "@/@types/cappuchino";

@Component({
  components: {
    Carrer
  }
})
export default class extends Vue {
  carrers: basicCarrer[] = [];
  IndexCarrerActive: number = -1;
  carrerActive: completeCarrer[] | null = null;

  async mounted() {
    this.carrers = await getCarrers();
  }

  async showCarrer(index: number, value: basicCarrer) {
    this.carrerActive = await getCarrer(value.code);
    this.IndexCarrerActive = index;
  }
}
</script>

<style lang="scss">
@import "@/scss/abstracts/_variables.scss";
</style>
