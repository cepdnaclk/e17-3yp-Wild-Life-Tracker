## HTTPS Implementation
OpenSSL was used.
OpenSSL is a robust, commercial-grade, and full-featured toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols. It is also a general-purpose cryptography library.
sudo apt-get install apache2 openssl

### Steps for SSL cert generation
1. Generate a private key -> openssl genrsa -out key.pem
2. Create a CSR (certificate signing request) using private key
        (Since we create the certificate in this situation)
        generate cert
        openssl req -new -key key.pem -out csr.pem
3. Generate the SSL certification from CSR
        openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
