const path = require("path");
const withCSS = require("@zeit/next-css");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = withCSS({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    });

    config.plugins.push(
      new MonacoWebpackPlugin({
        // Add languages as needed...
        languages: ["javascript", "typescript", "html"],
        filename: "static/[name].worker.js",
      })
    );

    config.plugins.push(
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
      })
    );

    return config;
  },
});
