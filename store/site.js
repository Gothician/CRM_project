export const state = () => ({

    // For top menu (header)
    siteCategories: [
        {
            name: 'Заказы',
            key: 'orders',
            icon: 'shopping-cart',
            pathName: '',
            path: null,
            status: true,
            selected: false
        },
        {
            name: 'Склад',
            key: 'wearhouse',
            icon: 'boxes',
            pathName: '',
            path: null,
            status: true,
            selected: false
        },
        {
            name: 'Финансы',
            key: 'finance',
            icon: 'hand-holding-usd',
            pathName: '',
            path: null,
            status: true,
            selected: false
        },
        {
            name: 'Статистика',
            key: 'statistic',
            icon: 'chart-area',
            pathName: '',
            path: null,
            status: true,
            selected: false
        },
        {
            name: 'Настройки',
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
                groupName: 'Магазины',
                key: 'conf_market',
                icon: 'laptop-house',
                status: true,
                selected: false,
                links: [
                    {
                        name: 'Единицы измерения',
                        link: '',
                        status: true,
                        selected: false
                    },
                    {
                        name: 'Опции товара',
                        link: '',
                        status: true,
                        selected: false
                    },
                    {
                        name: 'Методы доставки',
                        link: '',
                        status: true,
                        selected: true
                    },
                    {
                        name: 'Методы оплаты',
                        link: '',
                        status: true,
                        selected: false
                    },
                    {
                        name: 'Список магазинов',
                        link: '',
                        status: true,
                        selected: false
                    }
                ]
            },
            {
                groupName: 'Сотрудники',
                key: 'conf_employes',
                icon: 'user-tie',
                link: '',
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
    // Get Current Category
    // -------------------------------
    currentCategory: (state) => {
        return state.siteCategories.find(item => {
            return item.selected === true;
        });
    }
}
