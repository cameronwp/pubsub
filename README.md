# @cameronwp/pubsub

Shamelessly based on https://davidwalsh.name/pubsub-javascript. Adds the concept of history so new subscriptions can optionally receive a topic published before the subscription was created.

Note: Node only.

```sh
npm i -S @cameronwp/pubsub
```

## Usage

Subscribe to `topic`s and receive `message`s when a `topic` is published.

```js
// script.js
const Pubsub = require('@cameronwp/pubsub');

const ps = new Pubsub();


```
