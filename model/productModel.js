const mongoose = require("mongoose");

const ProductSchema=mongoose.Schema({
    productId:{type:String,required:true},
    productName:{type:String,required:true},
    qtyPerUnit:{type:String,required:true},
    unitPrice:{type:String,required:true},
    unitStock:{type:String,required:true},
    discontinued:{type:Boolean,required:true},
    categoryId:{type:String,required:true}
})




const ProductModel = mongoose.model("Product",ProductSchema)


module.exports={ProductModel}