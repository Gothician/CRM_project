export default function ({ route, from, store, redirect }) {
    if(!store.$auth.loggedIn) {
        // if(route.name !== 'login') {
        //     return redirect({ name: 'login' });
        // }
    } else {
        return redirect();
    }
}
