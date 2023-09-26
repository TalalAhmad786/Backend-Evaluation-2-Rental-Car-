const userModel = require('../models/users');
const carModel = require('../models/cars');
const reservationModel = require('../models/reservation');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
module.exports = {

   


 create: function(req, res, next) {

   const data = { name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role,  };
  
  userModel.create(data)
  .then((result) => {
      res.send({ status: 200, msg: 'User created successfully' })
   })
  .catch((err) => {
      res.send({ status: 500, msg: 'Error creating user' })
   });
 },

 authenticate: async (req, res, next) => {
   console.log('request -------------->', req.body);
   try {
      const userInfo = await userModel.findOne({ email: req.body.email });

      if (!userInfo) {
         res.status(401).json({ status: "error", message: "Invalid email/password!!!", data: null });
         return;
      }

      const isPasswordValid = await bcrypt.compare(req.body.password, userInfo.password);
      if (isPasswordValid) {
         const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
         res.json({ status: "success", message: "User found!!!", data: { user: userInfo, token: token } });
        
      

      } else {
         res.status(401).json({ status: "error", message: "Invalid email/password!!!", data: null });
      }
   } catch (error) {
      next(error);
   }

},
// userController.js
// ... Other imports ...


   updatePassword: async (req, res, next) => {
     try {
       const userId = req.params.userId;
       const newPassword = req.body.password;
       console.log("Password in backend---->",newPassword)
       const saltRound = 10;
       console.log(userId);
 
       const hashedPassword = await bcrypt.hash(newPassword, saltRound);
 
       await userModel.findByIdAndUpdate(userId, {
         password: hashedPassword,
        // username: req.body.username
       });
      
       res.json({ status: "success", message: "Password updated successfully!!!", data: null });
     } catch (error) {
       next(error);
     }
   
 },
 updateUser: async (req, res, next) => {
   try {
     const userId = req.params.userId;
     const newName= req.body.name;
     const newEmail= req.body.email;
     //const saltRound = 10;
     console.log(userId);

   //  const hashedPassword = await bcrypt.hash(newPassword, saltRound);

     await userModel.findByIdAndUpdate(userId, {
      // password: hashedPassword,
       name: newName,
       email: newEmail,
      
      // username: req.body.username
     });
     const users = await userModel.find({});//.find({});
    const usersList = users.map(user => ({ 
      id: user._id,
      name: user.name,
      email: user.email,  
    }));
    
     res.json({ status: "success", message: "User updated successfully!!!", data: usersList });
   } catch (error) {
     next(error);
   }
 
},
 getAll : async (req, res, next) => {
  try {
    const users = await userModel.find();// = await movieModel.find({});
    const usersList = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));
    res.json({ status: "success", message: "Users list found!!!", data: { users: usersList } });
  } catch (error) {
    //console.log("errpr while fetching users", error)
    next(error);
  }
},
 updateRole: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const newRole= req.body.role;
      //const saltRound = 10;
      console.log(userId);
 
      // const hashedPassword = await bcrypt.hash(newPassword, saltRound);
 
      await userModel.findByIdAndUpdate(userId, {
        role: newRole,
        // username: req.body.username
      });
     
      res.json({ status: "success", message: "Role updated successfully!!!", data: null });
    } catch (error) {
      next(error);
    }
  
},

deleteById: async (req, res, next) => {

  try{
    const userId = req.params.userId;
    const UserRole = req.body.role.role;
    console.log("Body in user",)
    if(UserRole === "user"){
      await reservationModel.findByIdAndDelete(req.params.userId);
    await reservationModel.deleteMany({userId: userId}).then(() => {
      console.log('Items deleted successfully.');
    })
    .catch((err) => {
      console.error('Error deleting items:', err);
    });
  
    
  }
    else if(UserRole === "manager"){
    
    await userModel.findByIdAndDelete(req.params.userId);
    carModel.deleteMany({userId: userId}).then(() => {
      console.log('Items deleted successfully.');
    })
    .catch((err) => {
      console.error('Error deleting items:', err);
    });
  }
    const users = await userModel.find({});
    const usersList = users.map(user => ({

      id: user._id,
      email: user.email,
      role: user.role,
    
    }));

   res.json({ status: "success", message: "User deleted successfully!!!", data: { users: usersList } });
  
  }
  catch(error){
  next(error);
  }


}

}
