<template lang="pug">
    .list-filters-wrapper
        .filters-wrapper.d-flex.justify-content-between.align-items-center
            b-button.filter-toggle(variant="outline-primary", @click="fullFilter=!fullFilter", :class="fullFilter && 'active'")
                font-awesome-icon.filters(:icon="['fa', 'sliders-h']")

            .search-wrapper(v-if="!fullFilter")
                b-input-group
                    b-input-group-prepend
                        .input-group-text
                            font-awesome-icon.filters(:icon="['fa', 'search']")
                    b-form-input(:placeholder="$t(`forms.fields.search_placelholder`)+$t(`forms.fields.search_placelholder_${defaultKey}`)", v-model="searchText", @keydown.enter="search", @keyup="search")

        .filters-wrapper-hidden(v-if="fullFilter")
            .container-fluid
                .row(v-if="filtersArr")
                    .col-md-3(v-for="item in filtersArr.inputs", :key="item.key")
                        b-input-group
                            b-form-input(:placeholder="$t(`forms.fields.${item.key}`)", :type="item.type", v-model="form[item.key]")
                    .col-md-3(v-for="item in filtersArr.checkbox", :key="item.key")
                        b-form-checkbox(:name="item.key", size="lg", v-model="form[item.key]") {{ $t(`forms.fields.${item.key}`) }}
                .row
                    .col.text-right
                        b-button.search-btn.mr-2(v-if="fullFilter", variant="danger", size="lg", @click="resetFilters") {{ $t(`forms.fields.btn_reset`) }}
                        b-button.search-btn(v-if="fullFilter", size="lg", @click="filterParams") {{ $t(`forms.fields.search_btn_text`) }}

</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import helper from '@/helpers/routes'

    /**
     * Filters component for list (**table-list**)
     *
     * @displayName List Filters
     * @author Pavlo Uhrynovych
     * @version 1.0
    */
    export default {
        name: 'ListFiltersComponent',
        data () {
            return {
                minLengthAutoSearch: 4,
                timeoutDelay: 1000,
                fullFilter: false,
                form: {},
                searchText: '',
                timeout: null
            }
        },
        computed: {
            filtersArr() {
                if(!this.filters) return null;
                let inputs = [];
                let checkbox = [];

                this.filters.map(item => {
                    item.type === 'text' && inputs.push(item);
                    item.type === 'checkbox' && checkbox.push(item);
                })

                return { inputs, checkbox };
            }
        },
        props: {
            /**
             * Default Search Key
             */
            defaultKey: {
                type: String,
                default: () => { return 'name' }
            },
            /**
             * Filters array [{type: 'text|checkbox'}, key: 'phone']<br>
             * !The "key" field is used for translation calls
             */
            filters: {
                type: [Array, null],
                default: () => { return null }
            }
        },
        methods: {
            /**
             * The function of generating data for the request when entering data in the search field
             *
             * @return {[Object]}
             */
            search() {
                if(this.searchText.length >= this.minLengthAutoSearch) {
                    clearTimeout(this.timeout);

                    this.timeout = setTimeout(() => {
                        let get = {};
                        let filters = `${this.defaultKey}=${this.searchText}`;
                        get[this.defaultKey] = this.searchText;

                        this.$emit('search', { get, filters });
                    }, this.timeoutDelay);
                } else if(!this.searchText) return this.resetFilters();
            },

            /**
             * Sets field values by keys from prop **filters**<br>
             * (parses data from url string get-parameters).
             *
             * @param [Boolean] reset - Set to true if form values need to be reset
             */
            setForm(reset = false) {
                if(!this.filters) return null;
                this.form = {};

                if(reset) this.filters.map(item => this.form[item.key] = null);
                else {
                    const routesHelper = new helper;

                    this.filters.map(item => {
                        this.form[item.key] = routesHelper.findGetParameter(item.key) ||null;
                    });
                }
            },

            /**
             * Passes an object with filter values
             * for searching data to the parent component
             *
             * @return {[Object]}
             */
            filterParams() {
                const routesHelper = new helper;
                let result = routesHelper.getFormat(this.form);
                let filters = {};

                for(let item in this.form)
                    if(this.form[item]) filters[item] = this.form[item];

                if(result && filters)
                    this.$emit('search', { get: result, filters });
            },

            /**
             * Reset filters method
             *
             * @return {[null]}
             */
            resetFilters() {
                this.setForm(true);
                this.$emit('search', null);
            }
        },
        mounted() {
            this.setForm();
        }
    }
</script>
