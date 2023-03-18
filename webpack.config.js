const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

/** @type import("webpack").Configuration */
const webpackConfig = {
  mode: "production",
  entry: {
    www: "./server.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  target: "node",
  externals: [nodeExternals()],
  externalsPresets: { node: true },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public", to: "public", noErrorOnMissing: true }],
    }),
    new ESLintPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
};

module.exports = webpackConfig;
