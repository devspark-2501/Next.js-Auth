import mongoose from 'mongoose'

export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log('already connected');
        return;
    }

    try {
        const conn await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'test',
        });

        console.log('MongoDB connected:', conn.connection.host);
    } catch (error) {
        console.log('MongoDB connection error', error);
        process.exit(1);
    }
}