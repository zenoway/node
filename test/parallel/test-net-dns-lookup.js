'use strict';
require('../common');
var assert = require('assert');
var net = require('net');
var ok = false;

var server = net.createServer(function(client) {
  client.end();
  server.close();
});

server.listen(0, '127.0.0.1', function() {
  net.connect(this.address().port, 'localhost')
    .on('lookup', function(err, ip, type, host) {
      assert.equal(err, null);
      assert.equal(ip, '127.0.0.1');
      assert.equal(type, '4');
      assert.equal(host, 'localhost');
      ok = true;
    });
});

process.on('exit', function() {
  assert(ok);
});
