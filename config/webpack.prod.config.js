
const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SassLoader = {
  loader: "sass-loader",
  options: {
    sourceMap: false,
    sassOptions: {
      outputStyle: "compressed"
    }
  }
};

// CSSModuleLoader
const CSSModuleLoader = {
  loader: "css-loader",
  options: {
    modules: {
      localIdentName: "[hash:base64:5]"
    },
    importLoaders: 1
  }
};

module.exports = merge(commonConfig, {
  mode: "production",
  optimization: {
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\/]node_modules[\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },

  // LOADERS
  module: {
    rules: [
      // SCSS
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", SassLoader]
      },

      // SCSS Module
      {
        test: /\.module\.scss$/,
        use: [MiniCssExtractPlugin.loader, CSSModuleLoader, SassLoader]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      minify: true,
      template: path.resolve(__dirname, "../public", "index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:5].css",
      chunkFilename: "[id].[contenthash:5].css"
    })
  ]
});

