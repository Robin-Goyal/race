const HtmlWebPackPlugin = require('html-webpack-plugin')
const DotEnv = require('dotenv-webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const aliases = require('./aliases')
const { paths, host } = require('./constants')

module.exports = {
  entry: paths.entry,
  mode: 'development',
  devServer: {
    compress: true,
    host,
    hot: true,
    https: true,
    progress: true,
    port: 3000,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  output: {
    path: paths.output,
    filename: 'bundle.[hash:6].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: aliases
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: paths.template,
      filename: './index.html'
    }),
    new DotEnv({
      path: paths.env,
      systemvars: true
    }),
    new FaviconsWebpackPlugin({
      logo: paths.favicon,
      favicons: {
        appName: 'Rating The Races',
        appDescription: 'Rating The Races',
        developerName: 'RTR',
        developerURL: 'https://ratingtheraces.com/',
        background: '#ddd',
        theme_color: '#333'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  }
}
