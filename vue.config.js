const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
const path = require('path')

module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return

        return {
            plugins: [
                new PrerenderSpaPlugin({
                    staticDir: path.resolve(__dirname, 'dist'),
                    routes: ['/'],
                    // renderAfterTime: 20000,
                    renderer: new Renderer({
                        // renderAfterTime: 5000,
                        headless: false,
                        renderAfterDocumentEvent: 'render-event'
                    })
                }),
            ]
        }
    }
}