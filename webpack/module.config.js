/* eslint-env node */

/**
 * webAppManifest
 *
 * @description
 * When we find the web-app-manifest.json file, we need that to be output to the
 * root of dist.  Also, we need to preserve the name so that we can import it
 * directly from the template ejs file.
 *
 * NOTE: This is a workaround for an issue where using the inline syntax for json
 * files is not working correctly.
 *
 * @see https://github.com/webpack-contrib/file-loader
 */
const webAppManifest = {
  // Because of a breaking change in webpack version 4, we need to specify a
  // type of 'javascript/auto' to prevent outputting invalid json.
  // @see https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js#L62
  type: 'javascript/auto',
  test: /web-app-manifest\.json$/,
  loader: 'file-loader',
  options: {
    // preserve the file name and extension.
    name: '[name].[ext]'
  }
}

module.exports = function () {
  return {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              emitError: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules/muicss/lib/sass']
            }
          }
        ]
      },
      webAppManifest
    ]
  };
};
