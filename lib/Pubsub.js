'use strict';
// based on https://davidwalsh.name/pubsub-javascript

/**
 * Callback that gets called when a topic is published.
 * @callback listener
 * @param {any} info.
 * @param {String} topic
 */

/**
 * The resulting subscription.
 * @property {function} remove Removes the listener from the topic.
 * @callback subscription
 */

/**
 * Creates a means for publishing and subscribing to events with callbacks.
 * @class Pubsub
 */
function Pubsub() {
  let history = {};
  let topics = {};
  const hOP = topics.hasOwnProperty;

  /**
   * Subscribe a callback to be called when a topic is published.
   * @function subscribe
   * @memberof Pubsub
   * @param {String} topic
   * @param {listener} callback
   * @param {boolean} [historical=true] Whether or not to immediately call the listener on the last published value for this topic (if it exists).
   */
  this.subscribe = function(topic, listener, historical = false) {
    // Create the topic's object if not yet created
    if (!hOP.call(topics, topic)) {
      topics[topic] = [];
    }

    // If this topic has already been published, call the
    // listener on the last publication.
    if (historical && hOP.call(history, topic)) {
      listener(history[topic] != undefined ? history[topic] : {});
    }

    // Add the listener to queue
    const index = topics[topic].push(listener) - 1;

    // Provide handle back for removal of topic
    return {
      remove() {
        delete topics[topic][index];
      }
    };
  };

  /**
   * Publish a topic.
   * @function publish
   * @memberof Pubsub
   * @param {any} info
   */
  this.publish = function(topic, info) {
    // save this info regardless
    history[topic] = info;

    // If the topic doesn't exist, or there's no listeners in queue, leave
    if (!hOP.call(topics, topic)) {
      return;
    }

    // Cycle through topics queue, fire!
    topics[topic].forEach(function(item) {
      item(info != undefined ? info : {});
    });
  };

  this.clear = () => {
    history = {};
    topics = {};
  };
}

module.exports = Pubsub;
