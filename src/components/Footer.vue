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
                    >
                        <SystemIcons :icon="value.alt" />
                    </a>
                </div>
            </span>
            <img class="footer_image" src="@/assets/scesi_white.png" alt />
        </div>
    </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import SystemIcons from '@/components/SystemIcons.vue'

@Component({
    components: {
        SystemIcons,
    },
})
export default class extends Vue {
    links: any[] = [
        {
            alt: 'facebook',
            route: 'https://www.facebook.com/scesi',
        },
        {
            alt: 'instagram',
            route: 'https://www.instagram.com/scesiumss/?hl=es',
        },
        {
            alt: 'twitter',
            route: 'https://twitter.com/ScesiU',
        },
        {
            alt: 'github',
            route: 'https://github.com/scesi',
        },
        {
            alt: 'youtube',
            route: 'https://www.youtube.com/channel/UCfhSc_xLVxFubp9exyacy0Q',
        },
    ]
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';
@import '@/scss/abstracts/_mixins.scss';

.footer {
    background-color: $primary_color;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.66);
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
        padding: 0 1rem;
    }

    &_link {
        position: relative;
        bottom: -6px;
        color: $font_color;
        padding: 0 5px;
        text-decoration: none;

        svg {
            height: 20px;
        }
    }

    &_image {
        width: 70px;
    }

    @include large {
        &_container {
            padding: 0 2rem;
        }

        &_link {
            padding: 0 10px;

            svg {
                height: 24px;
            }
        }

        &_image {
            width: 80px;
        }
    }
}
</style>
