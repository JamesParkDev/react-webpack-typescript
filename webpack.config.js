const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const SRC_DIRECTORY = path.join(__dirname, "src");
const ROOT_DIRECTORY = path.join(__dirname);

const DEFAULT_PARAMS = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve("dist"),
    filename: "[chunkhash].js",
    sourceMapFilename: "[chunkhash].map"
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@style": path.resolve(__dirname, "src/style/"),
      "@layouts": path.resolve(__dirname, "src/layouts/"),
      "@public": path.resolve(__dirname, "src/public/"),
      "@static": path.resolve(__dirname, "src/static/"),
      "@pages": path.resolve(__dirname, "src/pages/")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /(\.test.ts$|node_modules)/
      },
      {
        test: /\.(css|s[ac]ss)$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: 1
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(ico|png|jpg|gif|svg|eot|ttf|woff|woff2)(\?.+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "/",
              filename: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/static/index.html"
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: path.join(SRC_DIRECTORY, "public"), to: path.join(ROOT_DIRECTORY, "dist") }
    ]),
    new MiniCssExtractPlugin({ filename: "[chunkhash].css" })
  ]
};

module.exports = DEFAULT_PARAMS;
