const http2 = require('http2');
const fs = require('fs');

function createSecureHttp2Server(pathToCerts, port) {

    const secureServerOptions = {
        key: fs.readFileSync(pathToCerts + 'localhost-key.pem'),
        cert: fs.readFileSync(pathToCerts + 'localhost-cert.pem')
    }

    const server = http2.createSecureServer(secureServerOptions);

    server.on('error', (error) => console.error(error));

    server.on('stream', (stream, headers) => {
        // stream is a duplex
        stream.respond({
            'content-type': 'text/html',
            'status': 200
        });
        stream.end('<h1>Hello HTTP/2 World!<h1>');
    });

    server.listen(port);

    return server
}

module.exports.createSecureHttp2Server = createSecureHttp2Server; 