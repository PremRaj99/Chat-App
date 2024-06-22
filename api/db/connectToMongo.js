import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDb is connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToMongoDb;
