import { MongoClient } from "mongo";
import env from "../env.ts";

const { MONGO_URL, MONGO_PORT, MONGO_ROOT_USER, MONGO_ROOT_PASSWORD } = env;

const client = new MongoClient();

// create mongo client
await client.connect(
  `mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@${MONGO_URL}:${MONGO_PORT}`,
);

// retrieve db
const database = client.database("CHAT_APP");

export default database;
