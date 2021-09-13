//admin_auth middleware
//check our endpoints with express validator (for pages with signin permission only fro admins)

const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try{
        const token = req.header('x-auth-token')
        jwt.verify(token, "longer-secret-is-better")
        const decodedToken = jwt.decode(token);
        req.userEmail = decodedToken.email;
        //if isAdmin field is not in the token, it is not a admin token
        if(!decodedToken.isAdmin){
           return res.status(401).json({
                message: "Not an Admin, cannot Authorize",
            })
        }
        next()                                  //execute other lines in the pipeline
    }catch(error){
        console.log("error occurred");
        res.status(401).json({
            message: "No token. Cannot Authorize",
            error: error
        })
    }
}