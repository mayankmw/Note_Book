const mongoose = require('mongoose');

//URL of MongoDB database
const mongoURI = "mongodb://localhost:27017/notebook"

//Connecting to Database
const connectToMongo = ()=>{
    mongoose.set('strictQuery', false); //TO avoid the warning "Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7"
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully")
    })
}

//Exporting Connection to MongoDB
module.exports = connectToMongo;