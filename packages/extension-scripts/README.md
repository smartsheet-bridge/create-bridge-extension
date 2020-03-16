# @smartsheet-bridge/extension-scripts

A development dependency tool for assisting the development and maintenance of a third-party extension for Bridge by Smartsheet.

---

**Please refer to Bridge by Smartsheet's documentation for how to build an extension.**

# Installation

This package is intended to be installed as a **development dependency** for each extension.

#### yarn

```bash
yarn add -D @smartsheet-bridge/extension-scripts
```

#### npm

```bash
npm install -D @smartsheet-bridge/extension-scripts
```

# Setup

Once installed, this tool can be run directly from the root directory of the extension via:

```bash
./node_module/.bin/extension-scripts <command> [options]
```

Or, it can be run via the npm scripts property in the package.json.

```json
...
"scripts": {
  "deploy": "extension-scripts deploy",
  "revoke": "extension-scripts revoke",
  "logs": "extension-scripts logs"
}
...
```

# Usage

## Commands

### `deploy`

This command will deploy your extension to your Bridge by Smartsheet account for use with the platform.

```bash
$ extension-scripts  deploy [options]
```

| option, alias | description                                                                                |
| ------------- | ------------------------------------------------------------------------------------------ |
| `--url`       | Account URL to deploy to. See [Authentication](#Authentication).                           |
| `--key`       | Authorized API Key for given account URL. See [Authentication](#Authentication).           |
| `--env`       | Set environment environments variables for deployed extension. See [ENV Vars](#ENV%20Vars) |
| `--include`   | Pattern to include filenames when packaging for deployment.                                |
| `--exclude`   | Pattern or array of patterns to exclude filenames when packaging for deployment.           |
| `--symlinks`  | Follow symlinks when packaging extension for deployment.                                   |

### `revoke`

This command will revoke your extension from your Bridge by Smartsheet account.

```bash
$ extension-scripts revoke [options] [extension name]
```

If no `extension name` is given then the command will attempt to read the name from the current working directory.

| option, alias | description                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| `--url`       | Account URL to deploy to. See [Authentication](#Authentication).                 |
| `--key`       | Authorized API Key for given account URL. See [Authentication](#Authentication). |
| `--force, -f` | Will force the removal of an extension.                                          |

### `logs`

This command will stream `console.log` and `console.error` from your extension running on Bridge by Smartsheet platform.

```bash
$ extension-scripts logs [options] [extension name]
```

If no `extension name` is given then the command will attempt to read the name from the current working directory.

| option, alias     | description                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| `--url`           | Account URL to deploy to. See [Authentication](#Authentication).                 |
| `--key`           | Authorized API Key for given account URL. See [Authentication](#Authentication). |
| `--minutes`, `-m` | The number of minutes, in the past, to start streaming logs from.                |

## Options

Options can be provided inline, as environment variables, in a configuration file, or as part of the `extension` property in the `package.json` file and are prioritized in the following order:

1. Inline arguments
2. Environment variables
3. `extension` property of `package.json`
4. Configuration file
   1. `.extensionrc`
   2. `.extensionrc.json`
   3. `.extensionrc.yaml`
   4. `.extensionrc.yml`
   5. `.extensionrc.js`

#### Inline

Inline options take priority over other methods and come directly after the `[command]` formatted like `--[option]=[value]`.

Some inline options have an alias that shorten the format to `-[alias] [value]`. E.g. `--minutes=5` becomes `-m 5`.

_**Tip**: You can see all the options available for any command by running the command with the `--help` option like `extensions-scripts deploy --help`._

#### Environment Variables

_**Note**: this section describes ENV variables for your development environment. See [ENV Vars](#ENV%20Vars) for setting runtime environment variables for an extension._

Options can be configured via environment variables and come in the format of uppercase and prepended with `EXTENSION_`. E.g. `--url=[account url]` becomes `EXTENSION_URL:[url]`. Environment variables take priority over all but inline options.

#### Configuration files

Options can be configured as part of a configuration file in JSON or YAML.

**JSON**

```json
{
  "url": "https://example.converse.ai",
  "env": {
    "MY_FIRST_ENV": "hello",
    "MY_SECOND_ENV": "world"
  }
}
```

**YAML**

```yml
url: https://example.converse.ai
env:
  MY_FIRST_ENV: hello
  MY_SECOND_ENV: world
```

_**Tip**: Configuration files can be extended using the `extends` property. This can be set to a local file, or an NPM module._

#### `package.json`

Configuration options can also be read from the `extension` property of your `package.json` file. The structure is exactly the same as the JSON configuration structure above.

_**Tip**: The `extension` property can also include the `extends` property from that will function exactly as described above._

### List of global options

These options can be appended to any command.

| command, alias     | description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| `--help`           | Show help of the current command.                                   |
| `--version`        | Show version of the tool.                                           |
| `--loglevel`, `-l` | Level of output logs to print. See [Output Logs](#Output%20Logs).   |
| `--debug`, `-d`    | Regex pattern to match debug logs. See [Debug Logs](#Debug%20Logs). |

# Guides

## Authentication

To authenticate with your Bridge by Smartsheet platform you need to supply a URL and API Key using the options `--url` and `--key` respectively. E.g.

```bash
$ extension-scripts --url=[account url] --key=[account api key]
```

**`--url`**

Use this option to provide the URL of your Bridge by Smartsheet account in the form of `https://example.bridge.smartsheet.com`.

_This is the same URL that you visit in the browser when accessing the Bridge by Smartsheet app._

```bash
$ extension-scripts deploy --url=https://example.bridge.smartsheet.com
```

**`--key`**

Use this option to provide an authorized API Key for the given URL in the form of `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`.

_You can access these via the Bridge by Smartsheet user interface by clicking on the user icon in the top right-hand corner, and choosing "API Keys". From there you may copy an existing key or create a new one._

**Warning: these keys provide the holder with full access to your Bridge by Smartsheet account. DO NOT commit these keys to any git repository.**

```bash
$ extension-scripts deploy --key=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

## Output Logs

When each command runs it will print out various logs to the command line interface at different levels of severity ranked in importance by `ERROR`, `WARN`, `INFO`, `VERBOSE`. These can be filtered using the `--loglevel` option and is defaulted to `INFO` meaning all `INFO` level logs and above (`ERROR`, `WARN`) will appear in the CLI.

There are five log levels to choose from.

| Level     | Severity shown                      |
| --------- | ----------------------------------- |
| `SILENCE` | -                                   |
| `ERROR`   | `ERROR`                             |
| `WARN`    | `ERROR`, `WARN`                     |
| `INFO`    | `ERROR`, `WARN` , `INFO`            |
| `VERBOSE` | `ERROR`, `WARN` , `INFO`, `VERBOSE` |

_**Note**: Changing the `--loglevel` option does not affect `extension.log` output. All severities of the output log and all debug logs will be printed in this file._

## Debug Logs

Debug logs are always stored in the `extension.log` file by default but if you want to print them in the CLI then you can use the `--debug` option and pass a regular expression. E.g. `--debug=.*` will print all debug statements to the CLI

_**Note**: Changing the `--debug` option does not affect `extension.log` output. All severities of the output log and all debug logs will be printed in this file._

## ENV Vars

_**Note**: this section describes ENV variables for an extension in a runtime environment. See [Options](#Options) for development environment variables for this tool._

When an extension runs in a production platform, it's possible to set environment variables. This is useful for potentially sensitive information like third-party API keys where you don't want to risk storing them in a git repository but also useful for other activities.

To do this you can set them with the `--env` option when using the `deploy` command. These can be accepted in any form that options allow as objects where the key is the environment variable and the value is the value.

**Inline**

```bash
$ extension-scripts deploy --env=MY_FIRST_ENV:hello --env:MY_SECOND_ENV:world
```

**JSON**

```json
{
  "env": {
    "MY_FIRST_ENV": "hello",
    "MY_SECOND_ENV": "world"
  }
}
```

**YAML**

```yml
env:
  MY_FIRST_ENV: hello
  MY_SECOND_ENV: world
```

_**Warning**: if using configuration files to set ENV vars for production, please be careful not to commit any code to a git repository._
