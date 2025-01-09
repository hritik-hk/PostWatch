import "dotenv/config";
import express, { Express } from "express";

import router from "./routes";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router(app);

app.listen(PORT, () => console.log(`[SERVER] Listening on port ${PORT}`));
