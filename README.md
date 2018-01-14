# @cameronwp/pubsub

Shamelessly based on https://davidwalsh.name/pubsub-javascript. Adds the concept of history so new subscriptions can optionally receive a topic published before the subscription was created.

Note: Node only.

```sh
npm i -S @cameronwp/pubsub
```

## Sample Usage

Subscribe to `topic`s and receive `message`s when a `topic` is published.

**Base usage**

```js
// script.js
const Pubsub = require('@cameronwp/pubsub');

const ps = new Pubsub();

const topic = 'action';
ps.subscribe(topic, info => {
    console.log(`message published: ${info}`);
});
ps.publish(topic, 'new message!'); // will result in: "message published: new message!"
```

**Removing a subscription**

```js
// script.js
const Pubsub = require('@cameronwp/pubsub');

const ps = new Pubsub();

const topic = 'action';
const subscription = ps.subscribe(topic, info => {
    console.log(`message published: ${info}`);
});
subscription.remove();
ps.publish(topic, 'new message!'); // nothing happens
```

**Subscribing _after_ a topic has been published**

```js
// script.js
const Pubsub = require('@cameronwp/pubsub');

const ps = new Pubsub();

const topic = 'action';
ps.publish(topic, 'new message!');
const subscription = ps.subscribe(topic, info => {
    console.log(`message published: ${info}`);
}, true); // note the 'true' here indicating that the listener should be called against the last publication
// immediately logs "message published: new message!"
```

## API

### Classes

<dl>
<dt><a href="#Pubsub">Pubsub</a></dt>
<dd></dd>
</dl>

### Functions

<dl>
<dt><a href="#subscribe">subscribe(topic, callback, [historical])</a> ⇒ <code><a href="#subscription">subscription</a></code></dt>
<dd><p>Subscribe a callback to be called when a topic is published.</p>
</dd>
<dt><a href="#publish">publish(topic, info)</a></dt>
<dd><p>Publish a topic.</p>
</dd>
<dt><a href="#clear">clear()</a></dt>
<dd><p>Remove all listeners and clear the history.</p>
</dd>
</dl>

### Typedefs

<dl>
<dt><a href="#listener">listener</a> : <code>function</code></dt>
<dd><p>Callback that gets called when a topic is published.</p>
</dd>
<dt><a href="#subscription">subscription</a> : <code>function</code></dt>
<dd><p>The resulting subscription.</p>
</dd>
</dl>

<a name="Pubsub"></a>

### Pubsub
**Kind**: global class
<a name="new_Pubsub_new"></a>

#### new Pubsub()
Creates a means for publishing and subscribing to events with callbacks.

<a name="subscribe"></a>

### subscribe(topic, callback, [historical]) ⇒ [<code>subscription</code>](#subscription)
Subscribe a callback to be called when a topic is published.

**Kind**: global function

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| topic | <code>string</code> |  |  |
| callback | [<code>listener</code>](#listener) |  |  |
| [historical] | <code>boolean</code> | <code>false</code> | Whether or not to immediately call the listener on the last published value for this topic (if it exists). |

<a name="publish"></a>

### publish(topic, info)
Publish a topic.

**Kind**: global function

| Param | Type |
| --- | --- |
| topic | <code>string</code> |
| info | <code>any</code> |

<a name="clear"></a>

### clear()
Remove all listeners and clear the history.

**Kind**: global function
<a name="listener"></a>

### listener : <code>function</code>
Callback that gets called when a topic is published.

**Kind**: global typedef

| Param | Type |
| --- | --- |
| info. | <code>any</code> |

<a name="subscription"></a>

### subscription : <code>function</code>
The resulting subscription.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| remove | <code>function</code> | Removes the listener from the topic. |

