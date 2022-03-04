<template lang="pug">
    header.header__crm
        .header__crm-line__wrapper
            .container-fluid
                .d-flex.justify-content-between

                    //- CRM Logo
                    .logo__wrapper

                    //- Categories
                    .header__crm-categories-wrapper
                        .d-flex.align-items-center
                            .item.d-flex.flex-wrap.align-content-center.justify-content-center(v-for="item in categories",
                                :key="item.key",
                                :class="item.selected && 'active'",
                                v-if="item.status",
                                @click="setCurrentCategory(item.key)")
                                span.icon
                                    font-awesome-icon(:icon="['fas', item.icon]")
                                span.name {{ $t(`siteMenu.categories.${item.key}`) }}
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex';

    /**
     * Header component
     *
     * @displayName Header
     * @author Pavlo Uhrynovych
     * @version 1.0
    */
    export default {
        data () {
            return {
            }
        },
        computed: {
            ...mapState('site', {
                categories: 'siteCategories'
            })
        },
        methods: {
            ...mapActions({
                setCurrentMenu: 'site/setCurrentMenu'
            }),

            /**
             * Set the selected category (call action **store/site->setCurrentMenu()**)
             *
             * @param {string} key Category key
             * @public
            */
            setCurrentCategory(key = false) {
                /**
                 * If isset key
                */
                if(key) this.setCurrentMenu({ key });
            }
        }
    }
</script>
