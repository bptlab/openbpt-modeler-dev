const webpack = require("webpack");
const { NormalModuleReplacementPlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

const SOURCE_VERSION = process.env.SOURCE_VERSION || process.env.npm_package_gitHead || "dev";

const absoluteBasePath = path.resolve(path.join(__dirname, "."));
console.log(absoluteBasePath);
const linkedPackagePath = path.resolve(path.join(__dirname, "../", "openbpt-typed-pn-variants-modeler/node_modules"));
console.log(linkedPackagePath);

module.exports = (env) => {
  let outputPath = __dirname + "/dist";
  let sourcePath = "src";
  let mode = "development";
  return {
    entry: {
      bundle: [`./${sourcePath}/index.js`],
    },
    output: {
      path: outputPath,
      filename: "index.js",
    },
    module: {
      rules: [
        {
          test: /\.xml$/,
          use: ["raw-loader"],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(js|jsx)$/, // Match .js and .jsx files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', // Transpile modern JavaScript
                '@babel/preset-react' // Transpile JSX
              ],
              plugins: [
                [
                  '@babel/plugin-transform-react-jsx',
                  {
                    'importSource': '@bpmn-io/properties-panel/preact',
                    'runtime': 'automatic'
                  }
                ]
              ]
            }
          }
        },
        {
          test: /\.svg$/, // Match .svg files
          use: ["react-svg-loader"], // Use file-loader to handle SVGs
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "**/*.{html,css,woff,ttf,eot,svg,woff2,ico}",
            context: `${sourcePath}/`,
          },
        ],
      }),
      new webpack.DefinePlugin({
        "process.env.SOURCE_VERSION": JSON.stringify(SOURCE_VERSION || null),
      }),
      new NormalModuleReplacementPlugin(
        /^preact(\/[^/]+)?$/,
        function(resource) {

          const replMap = {
            'preact/hooks': path.resolve('node_modules/@bpmn-io/properties-panel/preact/hooks/dist/hooks.module.js'),
            'preact/jsx-runtime': path.resolve('node_modules/@bpmn-io/properties-panel/preact/jsx-runtime/dist/jsxRuntime.module.js'),
            'preact': path.resolve('node_modules/@bpmn-io/properties-panel/preact/dist/preact.module.js')
          };

          const replacement = replMap[resource.request];

          if (!replacement) {
            return;
          }

          resource.request = replacement;
        }
      ),
      new NormalModuleReplacementPlugin(
        /^preact\/hooks/,
        path.resolve('node_modules/@bpmn-io/properties-panel/preact/hooks/dist/hooks.module.js')
      )
    ],
    resolve: {
      // symlinks: false,
      mainFields: [
        'browser',
        'module',
        'main'
      ],
      alias: {
        'preact': '@bpmn-io/properties-panel/preact',
        'react': '@bpmn-io/properties-panel/preact/compat',
        'react-dom': '@bpmn-io/properties-panel/preact/compat'
      },
      modules: [
        'node_modules',
        linkedPackagePath,
      ]
    },
    mode,
    devtool: "source-map"
  };
}
