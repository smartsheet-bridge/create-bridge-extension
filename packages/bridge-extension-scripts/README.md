# @smartsheet-bridge/extension-scripts

A command line interface (CLI) tool for assisting the development and maintenance of [Bridge by Smartsheet](https://www.smartsheet.com/platform/bridge) extensions.

---

**Please refer to Bridge by Smartsheet's [documentation](https://smartsheet-bridge.github.io/create-bridge-extension/) for how to build an extension.**

# Installation

#### yarn

```bash
yarn add -D @smartsheet-bridge/extension-scripts
```

#### npm

```bash
npm install -D @smartsheet-bridge/extension-scripts
```

# Setup

This tool is designed to be installed as a devDependency and interacted with through `npm` or `yarn` scripts.

```json title="package.json"
{
  // ...
  "scripts": {
    "logs": "extension-scripts logs",
    "revoke": "extension-scripts revoke",
    "deploy": "extension-scripts deploy",
    "build": "extension-scripts build"
  }
}
```

It can also be ran directly in the terminal.

```bash
./node_module/.bin/extension-scripts <command> [options]
```

# Usage

**Please see the Bridge by Smartsheet documentation for [usage](https://smartsheet-bridge.github.io/create-bridge-extension/api/extension-scripts).**
