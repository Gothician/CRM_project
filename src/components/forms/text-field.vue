<template lang="pug">
    .text-field(@click="focusInput", v-if="!group")
        ValidationProvider(v-slot="{ errors }", :name="name", :rules="rules")
            .input-wrapper
                input(:type="type", :name="name", :class="empty", ref="input", v-model="model")
                .label(v-if="label") {{ label }}
                span.error {{ errors[0] }}
        .limit(v-if="counter") {{ currentLength }}/{{ counter }}

    .form-group(v-else)
        ValidationProvider(v-slot="{ errors }", :name="name", :rules="rules")
            label(v-if="label") {{ label }}
            input.form-control(:type="type", :name="name", ref="input", v-model="model")
            span.error {{ errors[0] }}
</template>

<script>
    import { ValidationProvider } from 'vee-validate';
    
    /**
     * Text field Component
     *
     * @displayName Text field
     * @author Pavlo Uhrynovych
     * @version 1.0
    */
    export default {
        // 'name': 'text-field',
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
                this.$refs.input.focus();
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
            type: {
                type: String,
                default: () => { return 'text'; }
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
                type: [String, Object],
                default: () => { return ''; }
            },
            group: {
                type: [String, Boolean],
                default: () => { return false; }
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
