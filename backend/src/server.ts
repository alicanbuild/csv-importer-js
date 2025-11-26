import express from "express";
import importRoute from "./routes/import";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/import", importRoute);

app.use(errorHandler);

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
