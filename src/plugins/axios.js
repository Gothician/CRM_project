export default function ({ app, $axios, redirect }) {
    $axios.onError(err => {
        if (err.response.status !== 403) {
            let message = err.response.data && err.response.data.message ? err.response.data.message : null;

            if(message) {
                $nuxt.$bvToast.toast(message, {
                        title: `Error`,
                        variant: 'danger',
                        toaster: 'b-toaster-bottom-right',
                        solid: true
                    }
                );
            }
        } else {
            if(app.$auth.loggedIn) {
                app.$auth.logout();
            }
        }
    });

    $axios.onResponseError(err => {
        if (err.response.status === 403) {
            console.log(err)
            // app.router.push('/login');
            // let originalRequest = err.config;
            // originalRequest.__isRetryRequest = true;

            // return new Promise((resolve, reject) => {
            //     app.store.dispatch('app/refreshToken');
            // }).then(res => {
            //     console.log(res)
            //     // return $axios(originalRequest);
            // }).catch(e => {
            //     console.log(e)
            //     // app.router.push('/login');
            // });
        }
    });
}
