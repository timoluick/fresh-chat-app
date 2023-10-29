import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import listAllMessages from "../core/data/messages/list-messages.ts";
import { Message } from "../core/data/models/message.ts";
import MessageList from "../islands/MessageList.tsx";
import SendMessage from "../islands/SendMessage.tsx";

type Props = {
  messages: Message[];
};

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const messages = await listAllMessages();

    return ctx.render({
      messages: messages ?? [],
    });
  },
};

export default function Home(props: PageProps<Props>) {
  const { data } = props;
  const { messages } = data;

  return (
    <div className="min-h-screen flex flex-col max-h-screen">
      <Header />
      <div className="max-w-xl px-4 w-full mx-auto text-2xl font-semibold py-4">
        Messages
      </div>
      <MessageList
        initialMessages={messages}
        className="max-w-xl px-4 pb-8 mx-auto w-full flex-1 overflow-scroll"
      />
      <SendMessage className="max-w-xl w-full pb-4 bg-white px-4 mx-auto pt-4 border-t" />
    </div>
  );
}
