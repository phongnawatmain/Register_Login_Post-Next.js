import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = globalThis.cached || { conn: null, promise: null };

export const connectMongoDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("Connected to mongodb");
            return mongoose;
        }).catch(error => {
            console.log("Error connecting to mongodb:", error);
            throw error;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectMongoDB;
