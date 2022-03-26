<template lang="pug">
    .login-page.d-flex.align-items-center.justify-content-center
        vawe-animate
            
        .form-wrapper(v-if="!showResetPass")
            h4 Login

            v-form(@submit="userLogin")
                text-field(label="EMAIL ADDRESS", name="email", v-model="form.email", rules="required|email|min:3|max:320", :group="true")
                text-field(label="PASSWORD", name="password", v-model="form.password", rules="required|min:8|max:32", group="true", type="password")
                .form-group-hint.text-right
                    a(@click.prevent="showResetPass=true") Reset Password

                input.btn.btn-danger(type="submit", value="LOGIN")

        //- .form-wrapper(v-else)
        //-     reset-password(@submit="resetForm")
        //-         template(v-slot:cancel-btn)
        //-             button.btn.btn.btn-orange(type="button", @click.prevent="showResetPass=false") Cancel
        
        .login-page-footer
            .copyright-text Copyright 2019 Storygize Inc.
</template>

<script>
    import vaweAnimate from '@/components/vawe-animate';
    import input from '@/components/forms/text-field';
    import form from '@/components/forms/form';
    // import resetPassword from '@/components/reset-password';

    /**
     * Login Page
     *
     * @displayName Login Page
     * @author Pavlo Uhrynovych
     * @version 1.0
    */
    export default {
        layout: 'not-auth',
        name: 'LoginPage',
        components: {
            vaweAnimate,
            vForm: form,
            textField: input
            // resetPassword
        },
        data () {
            return {
                form: {
                    email: null,
                    password: null,
                    remember_me: true,
                    client_id: 3,
                    client_secret: 'y1XjoJUj9cqFBo8ucmBPdF0Pfvgny5nQUxfqnCU4'
                },
                showResetPass: false
            }
        },

        methods: {

            // -------------------------------
            // User Login
            // -------------------------------
            async userLogin() {
                this.$nuxt.$loading.start()
                try {
                    let resp = await this.$auth.loginWith('local', { data: this.form });
                    this.$nuxt.$loading.finish();
                    this.$router.push({ name: 'index' });
                } catch (err) {
                    this.$nuxt.$loading.finish();
                    console.error(`Login Page -> userLogin(): request error - status ${err.response.status}`, err.response);
                }
            },

            // -------------------------------
            // Reset Password submited
            // -------------------------------
            resetForm(status=null, message=null) {
                if(status && status === 'Success') this.showResetPass = false;
                if(message) {
                    this.$bvToast.toast(message, {
                        title: 'Success',
                        variant: 'danger',
                        toaster: 'b-toaster-bottom-right',
                        solid: true
                    });
                }
            }
        },
        mounted() {
            console.log(this.$route.name)
        }
    }
</script>
