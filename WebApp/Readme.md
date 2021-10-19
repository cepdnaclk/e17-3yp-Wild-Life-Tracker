# Folders (Mainly for server)
client -> react code
config -> congfiguration files (.env)
middleware -> check authentication between the routes (In the middleware.js, we can write a function that acts as     middleware to get a token from a request and proceeds only when the token is validated.)
        JWT Authentication Middleware: verify SignUp, verify token
    Authorization Middleware: check User’s roles with record in database
models -> data models
routes -> for express routes
cert -> SSL certification

## Notes

### .env files
npm dotenv -> Zero dependency module that loads enviroment varaibles from a .env file into process.env
enviroment variables -> Enviroment variables allow the app to behave differently based on the enviroment. (many platforms)
***Can run the app anywhere by modifying the env variables without changing the code

### mongoose
This is an Object Data Modeling (ODM) library for MongoDB

### mongoose-unique-validator
A plugin which adds pre-savevalidation for unique fields within a Mongoose schema.
Makes error handeling much easier -> will get a Mongoose validation error

### bcrypt
A password hashing function
(This is a library to help hash passwords)

### JSON web tokens
JWT is a type of token-based authentication. For every single request from a client to the server, a token is passed for authentication. It supports the stateless API calls.
JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.
x-access-token: [header].[payload].[signature]

### Express
Via Express routes, HTTP request that matches a route will be checked by CORS Middleware before coming to Security layer.

### express-validator
This npm package is used for input validation at the backend.
Provides an extra layer of security against attacks.

## body-parser
This package is used to turn the req body into JSON type objects.

## Amazone S3
Amazone cloud storage system that allows us to easily store files in the cloud.
(Store images)

## IAM service
Identity and acess management console
Create a policy
Create a user for the web app and add the policy

## AWS SDK
npm package to use the AWS services

## Firebase
Experince, minimize cost, maximize time