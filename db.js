const mongoose = require("mongoose");


//data base connetion

const connection = mongoose.connect('mongodb+srv://<database user id>:<password>@cluster0.kmd7ho3.mongodb.net/Product?retryWrites=true&w=majority');


module.exports={connection}