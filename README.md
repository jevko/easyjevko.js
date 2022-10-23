# easyjevko.js

[![](https://data.jsdelivr.com/v1/package/gh/jevko/easyjevko.js/badge)](https://www.jsdelivr.com/package/gh/jevko/easyjevko.js)

**easyjevko.js** is a JavaScript library for Easy Jevko -- a simple data format built on [Jevko](https://jevko.org).

The library can convert between something like this:

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
  "id": "johnny",
  "display name": "John Doe",
  "organization id": "megacorp",
  "follower ids": ["roger", "alice", "bob"]
}
```

<!-- todo -->

See [library functions](#library-functions).

# Applications

Easy Jevko can serve as a simple configuration, interchange, or serialization format or as a template for building more advanced formats on top of Jevko.

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
const {fromString} = await import('https://cdn.jsdelivr.net/gh/jevko/easyjevko.js/bundle.js')

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
  "id": "johnny",
  "display name": "John Doe",
  "organization id": "megacorp",
  "follower ids": ["roger", "alice", "bob"]
}
```

This imports the latest version of easyjevko.js from github via [jsDelivr](https://www.jsdelivr.com/), extracts the [fromString](#fromstring) function from it and calls it on a string, obtaining a JS object as a result.

## Installation

The examples install version 0.1.3. Adjust as needed.

### Node.js

Note: requires Node.js >= 13.2.0.

```
npm install jevko/easyjevko.js#semver:0.1.3
```

Then either use a dynamic import:

```js
import("easyjevko.js").then(({fromString, toString}) => {
  console.log(fromString('a [b]')) // -> {"a": "b"}
})
```

or, if you have [ECMAScript modules enabled](https://nodejs.org/api/esm.html#enabling), simply:

```js
import {fromString, toString} from "easyjevko.js"

console.log(fromString('a [b]')) // -> {"a": "b"}
```

### Deno and the browser

Import from [jsDelivr](https://www.jsdelivr.com/):

```js
import {fromString, toString} from 'https://cdn.jsdelivr.net/gh/jevko/easyjevko.js@v0.1.3/mod.js'
```

# Library functions

## fromString

Input: string which contains a Jevko.

Description:

* A Jevko without subjevkos is converted to a string.
* A Jevko with subjevkos is converted to an array or an object. The first subjevko decides which:
  * If the first subjevko has empty or whitespace-only prefix then the Jevko will be converted to an array.
  * Otherwise the Jevko will be converted to an Object.
* Leading and trailing spaces in object keys are ignored.

Output: JavaScript object/array/string.

```js
fromString('a [b]') // -> {"a": "b"}
```

## toString

Input: JavaScript object/array/string, arbitrarily nested.

Restrictions: empty arrays and objects are not allowed. Empty keys or keys with leading and trailing spaces in objects are not allowed.

Output: pretty-printed string which contains a Jevko.

```js
toString({"a": "b"}) // -> 'a [b]'
```

## fromJevko

Input: a Jevko, as returned by [`parseJevko`](https://github.com/jevko/parsejevko.js).

Description:

* A Jevko without subjevkos is converted to a string.
* A Jevko with subjevkos is converted to an array or an object. The first subjevko decides which:
  * If the first subjevko has empty or whitespace-only prefix then the Jevko will be converted to an array.
  * Otherwise the Jevko will be converted to an Object.
* Leading and trailing spaces in object keys are ignored.

Output: JavaScript object/array/string. 

```js
fromJevko(parseJevko('a [b]')) // -> {"a": "b"}
```

## toJevko

Input: JavaScript object/array/string, arbitrarily nested.

Restrictions: empty arrays and objects are not allowed. Empty keys or keys with leading and trailing spaces in objects are not allowed.

Output: a Jevko.

```js
toJevko({"a": "b"}) // -> {"subjevkos":[{"prefix":"a","jevko":{"subjevkos":[],"suffix":"b"}}],"suffix":""}
```

***

[MIT License](LICENSE)

© 2022 [Jevko.org](https://jevko.org)

