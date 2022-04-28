# @smartsheet-bridge/extensionrc-standard

Shareable configuration file for standard JavaScript and TypeScript extensions using Bridge by Smartsheet tooling. 

_This configuration is installed by default with [@smartsheet-bridge/extension-scripts](https://www.npmjs.com/package/@smartsheet-bridge/extension-scripts)._

---

# Usage

## Why do I need this?

This sharable configuration file defines a basic config for [@smartsheet-bridge/extension-scripts](https://www.npmjs.com/package/@smartsheet-bridge/extension-scripts). 

## How do I use this?

By default, this comes installed as part of [@smartsheet-bridge/extension-scripts](https://www.npmjs.com/package/@smartsheet-bridge/extension-scripts) so there's no need to install this manually.

## How do I extend this?

1. Extend it in your `package.json` or in a separate [configuration file](https://www.npmjs.com/package/@smartsheet-bridge/extension-scripts#configuration-files).

```json
// package.json
{
  //...
  "extension": {
    "extends": "@smartsheet-bridge/extensionrc-standard"
  }
}
```

## What is included?

This package exports a configuration object that can be extended and read by [`@smartsheet-bridge/extension-scripts`](https://www.npmjs.com/package/@smartsheet-bridge/extension-scripts) to help development of Bridge by Smartsheet extensions. It exports the following object.

```js
{
  specFile: 'extension.json',
  exclude: [
    '**/.*',
    '**/*.log',
    '**/node_modules/**',
    '**/{test,tests,mock,mocks,__test__,__tests__,__mock__,__mocks__}/**',
    '**/*.{spec,test}.{js,ts}',
  ],
}
```
