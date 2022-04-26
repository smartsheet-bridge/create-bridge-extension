# @smartsheet-bridge/extensionrc-legacy

Shareable configuration file for legacy extensions using Bridge by Smartsheet tooling.

---

# Usage

## Why do I need this?

If you developed an extension for the Bridge by Smartsheet platform using a legacy tool called [`converse-cli`](https://www.npmjs.com/package/converse-cli) but are using, or want to use, the internally supported [`@smartsheet-bridge/extension-scripts`](https://www.npmjs.com/package/@smartsheet-bridge/extension-scripts) tool going forward, then you can use this sharable configuration package to get started out of the box.

## How do I use this?

1. Install it as a `devDependency`

```bash
npm install @smartsheet-bridge/extensionrc-legacy --save-dev
```

2. Extend it in your package.json or in a separate [configuration file](https://www.npmjs.com/package/@smartsheet-bridge/extension-scripts#configuration-files).

```json
// package.json
{
  //...
  "extension": {
    "extends": "@smartsheet-bridge/extensionrc-legacy"
  }
}
```

## What is included?

This package exports a configuration object that can be extended and read by [`@smartsheet-bridge/extension-scripts`](https://www.npmjs.com/package/@smartsheet-bridge/extension-scripts) to help development of legacy Bridge by Smartsheet extensions also known as plugins. It exports the following object.

```js
{
  specFile: 'plugin.json',
  clean: false,
  build: false,
}
```
