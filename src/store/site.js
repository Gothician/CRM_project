import routesHelper from '@/helpers/routes';

export const state = () => ({

    // For top menu (header)
    siteCategories: [
        {
            key: 'orders',
            icon: 'shopping-cart',
            pathName: '',
            path: null,
            status: true,
            selected: false
        },
        {
            key: 'wearhouse',
            icon: 'boxes',
            pathName: '',
            path: null,
            status: true,
            selected: false
        },
        {
            key: 'finance',
            icon: 'hand-holding-usd',
            pathName: '',
            path: null,
            status: true,
            selected: false
        },
        {
            key: 'statistic',
            icon: 'chart-area',
            pathName: '',
            path: null,
            status: true,
            selected: false
        },
        {
            key: 'configs',
            icon: 'cog',
            pathName: '',
            path: null,
            status: true,
            selected: true
        }
    ],

    // For aside menu
    subCategories: {
        configs: [
            {
                key: 'configs-store',
                icon: 'laptop-house',
                status: true,
                selected: true,
                links: [
                    {
                        link: 'configs-store-units',
                        status: true,
                        selected: false
                    },
                    {
                        link: 'configs-store-options',
                        status: true,
                        selected: false
                    },
                    {
                        link: 'configs-store-delivery',
                        status: true,
                        selected: true
                    },
                    {
                        link: 'configs-store-payment',
                        status: true,
                        selected: false
                    },
                    {
                        link: 'configs-store-list',
                        status: true,
                        selected: false
                    }
                ]
            },
            {
                key: 'configs-employes',
                icon: 'user-tie',
                link: '',
                selected: false,
                status: true
            }
        ],
        wearhouse: [
            {
                key: 'wearhouse-contractor',
                icon: 'user-tie',
                link: 'wearhouse-contractor',
                selected: false,
                status: true
            }
        ]
    }
});

export const getters = {

    // -------------------------------
    // Get Sub Categories list
    // -------------------------------
    subCategoriesList: (state, getters) => {
        let current = getters.currentCategory;
        return state.subCategories[current.key];
    },

    // -------------------------------
    // Get Sub Category by category key
    // -------------------------------
    getSubCategory: (state) => (key = false) => {
        if(!key) return null;
        return state.subCategories[key] || null;
    },

    // -------------------------------
    // Get Current Category
    // -------------------------------
    currentCategory: (state) => {
        return state.siteCategories.find(item => {
            return item.selected === true;
        });
    },

    // -------------------------------
    // Get Category by key
    // -------------------------------
    getCategory: (state) => (key = false, filter = false) => {
        if(!key) return null;

        let _key = key;

        if(filter) {
            const helper = new routesHelper();
            let _key = helper.clearRoute(key);
            let result = null;

            for(let variant of _key) {
                result = state.siteCategories.find(item => item.key === variant);
                if(result) break;
            }

            return result;
        } else return state.siteCategories.find(item => item.key === _key);
    }
}

export const mutations = {

    // Set Current Top Menu
    SET_CURRENT_TOP_MENU (state, { key }) {
        for(let category of state.siteCategories) {
            if(category.key === key) category.selected = true;
            else category.selected = false;
        }
    },

    // Set Current Aside Menu
    SET_CURRENT_ASIDE_MENU (state, { getters, data }) {
        let { key } = getters.currentCategory;
        let { to, from } = data;

        if(state.subCategories[key]) {
            for(let subCategory of state.subCategories[key]) {
                if(subCategory.links) {
                    let subCategoryChecked = false;

                    for(let item of subCategory.links) {
                        if(item.link === to) {
                            item.selected = true;
                            subCategoryChecked = true;
                        } else item.selected = false;
                    }

                    if(subCategoryChecked) subCategory.selected = true;
                    else subCategory.selected = false;
                } else if(subCategory.link) {
                    if(subCategory.link === to) subCategory.selected = true;
                    else subCategory.selected = false;
                }
            }
        }
    }
}

export const actions = {
    setCurrentMenu ({ commit, getters }, data) {
        if(!to) data.to = this.$router.currentRoute.name;

        const helper = new routesHelper(data);
        let { to, from, key } = helper.clearRoute();
        let _data = { to, from, key };

        if(key) {
            commit('SET_CURRENT_TOP_MENU', { getters, key });
            commit('SET_CURRENT_ASIDE_MENU', { getters, data:_data });
        } else if(to) {
            commit('SET_CURRENT_ASIDE_MENU', { getters, data:_data });
        }
    }
}
