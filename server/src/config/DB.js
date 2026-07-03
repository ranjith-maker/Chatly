import mongoose from "mongoose";


async function ConnectMongoDB() {
    
await mongoose.connect(process.env.MONGODBURL)



}

export default ConnectMongoDB


