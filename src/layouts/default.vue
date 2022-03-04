<template lang="pug">
    .uh__crm-wrapper(:class="classPage")
        header-component
        aside-menu-component

        breadcrumb
        nuxt

        svg.default-linear-gradient(width="0", height="0")
            linearGradient(id="linear-gradient")
              stop.linear-stop1(offset="0%")
              stop.linear-stop2(offset="100%")
</template>

<script>
    import headerComponent from '@/components/common/header'
    import asideMenuComponent from '@/components/common/aside-menu'
    import { mapActions, mapGetters, mapState } from 'vuex';
    import Breadcrumb from '@/components/common/breadcrumb';

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
            asideMenuComponent,
            Breadcrumb
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
