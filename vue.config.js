const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@c': path.resolve(__dirname, 'src/components'),
        '@v': path.resolve(__dirname, 'src/views'),
        '@a': path.resolve(__dirname, 'src/assets'),
        '@u': path.resolve(__dirname, 'src/utils'),
        '@h': path.resolve(__dirname, 'src/hooks')
      }
    }
  }
});
