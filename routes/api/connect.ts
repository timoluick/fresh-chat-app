import { Handlers } from "$fresh/server.ts";
import { Websocket } from "../../core/websocket.ts";

// register new client with websocket
export const handler: Handlers = {
  GET(_req, _) {
    const channel = new Websocket();

    const stream = new ReadableStream({
      start: (controller) => {
        channel.onMessage((message) => {
          const body = `data: ${JSON.stringify(message)}\n\n`;
          controller.enqueue(body);
        });
      },
      cancel() {
        channel.close();
      },
    });

    return new Response(stream.pipeThrough(new TextEncoderStream()), {
      headers: { "content-type": "text/event-stream" },
    });
  },
};
