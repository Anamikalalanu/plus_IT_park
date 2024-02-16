//requiring express
const express = require('express');

//getting routing from express
const router = express.Router()

//requiring auth middleware
const verifyToken = require('../middlewares/authMiddleware')


//requiring controllers
const {loginController, registerController,deleteController,protectedController,updateController}=require('../controllers/userController')

//route for register
router.route('/register').post(registerController)

//route for login 
router.route('/login').post(loginController)

//route for delete and update
router.route('/:id')
.delete(verifyToken,deleteController)
.put(verifyToken,updateController)

//protected route
router.route('/protected').get(verifyToken,protectedController)


module.exports=router