// vite.config.js
const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        addEditPost: resolve(__dirname, 'add-edit-post.html'),
        postDetail: resolve(__dirname, 'post-detail.html')
      }
    }
  }
})