import "dotenv/config";
import express, { Express } from "express";

import connectToDB from "./configs/database.js";
import router from "./routes/index.js";
import requestIp from "request-ip";
import morganMiddleware from "./middlewares/morgan";
import { logger } from "./configs/winston.js";

const app = express();

const PORT = process.env.PORT || 8080;

connectToDB();

app.use(morganMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestIp.mw());

router(app);

app.listen(PORT, () => logger.info(`[SERVER] Listening on port ${PORT}`));
