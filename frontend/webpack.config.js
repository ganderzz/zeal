const HtmlWebpackPlugin = require("html-webpack-plugin")
const PnpWebpackPlugin = require("pnp-webpack-plugin")
const path = require("path")

const webpack = require("webpack")

const staticDir = path.resolve(__dirname, "static")
const buildDir = path.resolve(__dirname, "dist")
const buildTemplate = path.resolve(staticDir, "index-template.html")
const srcDir = path.resolve(__dirname, "src")
const entryPoint = path.resolve(__dirname, "src", "index.js")

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    main: entryPoint,
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js", ".json"],
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  output: {
    path: buildDir,
    publicPath: "/",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [srcDir],
        loader: require.resolve("esbuild-loader"),
        options: {
          loader: "jsx",
          target: "es2018",
        },
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api/**": {
        target: "http://localhost:4000/",
        changeOrigin: true,
      },
    },
    static: {
      directory: staticDir,
      publicPath: "/",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "what can you make",
      template: buildTemplate,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
