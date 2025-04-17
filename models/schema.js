const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryName : {
        type:String,
        required : true
    }
},{timestamps:true})

const serviceSchema = new mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category",
    },
    serviceName : {
        type : String,
        required : true,
    },
    type : {
        type:String,
        required : true
    },
    priceOptions :{
        type : String,
        required : true
    }
},{timestamps:true})

const priceSchema = new mongoose.Schema({
    serviceId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "service"
    },
    duration : {
        type : String,
        require:true
    },
    price : {
        type : Number,
        required:true
    },
    type :{
        type:String,
        required : true
    }
})

const category = mongoose.models.category || mongoose.model("category",categorySchema)

const service =  mongoose.models.service || mongoose.model("service",serviceSchema)

const price =  mongoose.models.price || mongoose.model("price",priceSchema)

module.exports = {category,service,price}