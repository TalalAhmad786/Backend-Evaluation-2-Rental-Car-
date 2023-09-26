const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');

const usernamePattern = /^(?=.*[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/\-='|"'])\S+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/\-='|"']).{8,}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateRegistration = (req, res, next) => {
  // const profileImage = req.files && req.files.profileImage;
   console.log("in the backend" ,req.body)
  const { name, email, password, confirmPassword, } = req.body;
  const errors = [];

  if (name !== "" && !usernamePattern.test(name)) {
    errors.push("Add a number in the name and remove empty spaces");
  } else if (password !== "" && !passwordPattern.test(password)) {
    errors.push("Password must start with a capital letter and must contain a number & special character");
  } else if (password !== confirmPassword) {
    errors.push("Password does not match");
  } else if (email !== "" && !emailPattern.test(email)) {
    errors.push("Invalid email");
  }
  console.log("errors in the backend----> ", errors)
  if (errors.length > 0) {
    return res.status(400).json({errors});
  }

  next();
};
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.put('/:userId/updatepassword', userController.updatePassword);
router.put('/:userId/updateuser', userController.updateUser);
router.delete('/:userId/deleteuser', userController.deleteById);
router.get('/', userController.getAll);
router.put('/:userId/updaterole', userController.updateRole);
module.exports = router;