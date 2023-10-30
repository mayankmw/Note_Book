const mongoose = require('mongoose');
const { Schema } = mongoose;

// Defining UserSchema for MongoDB
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default: "user"
    },
    date:{
        type:Date,
        default: Date.now
    },
  });

  //Exporting The UserSchema
    const User =mongoose.model('user',UserSchema);
    module.exports = User;