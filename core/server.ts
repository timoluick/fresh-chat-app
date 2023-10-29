import { Message, NewMessage } from "./data/models/message.ts";

class Server {
  subscribeMessages(
    onMessage: (message: Message) => void,
  ) {
    const events = new EventSource(`/api/connect`);
    const listener = (e: MessageEvent) => {
      const msg = JSON.parse(e.data) as Message;
      onMessage(msg);
    };
    events.addEventListener("message", listener);
    return {
      unsubscribe() {
        events.removeEventListener("message", listener);
      },
    };
  }

  async sendMessage(name: string, message: string) {
    const data: NewMessage = {
      name: name,
      message: message,
    };
    return await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const server = new Server();
