require('dotenv').config();

const pkg = require('./package.json');

module.exports = {
    srcDir: 'src/',
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
            { rel: 'dns-prefetch', href: `${ process.env.BASE_URL }/api` },
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
        color: '#1AA79C',
        height: '3px',
        continuous: true
    },

    /*
    ** Global CSS
    */
    css: [
        '@/assets/scss/general'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '@/plugins/local-storage.js', ssr: false },
        { src: '@/plugins/vee-validate.js', ssr: false },
        { src: '@/plugins/axios.js', ssr: false },
        { src: '@/plugins/route', ssr: false }
    ],
    fontawesome: {
        icons:{
            solid:true,
            brands:true
        }
    },
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
        'vue2-editor/nuxt',
        [
            'nuxt-i18n',
            {
                detectBrowserLanguage: {
                    useCookie: true,
                    cookieKey: 'i18n_redirected',
                    alwaysRedirect: false,
                    fallbackLocale: 'ru'
                  },
                locales: [
                  {
                    name: 'Русский',
                    code: 'ru',
                    iso: 'rus-RU',
                    file: 'rus-RU.js'
                  },
                  {
                    name: 'Українська',
                    code: 'ua',
                    iso: 'uk-UA',
                    file: 'uk-UA.js'
                  },
                  {
                    name: 'English',
                    code: 'en',
                    iso: 'en-US',
                    file: 'en-US.js'
                  }
                ],
                lazy: true,
                langDir: 'lang/',
                defaultLocale: 'ru'
            }
        ]
    ],
    bootstrapVue: {
        bootstrapCSS: false // Or `css: false`
    },
    /*
    ** Axios module configuration
    */
    axios: {
        baseURL: `${ process.env.BASE_URL }/api`,
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
            target: `${ process.env.BASE_URL }/api`,
            pathRewrite: {
                '^/api': ''
            }
        },
        '/auth/': {
            target: `${ process.env.BASE_URL }/api/auth`,
            pathRewrite: {
                '^/auth': ''
            }
        },
        '/media/': {
            target: `${ process.env.BASE_URL }/api`
        }
    },
    auth: {
        strategies: {
            local: {
                scheme: 'local',
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
                  tokenRequired: false
                },
                endpoints: {
                    login: { url: '/auth/login', method: 'post' },
                    logout: { url: '/auth/logout', method: 'post' },
                    refresh: { url: '/auth/refresh', method: 'post' },
                    user: { url: '/auth/profile', method: 'get' }
                }
            }
        },
        redirect: true,
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
        '@nuxtjs/fontawesome'
    ],
    fontawesome: {
        icons: {
            solid: true,
            brands: true
        }
    },
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
