import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Schema
import "./models/Comment";
import "./models/User";
import "./models/Video";

mongoose.connect(
    process.env.MONGO_URL,
    {
    useNewUrlParser: true,
    useFindAndModify: false
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("[v] Connected to DB");
const handleError = error => console.log(`[v] Error on DB connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);