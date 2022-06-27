const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { app: './src/index.ts' },
  module: {
    rules: [
      {
        test: /\.ts$/u,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ]
          }
        },
        include: [
          resolve(__dirname, './src')
        ]
      },
      {
        test: /\.css$/u,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|txt)$/u,
        type: 'asset/resource',
        generator: { filename: './assets/[hash][ext]' }
      }
    ]
  },
  resolve: {
    modules: [
      resolve(__dirname, 'src'),
      'node_modules'
    ],
    extensions: [
      '.ts',
      '.js',
      '.json',
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.svg',
      '.txt'
    ]
  },
  output: {
    filename: '[contenthash].js',
    path: resolve(__dirname, './docs')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: resolve(__dirname, './static/index.html'),
      favicon: resolve(__dirname, './static/favicon.png')
    }),
    new MiniCssExtractPlugin({ filename: '[contenthash].css' })
  ],
  target: ['web', 'es5'],
  mode: 'production'
};
