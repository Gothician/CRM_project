<template lang="pug">
    .aside__crm-menu
        .aside__crm-menu-wrapper
            .item(v-for="item in categories",
                :key="item.key",
                v-if="item.status")
                span(v-if="item.links")
                    .links-group.d-flex.align-items-center(:class="item.selected && 'active'")
                        font-awesome-icon(:icon="item.icon")
                        |{{ $t(`siteMenu.subCategories.${item.key}`) }}

                    .links-list
                        router-link.sub-item(v-for="link, index in item.links",
                            :key="index",
                            v-if="link.status",
                            :class="link.selected && 'active'",
                            :to="localePath({ name: link.link })") {{ $t(`siteMenu.subCategories.${link.link}`) }}

                router-link.single-link.d-flex.align-items-center(v-else,
                    :class="item.selected && 'active'",
                    :to="localePath({ name: item.link })")
                    font-awesome-icon(:icon="['fas', item.icon]")
                    |{{ $t(`siteMenu.subCategories.${item.key}`) }}
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    /**
     * Aside menu component.<br>
     * A list of subcategories is displayed here.<br>
     * Data is taken from **store/site subCategoriesList** (getter)
     *
     * @displayName Aside menu
     * @author Pavlo Uhrynovych
     * @version 1.0
    */
    export default {
        data () {
            return {
            }
        },
        computed: {
            ...mapGetters({
                categories: 'site/subCategoriesList'
            })
        }
    }
</script>
