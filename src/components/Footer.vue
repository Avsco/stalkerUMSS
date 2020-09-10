<template>
    <footer class="footer">
        <div class="footer_container">
            <span>
                <div class="footer_links">
                    <a
                        class="footer_link"
                        :href="value.route"
                        :key="index"
                        v-for="(value, index) in links"
                        target="_blank"
                    >{{ value.name }}</a>
                </div>
            </span>
            <img class="footer_image" src="@/assets/scesi_white.png" alt />
        </div>
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
    links: any[] = [
        {
            name: 'fcyt',
            route: 'http://www.fcyt.umss.edu.bo/',
        },
        {
            name: 'Websis',
            route: 'http://websis.umss.edu.bo/',
        },
    ]
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';
@import '@/scss/abstracts/_mixins.scss';

.footer {
    background-color: $primary_color;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;

    &_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 2rem;
    }

    &_content {
    }

    &_links {
    }

    &_link {
        color: $font_color;
        padding: 0 5px;
        text-decoration: none;
    }

    &_image {
        width: 70px;
    }
}
</style>
