import express, { json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import { connectDB } from "./config/dbConfig";
import usersRouter from "./routes/userRoutes";
// initialize dotenv
config();
// initilaize the server
const app = express();
const port = process.env.PORT;
// initilize the database
connectDB();
// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));
// routes
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(usersRouter);
// run the server
app.listen(port, () => console.log(`server run at port: ${port}`));
