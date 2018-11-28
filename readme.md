# minimal-node-server

## HTTP/2
>HTTP/2 can send multiple requests for data in parallel over a single TCP connection. This is the most advanced feature of the HTTP/2 protocol because it allows you to download web files via ASync mode from one server.

>It's fully backwards-compatible with HTTP/1.1, meaning websites will work the same with either protocol. ... Once the browser and server agree to use HTTP/2, they can utilize features such as compression, multiplexing, and server push to optimize the connection.

>HTTP/2 supports queries multiplexing, headers compression, priority and more intelligent packet streaming management. This results in reduced latency and accelerates content download on modern web pages.

### Generating the keys for HTTP/2
When running the openssl command on windows we have to start `-subj` paths with `//`. 
`openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-privatekey.pem -out localhost-cert.pem`


### Might also need to create a CA cert for localhost
- https://letsencrypt.org/docs/certificates-for-localhost/
- https://superuser.com/questions/1260620/how-to-create-a-windows-localhost-certificate-based-on-a-local-ca

### Node TLS/SSL example using openssl commands
- https://nodejs.org/api/tls.html#tls_tls_ssl_concepts

>

Generate a private key
`openssl genrsa -out localhost-key.pem 2048`

Generate a CSR (Certificate Signing Request) for that private key
`openssl req -new -sha256 -key localhost-key.pem -out localhost-csr.pem`

>Once the CSR file is generated, it can either be sent to a Certificate Authority for signing or used to generate a self-signed certificate.

`openssl x509 -req -in localhost-csr.pem -signkey localhost-key.pem -out localhost-cert.pem`

>Once the certificate is generated, it can be used to generate a .pfx or .p12 file:

`openssl pkcs12 -export -in localhost-cert.pem -inkey localhost-key.pem -certfile ca-cert.pem -out localhost.pfx`

>Where:
>`in`: is the signed certificate
>`inkey`: is the associated private key
>`certfile`: is a concatenation of all Certificate Authority (CA) certs into a single file, e.g. `cat ca1-cert.pem ca2-cert.pem > ca-cert.pem`


## References
- [Mozilla Docs - Node server without a framework](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework)
- [Node HTTP2](https://nodejs.org/api/http2.html)