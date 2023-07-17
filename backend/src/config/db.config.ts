// require('dotenv').config()
// this needs to be managed using a .env file
// Put the Mongo connection string in the file as MONGO_CONNECTION_STRING="xxxx"
// const url = process.env.MONGO_CONNECTION_STRING;


import mongoose from 'mongoose';
import { ConnectionOptions } from 'tls';

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = process.env;


const connectDB = async () => {
    try {
        // requires database to up
        const connect = await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}` as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        } as ConnectionOptions);
        console.log("Database is connected!");
    } catch (error: any) {
        console.log(error.message);
    }
}

export default connectDB;

// node container
// mongo container
// node <---> mongo