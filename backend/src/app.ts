import express from "express";
import router from "../routes/feedback.route";

const app = express();

app.use(express.json());

app.use("/api/feedback", router);

export default app;