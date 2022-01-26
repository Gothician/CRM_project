<template lang="pug">
    .uh__crm-wrapper(:class="classPage")
        header-component
        aside-menu-component
        nuxt
</template>

<script>
    import headerComponent from '@/components/common/header'
    import asideMenuComponent from '@/components/common/aside-menu'
    import { mapActions, mapGetters, mapState } from 'vuex';

    export default {
        loading: false,
        data () {
            return {
                classPage: ''
            }
        },
        computed: {
            // ...mapState('app', {
            // }),
        },
        components: {
            headerComponent,
            asideMenuComponent
        },
        methods: {
            // ...mapActions({
            //     getStaticData: 'static/getStaticData'
            // })
        },
        async created() {
        },
        watch: {
            // loggedIn(status) {
            //     if(!status) {
            //         this.$router.push({ name: 'login' });
            //     }
            // }
        }
    }
</script>
