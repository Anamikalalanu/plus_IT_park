const mongoose=require ("mongoose")
const connectDb=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("db connected..")
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports=connectDb