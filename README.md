# Oracle CX Commerce webpack plugin

## Usage

Install the module:

```$xslt
yarn add -D occ-webpack-plugin
// or
npm install occ-webpack-plugin
```

Now you can use DCU in your CI/CD pipelines.

```javascript
const WebpackOnBuildPlugin = require("occ-webpack-plugin");

new WebpackOnBuildPlugin({
  platform: path.resolve(__dirname, "platform"),
});
```

## Deployment

Install the module:

```$xslt
yarn add -D @oraclecc/dcu
// or
npm install @oraclecc/dcu
```

Transfer all files to the given Commerce Cloud administration interface from the platform folder.

```$xslt
cd platform/
npx dcu -k $APP_KEY -n $APP_NODE -x .
```
