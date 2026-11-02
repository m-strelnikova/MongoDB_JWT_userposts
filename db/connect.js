import { MongoClient } from "mongodb";
import "dotenv/config";
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

let dbConnection = null;

async function connectToDB() {
    try {
        await client.connect();
        console.log("Successfully conected to MongoDB");
        dbConnection = client.db();

    } catch (error) {
        console.error("Failed connection to MongoDB: ", error);
        throw new Error;
    }
}

function accessDB() {
    if (!dbConnection) {
        throw new Error("Database not connected.")
    }

    return dbConnection;
}

export { connectToDB, accessDB };
