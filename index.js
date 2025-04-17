const express = require("express")
const connection = require("./db")
// const categoryRouter = require("./routes/categoryRoute")
const authMiddleware = require("./middleware/authMiddleware")
const app = express()
const jwt = require("jsonwebtoken")
const {JWT_Secret} = require("./config")
const  {category,service,price} = require("./models/schema")

app.use(express.json())

app.get("/",(req,res)=>{

    // const token = jwt.sign(JWT_Secret,"newtoken")
    //  console.log(token);
    const payload = { data: "testing" };
    const token = jwt.sign(payload, JWT_Secret, { expiresIn: "1h" });
    
     
    res.json({token: token})
})

app.get("/categories",authMiddleware,async(req,res)=>{
    try {
         connection()

        const allCategories = await category.find()
        return res.status(200).json({allCategories})
    } catch (error) {
        return res.status(500).json({msg: "Something went wrong"})
    }
})

app.post("/category",authMiddleware,async(req,res)=>{
   
    try {
        connection()
        const {categoryName} = req.body;
        console.log("category data" ,categoryName);
        
        const newData = new category({categoryName})
        await newData.save()

        return res.status(200).json({msg : "category added succesfully"})
    } catch (error) {
        return res.status(500).json({msg: "Something went wrong"})
    }
})

app.put("/category/:categoryId",authMiddleware,async(req,res)=>{
     
    try {
        connection()
        const data = req.params.categoryId;
        
        const {categoryName}  =req.body;
       console.log(categoryName,data);
       
        const newData = await category.findOneAndUpdate({_id:data},{categoryName})
         console.log(newData);
         
        return res.status(200).json({msg : "updated data"})
    } catch (error) {
        return res.status(500).json({msg: "Something went wrong"})
    }
})


app.delete("/category/:categoryId",authMiddleware,async(req,res)=>{
     try {
        connection()

        const categoryId = req.params.categoryId
         console.log(categoryId);
         
        const newData = await category.findOneAndDelete({_id:categoryId})
        
        
        return res.status(200).json({msg : "Deleted successful"},{newData})
     } catch (error) {
        return res.status(500).json({msg: "Something went wrong"})
     }       
})

app.post("/category/:categoryId/service",authMiddleware,async(req,res)=>{
    try {
        connection()
        const data = req.params.categoryId
        const {serviceName,type,priceOptions} = req.body
        const newData = new service({categoryId:data,serviceName,type,priceOptions})
        await newData.save()


        return res.status(200).json({msg : "service added successfully"})


    } catch (error) {
         return res.status(500).json({msg: "Something went wrong"})
    }
})

app.get("/category/:categoryId/service",authMiddleware,async(req,res)=>{
    try {
        connection()

        const data = req.params.categoryId
        const newData = await service.findOne({categoryId:data})

        return res.status(200).json(newData)
    } catch (error) {
        return res.status(500).json({msg : "something went wrong"})
    }
})

app.delete("/category/:categoryId/service/:serviceId",authMiddleware,async(req,res)=>{
    try {
        connection()

        const {categoryId,serviceId} = req.params
        console.log(categoryId,serviceId);
        
        const newData = await service.findOneAndDelete({_id:serviceId})
        console.log(newData);
        
        return res.status(200).json({msg: "Deleted Data"})
    } catch (error) {
        return res.status(500).json({msg:"something went wrong"})
    }
})

app.put("/category/:categoryId/service/:serviceId",authMiddleware,async(req,res)=>{
    try {
        connection()
        const {categoryId,serviceId}=req.params;

        console.log(categoryId,serviceId);
        
        const {serviceName,type,priceOptions}=req.body;
        const newdata = await service.findOneAndUpdate(serviceId,{
            serviceName,type,priceOptions
        })

        return res.status(200).json({msg : "Updated services"})

    } catch (error) {
        return res.status(500).json({msg: "something went wrong"})
    }
})


app.listen(3000,()=>{
    connection()
    console.log("running server");
    
})