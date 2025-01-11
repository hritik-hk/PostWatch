import mongoose from "mongoose";
import { logger } from "./winston.js";

const DB_URL = process.env.DB_URL;

async function connectToDB() {
  try {
    if (DB_URL) {
      await mongoose.connect(DB_URL);
      logger.info(`[DATABSE] Connected to the database`);
    } else {
      logger.error(`[DATABSE] DB connection string not found`);
    }
  } catch (error) {
    logger.error(`[DATABSE] Error connecting to the database:`);
  }
}

// exporting the connection
export default connectToDB;
