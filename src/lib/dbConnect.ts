import mongoose from "mongoose";
import logger from "./logger";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        logger.info("Connection Already Exists!!");
        return;
    }
    try {
        // Attempt to connect to the database
        const db = await mongoose.connect(process.env.MONGODB_URI || '');

        connection.isConnected = db.connections[0].readyState;

        logger.info('Database connected successfully');
    } catch (error) {
        logger.error('Database connection failed:', error);
        process.exit(1);
    }
}

export default dbConnect;