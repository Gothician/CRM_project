<template lang="pug">
    .contractor-edit_page
        card(:title="title")
            form
                text-field(label='Фамилия', name='last_name', v-model='form.last_name', rules="required", :group='true')
                text-field(label='Имя', name='first_name', v-model='form.first_name', rules="required", :group='true')
                text-field(label='Адрес', name='address', v-model='form.address', rules="required", :group='true')
                text-field(label='Email', name='email', v-model='form.contacts.email', rules="required", :group='true')
                text-field(label='Телефон', name='phone', v-model='form.contacts.phone', rules="required", :group='true')
                text-field(label='Viber', name='viber', v-model='form.contacts.viber', rules="required", :group='true')
                text-field(label='Telegram', name='telegram', v-model='form.contacts.telegram', rules="required", :group='true')
                text-field(label='Skype', name='skype', v-model='form.contacts.skype', rules="required", :group='true')
                text-field(label='Роль', name='role', v-model='form.role', rules="required", :group='true')
                text-field(label='Описание', name='description', v-model='form.description', rules="required|url", :group='true')
                text-field(label='Фото', name='photo_id', v-model='form.photo_id', rules="required|url", :group='true')
                text-field(label='Контрактор', name='сontractor_id', v-model='form.сontractor_id', :group='true')
                b-form-checkbox(name='status', v-model='form.status', switch) Активный
                b-button-group.float-right
                    b-button(variant='danger', :to="{ name: `wearhouse-contractor___${$i18n.locale}`}") Отмена
                    b-button(variant='success') Сохранить
                .clearfix
</template>

<script>
    import Form from '@/components/forms/form'
    import TextField from '@/components/forms/text-field'
    import defaultCard from '@/components/cards/default-card';
    // import TextArea from '@/components/forms/textarea'

    export default {
        name: 'ContractorEdit',
        components: {
            card: defaultCard,
            Form,
            TextField//,
            // TextArea
        },
        data () {
            return {
                form: {
                    first_name: '',
                    last_name: '',
                    birthday: null,
                    address: '',
                    contacts: {
                        email: '',
                        phone: '',
                        viber: '',
                        telegram: '',
                        skype: ''
                    },
                    role: '',
                    description: '',
                    photo_id: '',
                    contractor_id: '',
                    status: false
                }
            }
        },
        methods: {
            formSubmit() {}
        }
    }
</script>