//requiring express
const express=require('express');

//getting routing from express
const router=express.Router()

const {getItemController}=require('../controllers/itemController')

router.route('/').get(getItemController)

module.exports=router;