const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "[name].[hash:5].js",
    publicPath: "/"
  },
  resolve: { extensions: [".js", ".scss", ".jpeg", ".png", ".svg"] },

  // MODULES
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },

      // Image Assets
      {
        test: /\.(svg|png|jpg|jpeg)$/i,
        exclude: [/\.js$/, /\.html$/, /\.json$/],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./icons/[name].[hash:5].[ext]"
            }
          }
        ]
      }
    ]
  },

  // Plugins
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public", "index.html")
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public/icons",
          to: "icons"
        }
      ]
    })
  ]
};
