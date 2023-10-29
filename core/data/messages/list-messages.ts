import { Collections } from "../collections.ts";

import { Message } from "../models/message.ts";
import client from "../mongo-client.ts";

// get all messages in db (no pagination)
export default function listAllMessages() {
  return client.collection<Message>(Collections.MESSAGES).find().toArray();
}
