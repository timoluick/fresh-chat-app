import { Message } from "./data/models/message.ts";

// websocket
export class Websocket {
  #channel: BroadcastChannel;

  constructor() {
    this.#channel = new BroadcastChannel("chat");
  }

  onMessage(handler: (message: Message) => void) {
    const listener = (e: MessageEvent) => {
      handler(e.data);
    };
    this.#channel.addEventListener("message", listener);
    return {
      unsubscribe: () => {
        this.#channel.removeEventListener("message", listener);
      },
    };
  }

  close() {
    this.#channel.close();
  }

  sendText(message: Message) {
    this.#channel.postMessage(message);
  }
}
