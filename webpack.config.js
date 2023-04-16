const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const TranspilePlugin = require("transpile-webpack-plugin");
const path = require("path");

/** @type import("webpack").Configuration */
const webpackConfig = {
  mode: "production",
  entry: "./server.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /.ts$/,
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
    extensions: [".ts", ".js"],
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
    new TranspilePlugin({
      extentionMapping: { ".ts": ".js" },
      preferResolveByDependencyAsCjs: true,
    }),
  ],
};

module.exports = webpackConfig;
