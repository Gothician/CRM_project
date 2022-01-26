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
                                v-if="item.status")
                                span.icon
                                    font-awesome-icon(:icon="item.icon")
                                span.name {{ item.name }}
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex';

    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faShoppingCart, faBoxes, faHandHoldingUsd, faChartArea, faCog } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    library.add(faShoppingCart, faBoxes, faHandHoldingUsd, faChartArea, faCog);

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
        components: {
            FontAwesomeIcon
        },
        methods: {
        }
    }
</script>
