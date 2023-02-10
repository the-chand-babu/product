const express = require('express');

//creating server

const {connection} = require('./db');
const {categoryRouter} = require("./Router/category.router");
const {ProductRouter} = require('./Router/product.router')
const app = express();

app.use(express.json());

app.use('/category',categoryRouter)
app.use('/product',ProductRouter);







app.listen(7100, async()=>{
    try{
        await connection;
        console.log("connect to db");
        console.log("port is listning");
    }
    catch(err){
        console.log("err from connect to db");
    }



})