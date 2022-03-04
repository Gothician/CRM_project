export default ({ app }) => {
    app.router.afterEach((to, from) => {
        app.store.dispatch('site/setCurrentMenu', { to: to.name, from: from.name });
    });
}
