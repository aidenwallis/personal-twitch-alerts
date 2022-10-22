const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const configFactory = (dir) => ({
  entry: path.join(__dirname, `src/${dir}/index.scss`),
  output: {
    path: path.join(__dirname, "dist/" + dir),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `./src/${dir}/index.html`),
    }),
  ],
  resolve: {
    extensions: [".scss"],
  },
});

module.exports = [configFactory("sub-alert"), configFactory("follow-alert"), configFactory("raid-alert")];
