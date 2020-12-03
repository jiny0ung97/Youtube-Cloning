import dotenv from "dotenv";

dotenv.config();

import "./db";
import app from "./app";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`[v] Listening on: http://localhost:${PORT}`);
});