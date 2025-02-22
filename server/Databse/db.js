import mongoose from "mongoose";

export const dbConfig = async() => {
    try {
      await mongoose.connect(process.env.MONGO_URI)
        console.log('Databse connected');
        
    } catch (error) {
        console.log('Databse not connected');
        process.exit()
        
    }
}