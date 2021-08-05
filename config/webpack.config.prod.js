const HtmlWebPackPlugin = require('html-webpack-plugin')
const DotEnv = require('dotenv-webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const aliases = require('./aliases')
const { paths } = require('./constants')

const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
  entry: paths.entry,
  bail: true,
  mode: 'production',
  output: {
    path: paths.output,
    filename: 'bundle.[hash:6].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  performance: {
    hints: false
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 5
        }
      })
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: aliases
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: paths.template,
      filename: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new DotEnv({
      path: paths.env,
      systemvars: true
    }),
    new FaviconsWebpackPlugin({
      logo: paths.favicon,
      outputPath: '/static/favicons',
      prefix: 'static/favicons',
      favicons: {
        appName: 'Rating The Races',
        appDescription: 'Rating The Races',
        developerName: 'RTR',
        developerURL: 'https://ratingtheraces.com/',
        background: '#ddd',
        theme_color: '#333'
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '[name].[ext]',
          globOptions: { ignore: ['index.html'] }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: false,
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),

    new WebpackManifestPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: 'static/fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}
