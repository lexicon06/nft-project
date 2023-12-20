import express from "express";
import morgan from "morgan";
import usersRouter from "./routes/usersRoute.js";
import nftRouter from "./routes/nftsRoute.js";
import path from "path";

const app = express();
app.use(express.json());
//if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
//}

const currentDirectory = process.cwd();

const folder = path.join(currentDirectory, "nft-data", "img");

app.use(express.static(folder));

const router = express.Router();

router.param("id", (req, res, next, value) => {
  req.id = value;
  console.log(`ID ${value}`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`Middleware request: ${req.requestTime}`);
  next();
});

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/nfts", nftRouter);

export default app;
