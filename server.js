import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

//console.log(process.env);

app.listen(process.env.PORT, () => {
  console.log("Server running on port http://localhost:3000");
});
