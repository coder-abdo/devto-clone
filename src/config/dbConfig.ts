import { connect } from "mongoose";
import { config } from "dotenv";
config();

export const connectDB = async () => {
  const dburl = process.env.MONGO_URI as string;
  try {
    await connect(dburl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("db is connected...");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
