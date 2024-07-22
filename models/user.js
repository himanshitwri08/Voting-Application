const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
age:{
    type:Number,
    required:true
},
mobile:{
    type:Number,
    required:true
},
adharCardNumber:{
    type:Number,
    required:true,
    Range:10,
    unique:true
},
email:{
  type:String
},
passwword:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:['voter','admin'],
    default:"voter"
},
isvoted:{
  type:Boolean,
  default:false
}
});

const user=mongoose.model('user',userSchema);
module.exports=user;