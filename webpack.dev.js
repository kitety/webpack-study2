const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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

  mode: 'development',
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
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
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
        }, "css-loader", 'less-loader'],
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
  watch: true,
  watchOptions: {
    // 监听变化300ms之后再去执行 缓存的等待时间
    aggregateTimeout: 300,
    // 每秒钟轮训1000次
    poll: 100,
    ignored: /node_modules/,
  },
  // 不加这个需要手动的刷新浏览器
  devServer: {
    // 
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name][contenthash:8].css`
    })
  ]
}
