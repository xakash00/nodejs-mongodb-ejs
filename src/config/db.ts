import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isDBConnected = false;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: 'blogDB',
        });
        console.log("MongoDB connected");
        isDBConnected = true;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        isDBConnected = false;
    }
};

export { connectDB, isDBConnected };
