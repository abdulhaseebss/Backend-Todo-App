import mongoose from "mongoose";
import { MONGO_URI } from "../../config/env.mjs";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
});

mongoose.connection.once('open', () => console.log("Connected to DB"))
    .on("error", (err) => console.log("Error connecting to DB -->", err));

export default mongoose;
