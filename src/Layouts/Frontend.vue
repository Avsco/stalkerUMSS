<template>
  <div class="frontend">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

@Component({
  components: {
    Navbar,
    Footer
  }
})
export default class extends Vue {}
</script>

<style lang="scss">
@import "@/scss/abstracts/_variables.scss";
</style>
