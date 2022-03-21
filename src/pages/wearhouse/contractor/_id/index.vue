<template lang="pug">
    .contractor-edit_page 
        b-card( no-body )
            b-tabs( catd )
                b-tab( title="Contractor" active )
                    card(:title="title")
                        form
                            text-field(label='Название компании', name='company_name', v-model='form.company_name', rules="required", :group='true')
                            text-field(label='Адрес', name='address', v-model='form.address', rules="required", :group='true')
                            text-field(label='Сайт', name='website', v-model='form.website', rules="required|url", :group='true')
                            text-field(label='Комментарий', name='comment', v-model='form.comment', :group='true')
                            b-form-checkbox(name='status', v-model='form.status', switch) Активный
                            b-button-group.float-right
                                b-button(variant='danger', :to="{ name: `wearhouse-contractor___${$i18n.locale}`}") Отмена
                                b-button(variant='success') Сохранить
                            .clearfix
                b-tab( title="Employees" )
                    table-list(:fields="fields",
                    :items="items",
                    :filters="filters",
                    :search="true",
                    @search="filtersSearch")
</template>

<script>
    import TableList from '@/components/tables/table-list';
    import Form from '@/components/forms/form'
    import TextField from '@/components/forms/text-field'
    import defaultCard from '@/components/cards/default-card';
    // import TextArea from '@/components/forms/textarea'

    export default {
        name: 'ContractorEdit',
        components: {
            card: defaultCard,
            TableList,
            Form,
            TextField//,
            // TextArea
        },
        data () {
            return {
                form: {
                    company_name: '',
                    website: '',
                    address: '',
                    comment: '',
                    status: false
                },
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
        methods: {
            formSubmit() {},
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