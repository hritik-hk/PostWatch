import "dotenv/config";
import express, { Express } from "express";

import connectToDB from "./configs/database.js";
import router from "./routes/index.js";
import requestIp from "request-ip";

const app = express();

const PORT = process.env.PORT || 8080;

connectToDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestIp.mw());

router(app);

app.listen(PORT, () => console.log(`[SERVER] Listening on port ${PORT}`));
