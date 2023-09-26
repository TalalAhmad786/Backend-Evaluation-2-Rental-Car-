const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  name: {
    type: String,
    trim: true,
    //required: true
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
  availaibility: {
    type: String,
    trim: true,
    default: "availaible",
  },
  userId: {
    type: String,
    trim: true,
  },
  carId: {
    type: String,
    trim: true
  },
  time: {
    type: Date,
    trim: true,
  },
  user_name:{
    type:String,
    trim:true
  }
});
module.exports = mongoose.model("Reservation", reservationSchema);
