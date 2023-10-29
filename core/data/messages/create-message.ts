import { Collections } from "../collections.ts";

import { Message, NewMessage } from "../models/message.ts";
import client from "../mongo-client.ts";

export default async function createMessage(message: NewMessage) {
  return await client.collection<Message>(Collections.MESSAGES).insertOne(
    message,
  )
    // _id added by mongo after insert
    .then(() => message as Message);
}
