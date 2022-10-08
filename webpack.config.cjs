const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "front_hash": "./src/index.js",
    "example/index": "./src/example/index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "front_hash示例",
      template: "./src/example/index.html",
      filename: "./example/index.html",
      inject: "body",
      chunks: ["example/index"],
      minify: true
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      minify: TerserPlugin.uglifyJsMinify,
      terserOptions: {
        mangle: {
          reserved: ['FRONT_HASH']
        }
      }
    })],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true
  }
}


// ES6导出webpack配置
// import path from 'path'
// let __dirname = path.resolve("./");
// export default { /* ... */ }

