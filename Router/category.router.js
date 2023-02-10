
const express = require("express");

const {categoryModel}= require("../model/categoryModel");

const categoryRouter = express.Router();

//getting one particular category
//enter category name in parameter..

categoryRouter.get('/:categoryName',async(req,res)=>{
    try{
        const categoryName= req.params;
        const data = await categoryModel.findOne(categoryName);
        if(!data) return res.status(404).send({message:"data not found"});

        return res.status(200).send({message:"succesfully",data});

    }
    catch(err){
        console.log("err from category get routes");
        return res.send({message:"something went wrong"})
    }
})

//getting all the category in the data base

categoryRouter.get('/',async(req,res)=>{
        try{
            const data = await categoryModel.find();
            res.status(200).send({message:"succesfully",data});

        }
        catch(err){
            console.log("err from category get routes");
            return res.send({message:"something went wrong"})
        }
})


//creating category 

categoryRouter.post('/create', async(req,res)=>{
    const {categoryName,categoryId} = req.body;
    // console.log(req.body)

    const data = await categoryModel.findOne({categoryId});
    if(data) return res.send({message:"category Already present in the database ",  data});

    
    const payload = new categoryModel({categoryId,categoryName});
    console.log(payload);
    await payload.save();
    return res.status(200).send({message:"created succesfully"});

})

//updating category put category id in the params and 
// data in the body

categoryRouter.patch('/update/:categoryId',async(req,res)=>{
    try{
        const data = req.body

        const {categoryId}=req.params;
        const item=await categoryModel.findOneAndUpdate({categoryId},data);
        if(!item)  return res.status(404).send({message:"no record found please put valid category id"});
        return res.status(200).send({message:"succesfully updated"})
        
    }
    catch(err){
        console.log("err from category update routes");
        res.send({message:"something went wrong"})
    }

})


//deleting routes put categoryId in the params

categoryRouter.delete('/delete/:categoryId',async(req,res)=>{
    const {category}=req.params;
    const item = await categoryModel.findOneAndDelete({category});
   if(!item) return res.status(404).send({message:"not found please put valid details"});
    
   return res.status(200).send({message:"deleted succesfully"});
})





module.exports={categoryRouter};
