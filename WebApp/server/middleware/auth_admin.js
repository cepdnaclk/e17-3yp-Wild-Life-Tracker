//auth middleware
//check our endpoints with express validator (for pages with signin permission)

const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try{
        const token = req.header('x-auth-token')
        //console.log(token)
        jwt.verify(token, "longer-secret-is-better")
        const decodedToken = jwt.decode(token);
        req.userEmail = decodedToken.email;
        if(!decodedToken.isAdmin){
           return res.status(401).json({
                message: "Not an Admin, cannot Authorize",
            })
        }
        next()                                  //execute other lines in the pipeline
    }catch(error){
        res.status(401).json({
            message: "No token. Cannot Authorize",
            error: error
        })
    }
}