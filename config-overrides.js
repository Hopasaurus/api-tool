
// this is needed to make it so that @stoplight/ordered-object-literal can be loaded by @stoplight/json
// https://github.com/reactioncommerce/reaction-component-library/issues/399#issuecomment-467860022
// it appears that it didn't actually work :(

// what actually "worked" maybe
//  was to change the entry point of ordered-object-literal to .mjs

/*
module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto"
  });

  return webpackConfig;
};
*/

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
  const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['json', 'yaml']
      })
  );

  return config;
};
