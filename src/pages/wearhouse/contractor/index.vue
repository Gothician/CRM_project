<template lang="pug">
    .contractor-page
        h2.title-page {{ $t('pages.wearhouseContractors.list-title') }}
        table-list(:fields="fields",
                    :items="items",
                    :filters="filters",
                    :search="true",
                    @search="filtersSearch",
                    editLink="wearhouse-contractor-id")
</template>

<script>
    import TableList from '@/components/tables/table-list';

    /**
     * Wearhouse Contractors Page
     *
     * @displayName Wearhouse Contractors
     * @author Pavlo Uhrynovych
     * @version 1.0
    */
    export default {
        name: 'WearhouseContractor',
        head() {
            return {
                title: this.$t('pages.wearhouseContractors.list-title')
            };
        },
        data() {
            return {
                filters: [
                    {
                        key: 'company_name',
                        type: 'text'
                    },
                    {
                        key: 'address',
                        type: 'text'
                    },
                    {
                        key: 'status',
                        type: 'checkbox'
                    },
                    {
                        key: 'website',
                        type: 'text'
                    }
                ],
                items: [
                    {
                        id: 1,
                        name: 'Big Opt',
                        description: 'desc',
                        address: 'г. Киев',
                        website: '',
                        logo: null,
                        status: true
                    },
                    {
                        id: 2,
                        name: 'Mini Opt',
                        description: '',
                        address: 'г. Харьков',
                        website: 'https://www.google.ua',
                        logo: {
                            link: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Ruby_logo.png',
                            id: 1223
                        },
                        status: false
                    }
                ],
                fields: [
                    {
                        key: 'logo',
                        label: this.$t('forms.fields.logo'),
                        sortable: false
                    },
                    {
                        key: 'name',
                        label: this.$t('forms.fields.company_name'),
                        sortable: true
                    },
                    {
                        key: 'website',
                        label: this.$t('forms.fields.website'),
                        sortable: false
                    },
                    {
                        key: 'address',
                        label: this.$t('forms.fields.address'),
                        sortable: false
                    },
                    {
                        key: 'status',
                        label: this.$t('forms.fields.status'),
                        sortable: false
                    }
                ]
            }
        },
        components: {
            TableList
        },
        methods: {
            /**
             * Search by filters
             *
             * @param  {Object} data - { get: [string], filters: [object]}
             * @return {[type]}
             */
            filtersSearch(data = false) {
                console.log(data);
            }
        }
    }
</script>
