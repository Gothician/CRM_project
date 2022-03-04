<template lang="pug">
    ValidationObserver(v-if="validate", v-slot="{ handleSubmit }")
        form(@submit.prevent="handleSubmit(onSubmit)", ref="form", :method="method", :action="action && action")
            slot

    form(v-else, @submit.prevent="onSubmit", ref="form", :method="method", :action="action && action")
        slot
</template>
<script>
    import { ValidationObserver } from 'vee-validate';

    /**
     * Form Component
     *
     * @displayName Form
     * @author Pavlo Uhrynovych
     * @version 1.0
    */
    export default {
        // 'name': 'v-form',
        data () {
            return {
            }
        },
        components: {
            ValidationObserver
        },
        methods: {
            onSubmit(){
                this.$emit('submit', this.$refs.form);
            }
        },
        props: {
            validate: {
                type: Boolean,
                default: () => { return true; }
            },
            action: {
                type: String,
                default: () => { return ''; }
            },
            method: {
                type: String,
                default: () => { return 'post'; }
            }
        }
    }
</script>
