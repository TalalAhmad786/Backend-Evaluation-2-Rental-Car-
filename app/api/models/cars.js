const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const carSchema = new Schema({
 name: {
  type: String,
  trim: true,  
  //required: true,
 },
 model: {
  type: String,
  trim: true,
 // required: true
 },
 color: {
    type: String,
    trim: true,
    //required: true
 },
 year: {
   type: String,
   trim: true,
 },
 availaibility:{
    type: String,
    trim: true,
    default: "availaible"

 },
 userId:{
   type: String,
   trim: true,
   //required: true
   
 }

});
module.exports = mongoose.model('Car', carSchema)