<template>
  <div class="search">
    <div class="search_search">
      <div class="search_suggestions">
        <input
          type="text"
          @input="verifyTeacher($event)"
          autofocus
          v-model="inputSearch"
          :spellcheck="false"
        />
        <ul>
          <li
            :key="index"
            class="search_selectTeacher"
            v-for="(value, index) in Search.slice(0, 5)"
            @click="fillInput(value), search()"
          >{{ value }}</li>
        </ul>
      </div>
      <button @click="search()">Buscar</button>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component({})
export default class extends Vue {
  @Prop({ required: true }) content!: string[];
  @Prop({ required: true }) dispatchTo!: string;
  Search: string[] = [];
  inputSearch: string = "";

  mounted() {
    document.body.addEventListener("click", e => {
      const target: any = e.target;
      if (!(target.nodeName === "INPUT")) this.Search = [];
    });
  }

  verifyTeacher(event: any) {
    const expReg = RegExp(this.inputSearch.toUpperCase());
    this.Search = this.content.filter(option => expReg.test(option));

    if (event.key === "Enter" && this.Search.length === 1)
      this.fillInput(this.Search[0]);
  }

  fillInput(option: string) {
    this.inputSearch = option.toUpperCase();
    this.Search = [];
  }

  search() {
    this.$store.dispatch(this.dispatchTo, this.inputSearch);
  }
}
</script>

<style lang="scss">
@import "@/scss/abstracts/_variables.scss";
.search {
  width: 100%;

  &_search {
    display: flex;
    margin-bottom: 5rem;

    button {
      position: relative;
      background-color: $primary_color;
      height: 2.6rem;
      width: 5rem;
      margin-left: 2rem;
      color: $white;
      left: -25%;
    }

    @media (max-width: $medium) {
      flex-direction: column;
      align-items: center;
      button {
        margin-left: none;
        z-index: -1;
        margin-top: 2rem;
        left: -5%;
        right: 0;
      }
    }
  }

  &_suggestions {
    position: relative;
    left: 20%;
    flex-grow: 1;
    input[type="text"] {
      border: 1px solid $primary_color;
      padding: 0 1rem;
      font-size: 1.2rem;
      width: 50%;
      height: 2.6rem;
    }

    ul {
      position: absolute;
      top: 100%;
      left: 0;
      width: 50%;
      background-color: #fff;
    }

    @media (max-width: $medium) {
      left: 0;
      flex-grow: none;
      display: flex;
      align-items: center;
      flex-direction: column;

      input[type="text"] {
        width: 150%;
        text-align: center;
      }

      ul {
        width: 150%;
        left: -25%;
      }
    }

    @media (max-width: $small) {
      input[type="text"] {
        width: 100%;
        font-size: 1.2rem;
        text-align: center;
      }

      ul {
        width: 100%;
        left: 0;
        li {
          text-align: center;
        }
      }
    }
  }

  hr {
    width: 100%;
  }

  &_selectTeacher {
    padding: 0.2rem 1rem;
    border-top: 1px solid $primary_color;
    border-left: 1px solid $primary_color;
    border-right: 1px solid $primary_color;
    list-style-type: none;
  }
  &_selectTeacher:hover {
    background-color: $primary_color;
    color: $white;
  }
  &_selectTeacher:last-of-type {
    border-bottom: 1px solid $primary_color;
  }
  &_selectTeacher:first-of-type {
    border-top: none;
  }
}
</style>
