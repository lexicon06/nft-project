import express from "express";
import morgan from "morgan";
import usersRouter from "./routes/usersRoute.js";
import nftRouter from "./routes/nftsRoute.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const router = express.Router();

router.param("id", (req, res, next, value) => {
  //req.id = value;
  console.log(`ID ${value}`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`Hello from the middleware: ${req.requestTime}`);
  next();
});

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/nfts", nftRouter);

export default app;
