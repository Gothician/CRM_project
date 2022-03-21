<template lang="pug">
    .breadcrumb-case.d-flex
        .breadcrumb-item(v-if="items",
            v-for="item, index in items",
            :key="index")
            span.category(v-if="index === 0")
                font-awesome-icon(:icon="['fas', item.icon]", v-if="item.icon")
                |{{ $t(`siteMenu.categories.${item.key}`) }}
            router-link(v-else-if="index !== items.length-1", :to="localePath({ name: item.link })") {{ $t(`siteMenu.subCategories.${item.key}`) }}
            span(v-else) {{ $t(`siteMenu.subCategories.${item.key}`) }}
</template>

<script>
    import { mapGetters } from 'vuex';

    /**
     * Breadcrumb component
     *
     * @displayName Breadcrumb
     * @author Pavlo Uhrynovych
     * @version 1.0
    */
    export default {
        name: 'BreadcrumbComponent',
        computed: {
            ...mapGetters('site', {
                categoryData: 'getCategory',
                subCategory: 'getSubCategory'
            }),

            // Formatting the list of categories
            category() {
                let category = this.categoryData(this.$route.name, true);
                if(!category) return null
                return {
                    key: category.key,
                    icon: category.icon
                }
            },

            // Formatting the list of sub categories
            subCategories() {
                let obj = null;

                if(this.category) {
                    obj = [];

                    this.subCategory(this.category.key).map(item => {
                        if(item.selected && item.status) {
                            obj.push({
                                key: item.key,
                                icon: item.icon || null
                            });

                            if(item.links && item.links.length) {
                                item.links.map(subItem => {
                                    if(subItem.selected && subItem.status) {
                                        obj.push({
                                            key: subItem.link
                                        });
                                    }
                                });
                            }
                        }
                    });
                }

                return obj;
            },

            // Formatting the list of breadcrumb items
            items() {
                let result = null;

                if(this.subCategories) {
                    result = [];

                    result = [this.category, ...this.subCategories];
                }

                return result;
            }
        }
    }
</script>
