<template lang="pug">
    .text-field(@click="focusInput")
        ValidationProvider(v-slot="{ errors }", :name="name", :rules="rules")
            .input-wrapper
                textarea(v-model="model", :name="name", :class="empty", ref="textarea", :placeholder="placeholder")
                .label(v-if="label") {{ label }}
                span.error {{ errors[0] }}
        .limit(v-if="counter") {{ currentLength }}/{{ counter }}
</template>

<script>
    import { ValidationProvider } from 'vee-validate';
   
    /**
     * Textarea Component
     *
     * @displayName Textarea
     * @author Pavlo Uhrynovych
     * @version 1.0
    */
    export default {
        'name': 'textarea-component',
        data () {
            return {
            }
        },
        computed: {
            empty() {
                if(this.value && this.value.length) return 'with-text';
                else return '';
            },
            model: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            },
            currentLength() {
                return this.model && this.model.length ? this.model.length : 0;
            }
        },
        methods: {
            focusInput(){
                this.$refs.textarea.focus();
            }
        },
        props: {
            counter: {
                type: Number,
                default: () => { return 0; }
            },
            label: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            value: {
                type: String,
                default: () => { return ''; }
            },
            rules: {
                type: String,
                default: () => { return ''; }
            },
            placeholder: {
                type: String,
                default: () => { return ''; }
            }
        },
        components: {
            ValidationProvider
        },
        watch: {
            model(newValue) {
                if(this.counter && newValue.length > this.counter) this.model = this.model.substr(0, this.counter)
            }
        }
    }
</script>
