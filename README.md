# [Oracle CX Commerce](https://cloud.oracle.com/en_US/commerce-cloud "Oracle Commerce Cloud") webpack plugin

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

## Related
* [create-occ-react-app](https://github.com/oracle-commerce-cloud/create-occ-react-app "occ-react-scripts") and [occ-react-scripts](https://www.npmjs.com/package/occ-react-scripts "occ-react-scripts")
* [occ-react-components.ts](https://github.com/oracle-commerce-cloud/occ-react-components.ts "occ-react-components.ts")
* [Design-Code-Utility](https://www.npmjs.com/package/@oraclecc/dcu "dcu")
