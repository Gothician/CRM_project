export default function ({ route, from, store, redirect }) {
    if(!store.$auth.loggedIn) {
        if(route.name.indexOf('login___') !== 0) {
            return redirect('/login');
        }
    } else {
        if(route.name.indexOf('login___') > -1) {
            return redirect('/');
        } else {
            return redirect();
        }
    }
}
