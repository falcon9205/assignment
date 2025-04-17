const {Email ,Password,JWT_Secret} = require("../config")
const jwt = require("jsonwebtoken")
function authMiddleware(req,res,next){

    const {email,password,authorization} = req.headers
     console.log("from auth",email,password,authorization,JWT_Secret);
     

    if(Email==email && Password==password ){
        // try {
        //     const decoded = jwt.verify(authorization, JWT_Secret);
        //     console.log("Decoded Payload:", decoded);
        //     next()
        //   } catch (err) {
        //     return res.status(411).json({msg: "Invalid token"})
        //   }
       
    }
     else{
    return res.status(411).json({msg: "Invalid token"})
     }
}

module.exports = authMiddleware