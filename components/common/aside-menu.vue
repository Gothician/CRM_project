<template lang="pug">
    .aside__crm-menu
        .aside__crm-menu-wrapper
            .item(v-for="item in categories",
                :key="item.key",
                v-if="item.status")
                span(v-if="item.links")
                    .links-group.d-flex.align-items-center
                        font-awesome-icon(:icon="item.icon")
                        |{{ item.groupName }}

                    .links-list
                        span.sub-item(v-for="link, index in item.links",
                            :key="index",
                            v-if="link.status",
                            :class="link.selected && 'active'") {{ link.name }}

                span.single-link.d-flex.align-items-center(v-else, :class="item.selected && 'active'")
                    font-awesome-icon(:icon="item.icon")
                    |{{ item.groupName }}
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faLaptopHouse, faUserTie } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    library.add(faLaptopHouse, faUserTie);

    export default {
        data () {
            return {
            }
        },
        computed: {
            ...mapGetters({
                categories: 'site/subCategoriesList'
            })
        },
        components: {
            FontAwesomeIcon
        },
        methods: {
        }
    }
</script>
