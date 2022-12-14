import cors from 'cors';
import express, { Request, Response } from 'express';
import connectDB from "./config/db.config";
import userRoutes from './routes/userRoutes';
import profRoutes from './routes/profRoutes';
import courseRoutes from './routes/courseRoutes';
import ohResponsibilitiesRoutes from './routes/ohResponsibilitiesRoutes';
import TAWishlistRoutes from './routes/taWishlistRoutes';
import channelRoutes from './routes/channelRoutes';
import taRoutes from './routes/taRoutes';

const app = express();
const port = 3000;

// Basic express setup
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/prof", profRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/ohresps", ohResponsibilitiesRoutes);
app.use("/api/tawishlist", TAWishlistRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/ta", taRoutes);


app.listen(port, () => {
    console.log('Backend is running on port: ' + port)
})

