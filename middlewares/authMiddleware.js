const jwt=require("jsonwebtoken")
function verifyToken(req,res,next){
    const token=req.header('X-access-token')
    if(!token){
        return res.status(500).json({error:"access denied"})
    }
    try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
      req.userId=decoded.userId
      next()  
    } catch (error) {
        res.status(500).json({error:"invalid token"})
    }
}
module.exports=verifyToken