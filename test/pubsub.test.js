'use strict';

const Pubsub = require('..');

describe('Pubsub', () => {
  let ps;

  beforeEach(() => {
    ps = new Pubsub();
  });

  it('should publish string messages by topic', done => {
    const topic = 'atopic!';
    const msg = 'testtesttest';
    ps.subscribe(topic, message => {
      message.should.equal(msg);
      done();
    });
    ps.publish(topic, msg);
  });

  it('should allow for multiple subscribers to a single topic', done => {
    let called = 0;
    const count = () => { called++; if (called === 3) done(); };

    const topic = 'atopic!';

    ps.subscribe(topic, count);
    ps.subscribe(topic, count);
    ps.subscribe(topic, count);

    ps.publish(topic);
  });

  it('should give access to historical messages', done => {
    const topic = 'atopic!';
    const msg = 'testtesttest';
    ps.publish(topic, msg);
    ps.subscribe(topic, message => {
      message.should.equal(msg);
      done();
    }, true);
  });

  it('should be able to remove individual subscriptions', done => {
    const topic = 'atopic!';
    const msg = 'testtesttest';

    // this one should get called
    const passCall = message => { message.should.equal(msg); done(); };
    // create a subscription that won't get removed
    ps.subscribe(topic, passCall);

    // this one shouldn't get called
    const failCall = message => { message.should.not.equal(msg); done(); };
    // create a subscription that'll get removed
    const sub = ps.subscribe(topic, failCall);

    sub.remove();

    ps.publish(topic, msg);
  });

  it('should be able to clear topics', done => {
    const topic = 'atopic!';
    const msg = 'testtesttest';

    ps.publish(topic, msg);

    ps.clear();

    // this one shouldn't get called
    const failCall = message => { message.should.not.equal(msg); done(); };
    // create a subscription that'll never get called
    ps.subscribe(topic, failCall);
    ps.publish(topic, 'anothermessage');
  });
});
