const reservationModel= require('../models/reservation');
const carModel = require('../models/cars');
let userId = null;

// const bcrypt = require('bcrypt'); 

const create = async (req, res, next) => {

  console.log("in the backend ->>>>>", req);
   
    try {
        const carId = req.params.carId; 
        const car = await carModel.findById(carId);

        if (!car) {
            return res.status(400).json({ status: "error", message: "Car not found" });
        }

        const reservation = await reservationModel.create({ name: car.name, model: car.model, color: car.color, year: car.year, userId: req.body.userId,time: req.body.time,carId: carId, user_name: req.body.user_name});

        res.json({ status: "success", message: "Car added successfully!!!", data: reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }


    // const data = { name: req.body.name, code: req.body.code}

    // codeModel.create(data)
    // .then((result) => {

    //     res.send({status: 200, msg: 'Code created successfully'});

    // }).catch((err) => {
    //     res.send({status: 400, msg: 'Code not created successfully'});
    // });
    

}

const getAll = async (req, res, next) => {
  try{
  const reservations = await reservationModel.find({});
  const reservationList = reservations.map(reservation => ({
    id: reservation._id,
    name: reservation.name,
    model: reservation.model,
    color: reservation.color,
    time: reservation.time,
    carId: reservation.carId,
    userId: reservation.userId,
    year: reservation.year,
    user_name: reservation.user_name,

  }));
  res.json({ status: "success", message: "Reservation found!!!", data: { reservation: reservationList } });
 } catch(error){
    next(error);
  } 

};



const getById = async (req, res, next) => {

    try {
         userId = req.params.userId;  //Id = req.params.customerId;
        const reservationInfo = await reservationModel.find({userId: userId});// = await carModel.find({userId: userId});
        const reservationList = reservationInfo.map(reservation => ({//List = carInfo.map(car => ({
          id: reservation._id,
          name: reservation.name,
          model: reservation.model,
          color: reservation.color,
          time: reservation.time,
          carId: reservation.carId,
          userId: reservation.userId,
          year: reservation.year,
          user_name: reservation.user_name
        }));
        res.json({ status: "success", message: "Reservation found!!!", data: { reservation: reservationList }})//ound!!!", data: { cars: carsList } });
      } catch (error) {
        next(error);
      }
    // try {
    //   const codeInfo = await codeModel.findById(req.params.codeId);
    //   res.json({ status: "success", message: "Code found!!!", data: { code: codeInfo } })
    // } catch (error) {
    //   next(error);
    // }
  };

  const cancelReservation = async (req, res, next) => {
  
        try {
          await reservationModel.findByIdAndRemove(req.params.reservationId);
          const reservation = await reservationModel.find({userId: userId});
          const reservationList = reservation.map(reservation => ({//List = carInfo.map(car => ({List = cars.map(car => ({
            id: reservation._id,
            name: reservation.name,
            model: reservation.model,
            time: reservation.time,
            color: reservation.color, 
            carId: reservation.carId,
            userId: reservation.userId,
            year: reservation.year,
            user_name: reservation.user_name
          }));
          res.json({ status: "success", message: "reservation deleted successfully!!!", data: { reservation: reservationList } });
        } catch (error) {
          next(error);
        }
     
  }


  module.exports = {
    getById,
    create,
    cancelReservation,
    getAll

}