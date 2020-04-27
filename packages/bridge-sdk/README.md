# @smartsheet-bridge/bridge-sdk

An API wrapper around the Bridge by Smartsheet SDK.

---

# Quick Start

```
yarn add @smartsheet-bridge/bridge-sdk
```

or

```
npm install @smartsheet-bridge/bridge-sdk
```

## HTTP Client

The Bridge by Smartsheet API can be accessed through a REST HTTP via the HTTPClient in the the SDK.

```js
import { createHTTPClient } from '@smartsheet-bridge/bridge-sdk';

const bridge = createHTTPClient({
  baseURL: 'https://example.bridge.smartsheet.com',
  token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
});

const { data } = bridge.platform();
```

## gRPC Client

For some functionality, particularly to do with extensions, Bridge by Smartsheet offers gRPC end communication that can be accessed through the gRPC Client. There is no overlap between the HTTP API and the gRPC API.

```js
import { createGRPCClient } from '@smartsheet-bridge/bridge-sdk';
```

# Usage

To access the REST API you must supply the HTTP client with your `baseURL` and API `token`.

<p>
<details>
<summary><b>How do I find my <code>baseURL</code>?</b></summary>
<p>
Your <code>baseURL</code> is the URL of your Bridge by Smartsheet account API. You can use the helper function <code>parseAccountURL</code> to get the root of your account URL and then append <code>/api</code> to the end.
</p>
<p>
<em>For very advanced users, the API might not be served at <code>/api</code>. These users should contact their account manager for details.</em>
</p>
</details>
</p>

<p>
<details>
<summary><b>How do I find my API <code>token</code>?</b></summary>
<p>
You can create an API token from your Bridge by Smartsheet user interface. When logged in, click on the user icon in the top right of the interface and select "API Keys". From here you can create, delete, and copy API Keys to your clipboard.
</p>
<p>
<em>These API Keys have full read/write access to your Bridge by Smartsheet account so be careful with who you allow access. <b>Do not commit them to public version management repositories.</b></em>
</p>
</details>
</p>

## createHTTPClient

```js
import {
  createHTTPClient,
  parseAccountURL,
} from '@smartsheet-bridge/bridge-sdk';

// copied from the URL in your browser.
const accountURL = 'https://example.bridge.smartsheet.com/#/dashboard';
// use the helper function to parse the URL.
const { accountName, hostName, protocol } = parseAccountURL(accountURL);
// use the returned properties to build the baseURL
const http = createHTTPClient({
  baseURL: `${protocol}://${accountName}.${hostName}/api/`,
  token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
});
```

### Workspace

API calls will default to the default workspace in your account, to get access to resources on other workspaces you must provide a `workspace` UUID as part of the config. This can be done at create-time, runtime, or intercept time.

```js
const http = createHTTPClient({
  workspace: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
});
```

Or

```js
const http = createHTTPClient({ ... });
http.conversation.fetch({ uuid: '<conversationUUID>' }, {
  workspace: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
})
```

Or

```js
const http = createHTTPClient({ ... });
http.instance.request.use(config => {
  config.workspace = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
  return config;
});
```

See more info about interceptors [below](#/Instance).

## Advanced usage

### Instance

The Bridge HTTP client extends the very popular [Axios](https://github.com/axios/axios) library and provides full access to the axios object via the `instance` property.

This allows for interceptors to be created.

```js
const http = createHTTPClient({...});
http.interceptors.request.use(config => {
  console.log(`Logging request to ${config.url}`);
});
```

And raw HTTP calls to be made if the SDK has yet to implement them.

```js
http.get('/user');
```

### ESModules

By default the BridgeSDK is export as a commonJS module for use within NodeJS. For TypeScript, Babel, Webpack, or other ES6 focused projects like rollup there is also an ES6 export under the `/es` folder.

This allows the BridgeSDK to be imported as individual ESModules which can greatly reduce the size of your bundle and allow you to access the HTTP modules without importing the gRPC modules as well.

```js
// Will import everything including gRPC in an CommonJS format.
import * as bridge from '@smartsheet-bridge/bridge-sdk';
// Will import everything including gRPC but in an ESModule format.
import * as bridge from '@smartsheet-bridge/bridge-sdk/es';
// Will import all methods from the HTTP Module.
import * as bridge from '@smartsheet-bridge/bridge-sdk/es/http';
// Will only import the platform module.
import platform from '@smartsheet-bridge/bridge-sdk/es/http/platform';
// Will only import the get method from the platform module.
import { get } from '@smartsheet-bridge/bridge-sdk/es/http/platform';
```

Individual methods can be used with an Bridge/Axios client or using the default one.

Using the default client.

```js
import { get } from '@smartsheet-bridge/bridge-sdk/es/http/platform';

const { data } = await get({
  baseURL: 'https://example.bridge.smartsheet.com',
  token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
});
```

OR with Bridge client.

```js
import createHTTPClient from '@smartsheet-bridge/bridge-sdk/es/http/createInstance';
import { get } from '@smartsheet-bridge/bridge-sdk/es/http/platform';

const client = createHTTPClient({
  baseURL: 'https://example.bridge.smartsheet.com',
  token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
});

const { data } = await get(client)();
```

**This is early stage development and not ready for production consumers.**
