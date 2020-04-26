module.exports = {
    devServer: {
        port: '9527',
        proxy: {
            '/api': {
            target: 'http://localhost:4000',
            ws: true,
            changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}