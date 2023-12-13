import express from "express";
import morgan from "morgan";
import usersRouter from "./routes/usersRoute.js";
import nftRouter from "./routes/nftsRoute.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/nfts", nftRouter);

export default app;
