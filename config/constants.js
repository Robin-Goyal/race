const path = require('path')

const paths = {
  entry: path.resolve(__dirname, '../src/index.jsx'),
  output: path.resolve(__dirname, '../dist'),
  env: path.resolve(__dirname, '../.env'),
  favicon: path.resolve(__dirname, '../src/favicon.ico'),
  template: path.resolve(__dirname, '../public/index.html'),
  //Alias path's
  constants: path.resolve(__dirname, '../src/constants/'),
  assets: path.resolve(__dirname, '../src/assets/'),
  components: path.resolve(__dirname, '../src/components/'),
  utils: path.resolve(__dirname, '../src/utils/'),
  store: path.resolve(__dirname, '../src/store/')
}

const host = process.env.HOST || 'localhost'

module.exports = {
  paths,
  host
}
