import mongoose from "mongoose";

const url =
  "mongodb+srv://joliserbet:d7q9WGovryE5RluX@cluster0.zzsx6o4.mongodb.net/?retryWrites=true&w=majority";
export const connectDB = async () => {
try {
await mongoose.connect(url);
console.log(">>> DB is connected");
} catch (error) {
console.log(error);
}
};