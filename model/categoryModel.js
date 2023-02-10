
const mongoose= require("mongoose");


const categorySchema = mongoose.Schema({
    categoryId:{type:String,required:true},
    categoryName:{type:String,required:true},

})



const categoryModel = mongoose.model('categorie',categorySchema);

module.exports={categoryModel};