import mongoose from "mongoose"

const connectDB = async () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB is Connected")
    }
    catch(error){
        console.log("MongoDB Connection Failed Due to:", error)
        process.exit(1)
    }
}

export default connectDB