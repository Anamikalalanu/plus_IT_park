//requiring the express package to the file
const express = require('express');

//require cors
const cors=require('cors')

//requiring dotenv
require('dotenv').config()

//creating an instance of express 
const app =express();

//require mongoose 
const mongoose=require('mongoose');


//requiring all the env variables by destructuring
const {PORT}=process.env

//requring the routes
const userRoutes =require('./routes/userRoutes')
const itemRoutes=require('./routes/itemRoutes')


//setting port
const port=PORT||3000;

//use cors to allow from all origin 
app.use(cors())

//middleware to extract data from the body 
app.use(express.json())

//requiring connectDb function from config file  
const connectDb=require('./config/dbConnection');


//use user routes
app.use('/api/user',userRoutes)

//use item routes
app.use('/api/items',itemRoutes)



//login
app.post('/login',async(req,res)=>{
const {username,password}=req.body
if(username && password)
{
    

}
else{
    console.log("User not found");
    return res.status(204)
} 

})
//register

//update

//delete

//protected route



//listen the server on the port
app.listen(port,()=>{
    console.log(`server running on ${port}`);
    //connect to db
    connectDb()
})