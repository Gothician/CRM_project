require('dotenv').config();

const pkg = require('./package.json');

module.exports = {
    ssr: false,
    server: {
        port: process.env.PORT
    },

    /*
    ** Headers of the page
    */
    head: {
        htmlAttrs: {
            lang: 'en'
        },
        title: pkg.name,
        titleTemplate: '%s - UH CRM',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'dns-prefetch', href: `${ process.env.BASE_API_URL }/api` },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' }
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: {
        color: '#F15A24',
        height: '3px',
        continuous: true
    },

    /*
    ** Global CSS
    */
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
        '@/assets/scss/general'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '~/plugins/local-storage.js', ssr: false },
        { src: '~/plugins/vee-validate.js', ssr: false },
        { src: '~/plugins/axios.js', ssr: false },
        { src: '~/plugins/fontawesome.js', ssr: false },
        { src: '~/plugins/route', ssr: false }
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/auth-next',
        'cookie-universal-nuxt',
        '@nuxtjs/dotenv',
        '@nuxtjs/moment',
        '@nuxtjs/composition-api/module',
        'bootstrap-vue/nuxt',
        'vue2-editor/nuxt'
    ],
    bootstrapVue: {
        bootstrapCSS: false // Or `css: false`
    },
    /*
    ** Axios module configuration
    */
    axios: {
        baseURL: `${ process.env.BASE_API_URL }/api`,
        // proxyHeaders: false,
        credentials: false,
        proxy: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    },

    proxy: {
        '/api/': {
            target: `${ process.env.BASE_API_URL }/api`,
            pathRewrite: {
                '^/api': ''
            }
        },
        '/auth/': {
            target: `${ process.env.BASE_API_URL }/api/auth`,
            pathRewrite: {
                '^/auth': ''
            }
        },
        '/media/': {
            target: `${ process.env.BASE_API_URL }/api`
        }
    },
    auth: {
        strategies: {
            local: {
                scheme: 'refresh',
                token: {
                    property: 'token',
                    global: true,
                    type: 'Bearer',
                    required: true
                },
                user: {
                    property: 'user',
                    autoFetch: true
                },
                refreshToken: {
                  property: 'refresh_token',
                  data: 'refresh_token',
                  tokenRequired: true
                },
                endpoints: {
                    login: { url: '/auth/signin', method: 'post' },
                    logout: { url: '/auth/signout', method: 'post' },
                    refresh: { url: '/auth/refresh', method: 'post' },
                    user: { url: '/auth/profile', method: 'get' }
                }
            }
        },
        redirect: false,
        localStorage: false
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, { isDev, isClient }) {
            // Run ESLint on save
            let eslintLoader = {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/
            };
            if (isDev && isClient) {
                config.module.rules.push(eslintLoader);
            }
        },
        transpile: ['vee-validate/dist/rules']
    },
    buildModules: [
    ],
    render: {
        http2: {
            push: true
        }
    },
    router: {
        middleware: ['authorization'],
        extendRoutes (routes, resolve) {
            // routes.push({
            //     name: '404-page',
            //     path: '*',
            //     component: resolve(__dirname, 'pages/not-found.vue')
            // });
        }
    }
};
