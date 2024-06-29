import express from 'express';
import mongoose from 'mongoose';
import { MONGO_URI, PORT } from './src/config/env.mjs';
import routes from './src/routes/index.mjs';
import cors from "cors"

const app = express();
app.use(cors())

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
});

mongoose.connection.once('open', () => {
    console.log("Connected to DB");

    // Start the server after successful DB connection
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
}).on("error", (err) => {
    console.log("Error connecting to DB -->", err);
});

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);
