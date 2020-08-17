
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");

// CSSModuleLoader
const CSSModuleLoader = {
  loader: "css-loader",
  options: {
    modules: true,
    importLoaders: 1
  }
};

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "eval",
  devServer: {
    contentBase: "../build",
    open: true,
    port: 4217,
    hot: true,
    historyApiFallback: true
    //historyApiFallback: {disableDotRule: true}
  },
  module: {
    rules: [
      // SCSS
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },

      // SCSS Module
      {
        test: /\.module\.scss$/,
        use: ["style-loader", CSSModuleLoader, "sass-loader"]
      }
    ]
  }
});

