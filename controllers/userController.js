//requring user schema
const User = require("../models/userModel")

//requiring bcrypt
const bcrypt=require('bcrypt')

//requiring jwt
const jwt=require('jsonwebtoken')

//register controller
const registerController= async (req, res) => {
    try {

        const { username,email,password,phonenumber } = req.body


        if (!username||!email||!password||!phonenumber) {
            return res.status(404).json({message:"no data to return"})}
        else{
            const userExist=await User.findOne({username})
            if(userExist){
                return res.status(409).json({message:"Duplicate Entry"})
            }
            const hashedPassword =await bcrypt.hash(password, 10)
            const user = await User.create({username,email,phonenumber,password:hashedPassword})
            await user.save()
            return res.status(200).json({ message: "Succesfully registered" })   
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "registration failed" })
      
    }


}

//login controller 
const loginController= async (req, res) => {
    try {

        const { username, password } = req.body

        if (username && password) {
            const user = await User.findOne({ username: username })
            if (!user) {
                return (
                    res.status(401).json({ error: "login failed" })
                )
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                return res.status(401).json({ error: "authentication failed" })
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24hr' })
            res.status(200).json({ token })

        }
        else {
            console.log("User not found");
            res.status(404).json({message:"no data to return"})
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "login failed" })
        console.log(error)
    }


}

//update controller
const updateController=async (req, res) => {
    try {

        if(req.body){
            const a=req.body
            const user=await User.findById(req.userId)
            if(user){
             await User.findByIdAndUpdate({_id:req.userId},{$set:{...a}})   
             res.status(200).json("updated Contact")
            }
            else{
            res.status(404)
            }

        }
        else{
            return res.status(500).json({message:"nothing to update !!"})
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "username already exists !!" })
        console.log(error)
    }


}

//protected Controller
const protectedController=async(req,res)=>{
    res.status(200).json({message:"protected route accessed"})
}

//delete controller
const deleteController= async(req,res)=>{
    
    const user=await User.findById(req.userId)
    if(user){
     await User.findByIdAndDelete({_id:req.userId})   
     res.status(200).json("deletedContact")
    }
    else{
    res.status(404)
    }
}


module.exports={loginController,registerController,deleteController,protectedController,updateController}