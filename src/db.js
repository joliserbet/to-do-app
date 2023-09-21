import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://joliserbet:hj2NifGnciU3MFrp@cluster0.zzsx6o4.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(url);
