module.exports = {
    apps: [
        {
            name: "story-gize",
            exec_mode: "cluster",
            instances: "max",
            script: "./node_modules/nuxt/bin/nuxt.js",
            args: "start",
            watch: true
        }
    ]
};
