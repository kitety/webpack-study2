const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    main2: './src/index2.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name][chunkhash:8].bundle.js'
  },

  mode: 'production',
  module: {
    rules: [
      { test: /.js/, use: 'babel-loader' },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,// creates style nodes from JS strings
          options: {
            publicPath: ''
          }
        },
        {
          loader: "css-loader" // translates CSS into CommonJS
        },
        {
          loader: 'postcss-loader' // translates CSS into CommonJS
        },
        {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.css$/i,
        // 链式调用 从后往前
        use: [{
          loader: MiniCssExtractPlugin.loader, options: {
            publicPath: ''
          }
        }, "css-loader", {
          loader: 'postcss-loader' // translates CSS into CommonJS
        }, 'less-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name][hash:8].[ext]'//此处指的是文件内容 md5
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  watchOptions: {
    // 监听变化300ms之后再去执行 缓存的等待时间
    aggregateTimeout: 300,
    // 每秒钟轮训1000次
    poll: 100,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name][contenthash:8].css`
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    // 多个入口多次使用
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'main.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'main2.html',
      chunks: ['main2']

    })
  ]
}
