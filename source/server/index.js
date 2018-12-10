'use-strict'

// // HTTP2 experiment
// const httpServer = require('./httpServer.js')
// httpServer.createSecureHttp2Server('./private/certificates/', 8443);

const http = require('http')
const pug = require('pug')
const fs = require('fs')
const path = require('path')
const url = require('url')

// TODO - make ENV var
const _PORT_ = process.env.PORT | 8080

const routesDict = new Object()
routesDict['/'] = 'Home Page'
routesDict['/list'] = 'List Page'

const server = http.createServer((request, response) => {
    console.time('Response time')
    const requesterIp = response.socket.remoteAddress;
    const requesterPort = response.socket.remotePort;

    

    console.log(`Route for ${routesDict[request.url]}`)

    switch (request.url) {
        case '/list' :

            response.setHeader('Content-Type', 'text/html');
            response.end(listPage())

            break

        case '/' :

            response.setHeader('Content-Type', 'text/html');
            response.end(homePage())

            break

        case '/static' :

            serveStaticFiles(request, response)

            break

        default : 

            response.setHeader('Content-Type', 'text/html');
            response.end('NOT FOUND')

            break
    }

    console.log(`${request.method} ${request.url}`)
    console.log(`From: ${requesterIp}:${requesterPort}`)
    console.timeEnd('Response time')
})

server.listen(_PORT_, () => {
    console.log(`Server listening on port ${_PORT_}`)
})

function homePage() {

    // Compile the source code
    const compiledFunction = pug.compileFile('./source/server/views/index.pug');

    // Render a set of data
    const html = compiledFunction({
        title: 'Index',
        content: 'Hello World'
    });

    return html
}

function listPage() {
    return `
    
        404

    `
}

function serveStaticFiles(req, res) {


    // parse URL
    const parsedUrl = url.parse(req.url);

    // extract URL path
    // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
    // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
    // by limiting the path to current directory only
    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, sanitizePath);
    
    fs.exists(pathname, function (exist) {

        if(!exist) {
            // if the file is not found, return 404
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }

        // read file from file system
        fs.readFile(pathname, function(err, data){
            if(err){
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            }
            else {
                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const ext = path.parse(pathname).ext;
                // if the file is found, set Content-type and send data
                res.setHeader('Content-type', allowedMimeTypes[ext] || 'text/plain' );
                res.end(data);
            }

        });


        // maps file extention to MIME types
        const allowedMimeTypes = {
            // '.html': 'text/html',
            '.ico': 'image/x-icon',
            '.css': 'text/css',
            '.js': 'text/javascript',
            // '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpg': 'image/gif',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf',
            // '.doc': 'application/msword',
            // '.eot': 'appliaction/vnd.ms-fontobject',
            // '.ttf': 'aplication/font-sfnt'
        }
    });
}


