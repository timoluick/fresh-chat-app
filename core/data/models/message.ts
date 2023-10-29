import { ObjectId } from "mongo";

export type Message = {
  _id: ObjectId;
  name: string;
  message: string;
};

export type NewMessage = Omit<Message, "_id">;
