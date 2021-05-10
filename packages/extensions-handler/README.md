# Extension Handler

Library to help build entry points for Smartsheet extensions.

_This library is **NOT** intended to be used directly but instead by other libraries._

# Quick Start

This library exports a function called `createExtensionHandler` that takes a series of "enhancers" and returns a function that should be exported as the entry point to a Smartsheet extension.

```ts
export const main = createExtensionHandler(
  ...middleware // Middleware enhancers go here.
);
```

# Usage

Enhancers can be used to enhance the functionality of the main handler. In most cases this is used to apply middleware to the flow of data or to modify the handler for use with other transports.

```ts
export const main = createExtensionHandler(httpTransport, handlePromises);
```

This will export a function that:

- Takes a `Request` object and a `Response` object
- Execute the handler
- Resolve any returned promises
- And send a 200 response with the value from the resolved promise.

# Enhancers

The handler by itself can't do much, but enhancers can be used to extend the functionality of the handler from defining the transport interface to applying middleware and handling business logic. The library comes with some useful enhancers built in.

### `httpTransport`

This enhancer will return a function that takes a `Request` and a `Response` and passes the `body` parameter from the request through to the handler (or next enhancer). Any response from the handler is converted to json and returned on the response with a `200` status.

**Note**: Should always be the first enhancer given and shouldn't be used with any other transport enhancers.

### `handleHasProperty`

This handler will throw `BadRequestError` if a given property does not exist on the payload.

```js
return createExtensibleHandler(handleHasProperty('abc'));
// Pass
{ "abc": 'Hello, World!' };
// Fail
{ "notAbc": 'Hello, World!' };
```

### `handlePing`

This handler will immediately return if the payload includes a property called `event` and it is equal to `PING`.

**Note:** This is an internal health check device and should always be included.

### `handlePromises`

This handler will take a returned Promise and wait for it to resolve before returning the resolved data.

```js
// index.js
return createExtensibleHandler(handlePromises);

// handler.js
return () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve('Hello,World!');
    }, 1000);
  });
```

### `handleThunks`

This handler will call a returned function with the callback as a parameter allowing handlers greater control of when to respond to the caller.

```js
// index.js
return createExtensibleHandler(handleThunks);

// handler.js
return () => respond => {
  // execute before handler responds
  respond();
  // execute after handler responds
};
```
