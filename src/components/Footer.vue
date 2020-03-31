<template>
  <footer class="footer">
    <span class="footer_links">
      <span>
        <a
          :href="value.route"
          :key="index"
          v-for="(value, index) in links"
          target="_blank"
        >{{ value.name }}</a>
      </span>
    </span>
    <img src="@/assets/logo_scesi.png" alt />
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class extends Vue {
  links: any[] = [
    {
      name: "Pagina fcyt",
      route: "http://www.fcyt.umss.edu.bo/"
    },
    {
      name: "Pagina websis",
      route: "http://websis.umss.edu.bo/"
    }
  ];
}
</script>

<style lang="scss">
@import "@/scss/abstracts/_variables.scss";

.footer {
  position: absolute;
  background-color: rgba($primary_color, 0.7);
  display: grid;
  padding: 1rem 2rem;
  grid-gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  width: 100%;
  align-items: center;
  &_links {
    span {
      display: flex;
      justify-content: left;
      a {
        text-decoration-line: underline;
        color: $white;
        padding: 0 2rem;
      }

      @media (max-width: $small) {
        flex-direction: column;
        a {
          padding: 0.4rem 0;
        }
      }
    }
  }
  img {
    position: relative;
    left: calc(100% - 25%);
    width: 80px;

    @media (max-width: $small) {
      left: 30%;
    }
  }
}
</style>
