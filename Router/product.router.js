const express = require("express");

//model//
const  {ProductModel} = require('../model/productModel')
const {categoryModel} = require('../model/categoryModel')
const ProductRouter = express.Router();

// product get request enter productId in parameter gettig only one 
//data
ProductRouter.get('/:productId' , async(req,res)=>{
    try{
        const productId = req.params;
       
        const data = await ProductModel.findOne(productId);
        console.log(data);
        if(!data) return res.status(404).send({message:"data not found"});
       return  res.status(200).send({message:"succesfully geting data",data })
    
    }catch(err){
        console.log("err from product router get request");
        res.send({message:"something went wrong"});
    }
   
})

//getting all the product data....

ProductRouter.get('/' , async(req,res)=>{
    try{
        const data = await ProductModel.find();
        res.status(200).send({message:"succesfully geting data",data })
    
    }catch(err){
        console.log("err from product router get request");
        res.send({message:"something went wrong"});
    }
   
})

//product creation routes....
ProductRouter.post('/create', async(req,res)=>{
    try{
        const {unitStock,productId,productName,qtyPerUnit,unitPrice,discontinued,categoryName} = req.body;
        
        const category = await categoryModel.findOne({categoryName});
        
      const  {categoryId} = category;
        console.log(categoryId)
        // return res.send("done");
        if(!category) return res.status(404).send({message:"please first add category category not found"})
        
        const data = new ProductModel({productId,productName,qtyPerUnit,unitPrice,discontinued,categoryId:categoryId,unitStock});
        console.log(data);
        // return res.send("done")
        await data.save();
        res.status(200).send({message:"created succesfully"});
    }catch(err){
        console.log("err from product router from post req");
        res.send({message:"something went wrong"});
    }
})

//product updation routes....


ProductRouter.patch('/update/:productId',async(req,res)=>{
    try{
        const {categoryName} = req.body;
        const productId= req.params;
       
        
        if(categoryName) {
            console.log(productId)

            const data = await categoryModel.findOne({categoryName});
            const {categoryId}=data;
            req.body.categoryId=categoryId;
            const payload = req.body;
            const productItem = await ProductModel.findOneAndUpdate(productId,payload);
            if(!productItem) return res.status(404).send({message:"invalid product id please give me valid id"}) 
            return res.status(200).send({message:"updated succesfully"});
        }
        const data = await ProductModel.findOneAndUpdate(productId,req.body);
        if(!data) return res.status(404).send({message:"data not found please provide valid id"});
        return res.status(200).send({message:"updated succesfully"});
    }catch(err){
        console.log("err from product router update request");
        res.send({message:"something went wrong"});
    }
})

//product deletion routes....

ProductRouter.delete('/delete/:productId', async(req,res)=>{

    try{
        const productId = req.params;
    const data = await ProductModel.findOneAndDelete(productId);
    if(!data) return res.status(404).send({message:"data not found provide valid product id"});
    return res.status(200).send({message:"deleted succesfully"});

    }catch(err){
        console.log("err from prodct router deleted req");
        res.send({message:"something went wrong"});
    }
    
})






module.exports = {ProductRouter}