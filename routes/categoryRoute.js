const express = require("express")
const router = express.Router()
const {JWT_Secret,Email ,Password} = require("../config")



router.get("/",(req,res)=>{
    res.send("Hi from router")
})

module.export = router