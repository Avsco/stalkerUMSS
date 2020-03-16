<template>
  <footer class="footer">
    <span class="footer_links">
      <span>
        <a :href="value.route" :key="index" v-for="(value, index) in links">{{ value.name }}</a>
      </span>
    </span>
    <p>SCESI</p>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class extends Vue {
  links: any[] = [
    {
      name: "Pagina scesi",
      route: "#"
    },
    {
      name: "Codigo fuente",
      route: "#"
    },
    {
      name: "Pagina fcyt",
      route: "#"
    },
    {
      name: "Pagina websis",
      route: "#"
    }
  ];
}
</script>

<style lang="scss">
@import "@/scss/abstracts/_variables.scss";

.footer {
  background-color: $secundary_color;
  display: grid;
  padding: 0.4rem 2rem;
  grid-gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  width: 100%;
  align-items: center;
  height: 3rem;
  &_links {
    span {
      display: flex;
      justify-content: space-evenly;
      a {
        text-decoration-line: underline;
        color: $white;
      }
    }
  }
  p {
    color: $white;
    text-align: right;
  }
}
</style>
