import mongoose from "mongoose";

const dbConnect = async () => {
    if(mongoose.connection.readyState >= 1){
        return
    }

    try {
        await mongoose.connect("mongodb+srv://root:root@cluster0.qm6ovvw.mongodb.net/")
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect