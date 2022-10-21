# easyjevko.js

[![](https://data.jsdelivr.com/v1/package/gh/jevko/easyjevko.js/badge)](https://www.jsdelivr.com/package/gh/jevko/easyjevko.js)

**easyjevko.js** is a JavaScript library for Easy Jevko -- a simple data format built on [Jevko](https://jevko.org).

It can convert between something like this:

```clj
id [johnny]
display name [John Doe]
organization id [megacorp]
follower ids [
  [roger]
  [alice]
  [bob]
]
```

and something like this:

```js
{
  "id": 'johnny',
  "display name": "John Doe",
  "organization id": "megacorp",
  "follower ids": ["roger", "alice", "bob"]
}
```

<!-- todo -->

See [library functions](#library-functions).

# Ultraquickstart: Node.js or Deno REPL

To try out the library immediately without installing it, you can use the REPL (read–eval–print loop, aka interactive shell) of your JavaScript runtime. Below are instructions for Node.js and Deno.

## Step 1. Start the REPL

### a) Node.js variant

Note: this requires a version of Node.js which supports the [`--experimental-network-imports` flag](https://nodejs.org/docs/latest-v17.x/api/esm.html#https-and-http-imports) (v17 or up).

Start the REPL by running the following in the terminal:

```
node --experimental-network-imports
```

### b) Deno variant

Start the REPL by running the following in the terminal:

```
deno
```

## Step 2.

Paste the following into the REPL:

```js
const {fromString} = await import('https://cdn.jsdelivr.net/gh/jevko/easyjevko.js@0.1.0/mod.js')

fromString(`
id [johnny]
display name [John Doe]
organization id [megacorp]
follower ids [
  [roger]
  [alice]
  [bob]
]
`)
```

The result should be something like:

```js
{
  "id": 'johnny',
  "display name": "John Doe",
  "organization id": "megacorp",
  "follower ids": ["roger", "alice", "bob"]
}
```

## Installation

### Node.js

```
npm install jevko/easyjevko.js#semver:0.1.0
```

### Deno and the browser

Import from [jsDelivr](https://www.jsdelivr.com/):

```js
import {parseJevko} from 'https://cdn.jsdelivr.net/gh/jevko/queryjevko.js@v0.1.0/mod.js'
```

***

[MIT License](LICENSE)

© 2022 [Jevko.org](https://jevko.org)

