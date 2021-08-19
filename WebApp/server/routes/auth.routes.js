//auth routes

const express = require('express')
const userSchema = require('../models/users')
const confirmationSchema = require('../models/confirmation')
const adminSchema = require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authorize = require('../middleware/auth')     //Authentication middleware that we created
const { Router } = require('express')

const router = express.Router();

//For admin sign in
//For Sign-In user
router.post('/signin-admin',(req,res,next)=>{
    let getUser;                      //let allows to declare vars that are limited to the scope of a block statement

    adminSchema.findOne({            //functin in mongoose
        email: req.body.email       //get the email from the req body
    })
    .then(user => {
        if (!user){     //if no user
            return res.status((401).json({          //parse to json file
                message: "Authentication failed"
            }))
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password)     //compare the password
    })
    .then(response => {
        if(!response){
            return res.status(401).json({           //wrong password
                message: "Authentication Faild"
            })
        }

        //on sucessful auth the server creates a JET token or else an error
        let jwtToken = jwt.sign({           //Auth sucess (This is about jwt)
            email: getUser.email,           // .sign takes the payload, secret and option
            userId: getUser._id
        },"longer-secret-is-better",{
            expiresIn: '2h'                    //after 2h token is expired
        })

        res.status(200).json({          
            token: jwtToken,        //client gets the JWT token in the response body
            expiresIn: 6600,        //client stores that token in local storage
            msg: getUser
        })
        /*
        .catch((err)=>{                         //this should come after then --> check (When I add here when the req body is not with name it gives an error)
            return res.status(401).json({
                message: "Authentication Failed"
            })
        })
        */
        /*
        Form the next time, the client for making any req supplies the JWT token in req headers
        Server upon receiving the JWT validates it and sends sucessful redponde or else errors
        */
    })
    .catch((err)=>{                         //this should come after then (When I add this here works fine)
        return res.status(401).json({
            message: "Authentication Failed",
            error: err
        })
    })
})


//For Sign-In user
router.post('/signin-user',(req,res,next)=>{
    let getUser;                      //let allows to declare vars that are limited to the scope of a block statement

    userSchema.findOne({            //functin in mongoose
        email: req.body.email       //get the email from the req body
    })
    .then(user => {
        if (!user){     //if no user
            return res.status((401).json({          //parse to json file
                message: "Authentication failed"
            }))
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password)     //compare the password
    })
    .then(response => {
        if(!response){
            return res.status(401).json({           //wrong password
                message: "Authentication Faild"
            })
        }

        //on sucessful auth the server creates a JET token or else an error
        let jwtToken = jwt.sign({           //Auth sucess (This is about jwt)
            email: getUser.email,           // .sign takes the payload, secret and option
            userId: getUser._id
        },"longer-secret-is-better",{
            expiresIn: '2h'                    //after 2h token is expired
        })

        res.status(200).json({          
            token: jwtToken,        //client gets the JWT token in the response body
            expiresIn: 6600,        //client stores that token in local storage
            msg: getUser
        })
        /*
        .catch((err)=>{                         //this should come after then --> check (When I add here when the req body is not with name it gives an error)
            return res.status(401).json({
                message: "Authentication Failed"
            })
        })
        */
        /*
        Form the next time, the client for making any req supplies the JWT token in req headers
        Server upon receiving the JWT validates it and sends sucessful redponde or else errors
        */
    })
    .catch((err)=>{                         //this should come after then (When I add this here works fine)
        return res.status(401).json({
            message: "Authentication Failed",
            error: err
        })
    })
})

//Admin signup
// Signup 
router.post('/register-admin',(req,res,next)=>{
    bcrypt.hash(req.body.password, 10).then((hash)=>{        // .hash(data, salt, cb) -> look into salt
        const user = new adminSchema({                       //create a user for the DB entry
            name: req.body.name,
            email: req.body.email,
            password: hash          //password was hashed
        })

        user.save().then((response) => {            //mongoose method to save
            res.status(201).json({
                message: 'Admin created',
                result: response
            })
            /*
            .catch((error) => {
                res.status(500).json({
                    error
                })
            })
            */
        })
        .catch((error) => {
            res.status(500).json({
                error
            })
        })
    })           
})




// Signup 
router.post('/register-user',(req,res,next)=>{
    bcrypt.hash(req.body.password, 10).then((hash)=>{        // .hash(data, salt, cb) -> look into salt
        const user = new confirmationSchema({                       //create a user for the DB entry
            name: req.body.name,
            email: req.body.email,
            password: hash          //password was hashed
            //add the confirmation letter here
        })

        user.save().then((response) => {            //mongoose method to save
            res.status(201).json({
                message: 'User created for confirmation',
                result: response
            })
            /*
            .catch((error) => {
                res.status(500).json({
                    error
                })
            })
            */
        })
        .catch((error) => {
            res.status(500).json({
                error
            })
        })
    })           
})

//dummy(get all the users) endpoints with authentication (only one route still) This is for admin confirmation
router.route('/all-user-admin').get(authorize, (req, res)=> {         // from .route can create chainable route handlers (like get post put altogether --> see docs)
    confirmationSchema.find((error, response) => {          //finds documents
        if (error) {
            return next(error)
        }else{
            res.status(200).json(response)
        }

    })
})

//dummy (get info of a specific user) -> This is still wrong
router.route('/one-user').get(authorize, (req,res)=> {
    //console.log(req.userEmail)
    
    //console.log(token)
    let getUser;                      //let allows to declare vars that are limited to the scope of a block statement
    
    userSchema.findOne({            //functin in mongoose
        email: req.userEmail        //get the email from the req body
    })
    .then(user => {
        if (!user){     //if no user
            return res.status(401).json({          //parse to json file
                message: "Authentication failed"
            })
        }
        //getUser = user;
        return res.status(200).json({
            message: "Dummy test - Passed",
            user: user
        })
    })
})
    
//accepting a user registration
router.route('/accept-reg').delete(authorize, (req, res)=> {
    let clientRequest;
    let errorMessage;
    //find the request from confirm collection
    confirmationSchema.findOne({
        email: req.body.email
    })
    .then(request=>{
        clientRequest = request;
        if(!request){
            errorMessage = "No request with given Email"; //if request not exist set error message
        }
        return confirmationSchema.deleteOne({
            email : request.email
        })
    })
    .then(delResult => {
        userSchema.findOne({            
            email: req.body.email        
        })
        .then(response =>{
            if(response){
                return res.status(401).json({          
                    message: "Confirmation Failed. User with given email exists."
                })
            }
            else{
                if(delResult.deletedCount === 1){
                    //create a new user using data in the confirmation collections doc
                    const user = new userSchema({                   
                        name: clientRequest.name,
                        email: clientRequest.email,
                        password: clientRequest.password          
                    })
                    //save user       
                    user.save().then((response) => {
                        res.status(201).json({
                            message: 'User registratio confirmed',
                            result: response
                        })
                    })           
                }
            }
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: errorMessage
        })
    })           
})


module.exports = router