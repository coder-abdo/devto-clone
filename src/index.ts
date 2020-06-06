import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
// initialize dotenv
config();
// initilaize the server
const app = express();
const port = process.env.PORT;
const dburl = process.env.MONGO_URI as string;
// initilize the database
mongoose.connect(
  dburl,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("db is connected");
  }
);
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
// run the server
app.listen(port, () => console.log(`server run at port: ${port}`));
