<template lang="pug">
    .default-card-component
        .top-line(v-if="title")
            h2.title-page {{ title }}
        <!-- @slot Use this slot -->
        slot
</template>

<script>
    /**
    * Card component (default type)
    *
    * @displayName Card Default
    * @author Pavlo Uhrynovych
    * @version 1.0
    */
    export default {
        name: 'CardDefaultComponent',
        props: {
            /**
             * Card Title
             */
            title: {
                type: String,
                default: () => { return '' }
            }
        }
    }
</script>
