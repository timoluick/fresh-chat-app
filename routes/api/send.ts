import createMessage from "../../core/data/messages/create-message.ts";
import { NewMessage } from "../../core/data/models/message.ts";
import { Websocket } from "../../core/websocket.ts";

// send new text message
export async function handler(
  req: Request,
): Promise<Response> {
  const data = (await req.json()) as NewMessage;

  const message = await createMessage(data);

  // emit new event on ws
  const channel = new Websocket();
  channel.sendText(message);
  channel.close();

  return new Response("OK");
}
