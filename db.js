const mongoose = require("mongoose")
const {MongoDBURI} = require("./config")
const connection = ()=>{
    try {
        mongoose.connect(MongoDBURI)

        console.log("DB connection done")


    } catch (error) {
        console.log("DB connection failed",error)
    }
    
}

module.exports = connection