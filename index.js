'use-strict'

const server = require('./httpServer.js').createSecureHttp2Server('./private/certificates/', 8443);

// 5min timeout
setTimeout( () => {server.close();}, 5*60*1000);

