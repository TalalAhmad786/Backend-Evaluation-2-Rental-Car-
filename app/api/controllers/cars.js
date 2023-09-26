const carModel = require('../models/cars'); // Import your car model
let userId = null;
const getById = async (req, res, next) => {
  try {
    userId = req.params.userId;
    const carInfo = await carModel.find({userId: userId});
    const carsList = carInfo.map(car => ({
      id: car._id,
      name: car.name,
      model: car.model,
      color: car.color,
      availaibility: car.availaibility,
      year: car.year
    }));
    res.json({ status: "success", message: "Cars found!!!", data: { cars: carsList } });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const cars = await carModel.find({});
    const carsList = cars.map(car => ({
      id: car._id,
      name: car.name,
      model: car.model,
      color: car.color,
      availaibility: car.availaibility,
      year: car.year
    }));
    res.json({ status: "success", message: "cars list found!!!", data: { cars: carsList } });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    await carModel.findByIdAndUpdate(req.params.carId, { name: req.body.name,  model: req.body.model, color: req.body.color, availaibility: req.body.availaibility, year: req.body.year  });
    const cars = await carModel.find({userId: userId});
    const carsList = cars.map(car => ({
      id: car._id,
      name: car.name,
      model: car.model,
      color: car.color,
      availaibility: car.availaibility,
      year: car.year
    }));
    res.json({ status: "success", message: "car updated successfully!!!", data: { cars: carsList } });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    await carModel.findByIdAndRemove(req.params.carId);
    const cars = await carModel.find({});
    const carsList = cars.map(car => ({
      id: car._id,
      name: car.name,
      model: car.model,
      color: car.color,
      availaibility: car.availaibility,
      year: car.year
    }));
    res.json({ status: "success", message: "car deleted successfully!!!", data: { cars: carsList } });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  console.log("in the backend ->>>>>", req);
  try {
  
    await carModel.create({userId: req.body.userId,  name: req.body.name,  model: req.body.model, color: req.body.color, availaibility: req.body.availaibility,year: req.body.year  });
    res.json({ status: "success", message: "car added successfully!!!", data: null });
  } catch (error) {
    next(error);
  }
};


const updateAvailaibility = async (req, res, next) => {
try{
  await carModel.findByIdAndUpdate(req.params.carId, { availaibility: req.body.availaibility });
  const cars = await carModel.find({});
  const carsList = cars.map(car => ({
    id: car._id,
    name: car.name,
    model: car.model,
    color: car.color,
    availaibility: car.availaibility,
    year: car.year
  }));
  res.json({ status: "success", message: "car updated successfully!!!", data: carsList});
}catch(error){
  next(error);

}
}





module.exports = {
  getById,
  getAll,
  updateById,
  deleteById,
  create,
  updateAvailaibility
};
