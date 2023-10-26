import { MongoClient } from "mongodb";

export function connectToDatabase() {
  const client = MongoClient.connect(process.env.MONGO_URL);
  return client;
}
