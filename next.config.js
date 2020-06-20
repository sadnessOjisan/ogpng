const withCSS = require("@zeit/next-css");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

console.log("process.env.DEPLOY_ENV", process.env.DEPLOY_ENV);

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
    return config;
  },
  env: { NEXT_PUBLIC_DEPLOY_ENV: process.env.DEPLOY_ENV },
});
