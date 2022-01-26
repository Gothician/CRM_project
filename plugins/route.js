export default ({ app }) => {
    app.router.afterEach((to, from) => {
        // app.store.commit("app/setCurrentADcode", null);
        // app.store.commit("app/setPublisherCode", false);
    });
}
