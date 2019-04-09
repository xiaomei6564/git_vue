'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    proxyTable: {

      // "/": 'http://localhost:8089/',
      // "/": 'http://10.37.47.60:8080/', //测试服务端
      //  "/": 'http://10.2.98.22:8088/',
      "/": 'http://127.0.0.1:8088/',
    },

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../git_vue/index.html'),
    budget: path.resolve(__dirname, '../git_vue/budget.html'),
    setting: path.resolve(__dirname, '../git_vue/setting.html'),
    home: path.resolve(__dirname, '../git_vue/home.html'),
    depreciation: path.resolve(__dirname, '../git_vue/depreciation.html'),
    monthBudget: path.resolve(__dirname, '../git_vue/monthBudget.html'),
    estimate: path.resolve(__dirname, '../git_vue/estimate.html'),
    yearBudget: path.resolve(__dirname, '../git_vue/yearBudget.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../git_vue'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    // productionSourceMap: true,
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
