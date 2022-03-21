<template lang="pug">
    .table-list-component
        card(:title="title")
            .table-list-component-wrapper
                filters(:filters="filters", v-if="search", @search="filtersSearch")

                b-table(striped, hover, :busy="busy", :items="items", :fields="fieldsArr", borderless, no-border-collapse, :striped="false")

                    template(v-for="field in fieldsArr", v-slot:[`cell(${field.key})`]="{ item }")
                        //- Name col
                        template(v-if="field.key === 'name'")
                            |{{ item.name }}
                            font-awesome-icon.ml-2.primary(v-if="item.description", :icon="['fa', 'comment-dots']", :id="`tooltip-target-${item.id}`")
                            b-tooltip(:target="`tooltip-target-${item.id}`", triggers="hover", v-if="item.description", variant="info") {{ item.description }}

                        //- Logo col
                        template(v-else-if="field.key === 'logo'")
                            b-avatar(:src="item.logo.link", v-if="item.logo && item.logo.link")
                            b-avatar(v-else, :text="item.name.substr(0, 2)", variant="success")

                        //- Image col
                        template(v-else-if="field.key === 'image'")
                            b-avatar(:src="item.image.link", v-if="item.image && item.image.link")
                            b-avatar(v-else, :text="item.name.substr(0, 2)", variant="success")

                        //- Website col
                        template(v-else-if="field.key === 'website'")
                            a(:href="item.website", target="_blank", v-if="item.website")
                                font-awesome-icon.website(:icon="['fa', 'globe']", :id="`tooltip-website-${item.id}`")
                            font-awesome-icon.website.disabled(v-else, :icon="['fa', 'globe']", :id="`tooltip-website-${item.id}`")
                            b-tooltip(:target="`tooltip-website-${item.id}`", triggers="hover", variant="info") {{ item.website }}

                        //- Status col
                        template(v-else-if="field.key === 'status'")
                            font-awesome-icon.status(:class="!item.status && 'disabled'", :icon="['fas', 'check']")

                        //- Controls col
                        template(v-else-if="field.key === 'controls'")
                            b-button-group
                                //- Remove btn
                                b-button(variant="danger")
                                    font-awesome-icon(:icon="['fas', 'trash']", :id="`tooltip-remove-${item.id}`")
                                    b-tooltip(:target="`tooltip-remove-${item.id}`", triggers="hover", variant="info") Remove item
                                //- Edit btn //  "`/wearhouse/contractor/${item.id}`"
                                b-button(variant="success", :to="{ name: `wearhouse-contractor-id___${$i18n.locale}`, params: { id: item.id}}")
                                    font-awesome-icon(:icon="['fas', 'pen']", :id="`tooltip-edit-${item.id}`")
                                    b-tooltip(:target="`tooltip-edit-${item.id}`", triggers="hover", variant="info") Edit item
                                //- View btn
                                b-button(variant="info")
                                    font-awesome-icon(:icon="['fas', 'eye']", :id="`tooltip-info-${item.id}`")
                                    b-tooltip(:target="`tooltip-info-${item.id}`", triggers="hover", variant="info") View item


                        //- Other cols
                        template(v-else) {{ item[field.key] }}


                    template(#table-busy)
                        .text-center.text-success.my-2
                            b-spinner.align-middle.mr-3
                            strong Loading...

                .table-footer.d-flex.justify-content-between.align-items-center
                    .per-page-wrapper Показывать:
                        span.item.active по 10
                        span.item по 30
                        span.item по 50

                    .statistic 2 из 100 записей

            .d-flex.justify-content-end.pr-1
                b-pagination(v-model="currentPage",
                    :total-rows="rows",
                    :per-page="perPage",
                    aria-controls="my-table")

</template>

<script>
    import defaultCard from '@/components/cards/default-card';
    import listFilters from '@/components/filters/list-filters';

    /**
     * List table component.<br>
     * Can be used to display lists of data (*users list*, *orders list*, etc.).<br>
     * It has presets: *displaying images, status, record controls*.
     *
     * @displayName Table list
     * @author Pavlo Uhrynovych
     * @version 1.0
    */
    export default {
        name: 'TableListComponent',
        data() {
            return {
                perPage: 10,
                currentPage: 1,
                rows: 100
            }
        },
        computed: {
            fieldsArr() {
                if(this.fields) {
                    let result  = [...this.fields, {
                        key: 'controls',
                        label: '',
                        tdClass: 'td-controls',
                        sortable: false
                    }];

                    result.map(item => {
                        if(item.key === 'status') item.tdClass = 'td-status';
                        if(item.key === 'website') item.tdClass = 'td-website';
                        if(item.key === 'image' ||
                            item.key === 'logo' ||
                            item.key === 'photo') item.tdClass = 'td-image';
                    });

                    return result;
                } else return null;
            }
        },
        methods: {
            /**
             * Passes an object with filter values
             * for searching data to the parent component
             *
             * @param [Object] data
             * @return {[Object]}
             */
            filtersSearch(data) {
                // data = { filters: [object], get: [string]} || null
                this.$emit('search', data)
            }
        },
        components: {
            card: defaultCard,
            filters: listFilters
        },
        props: {
            /**
             * Card Title
             */
            title: {
                type: String,
                default: () => { return '' }
            },
            /**
             * Set of column names
             */
            fields: {
                type: Array,
                default: () => { return null }
            },
            /**
             * Table list item set
             */
            items: {
                type: Array,
                default: () => { return null }
            },
            /**
             * Data upload status
             */
            busy: {
                type: Boolean,
                default: () => { return false }
            },
            /**
             * Search filters
             */
            filters: {
                type: [Array, null],
                default: () => { return null }
            },
            /**
             * Search status
             */
            search: {
                type: Boolean,
                default: () => { return true }
            }
        }
    }
</script>
