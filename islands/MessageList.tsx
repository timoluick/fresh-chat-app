import { useEffect, useRef, useState } from "preact/hooks";
import { Message } from "../core/data/models/message.ts";
import { server } from "../core/server.ts";
import classNames from "classNames";

type Props = {
  initialMessages: Message[];
  className?: string;
};

export default function MessageList({ initialMessages, className }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesRef = useRef<Message[]>(messages);
  messagesRef.current = messages;

  useEffect(() => {
    // subscribe to websocket
    const subscription = server.subscribeMessages((msg: Message) => {
      // store new message in messages array
      setMessages([...messagesRef.current, msg]);
    });
    // unsubscribe on close
    return () => subscription.unsubscribe();
  }, []);

  // scroll to bottom if messages changes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {messages.length === 0 && (
        <div className="text-center text-gray-500">No messages yet</div>
      )}
      <div ref={listRef} className={classNames("", className)}>
        {messages.map((m) => <MessageItem message={m} key={m._id} />)}
      </div>
    </>
  );
}

type MessageProps = {
  message: Message;
};

// message item
function MessageItem({ message }: MessageProps) {
  return (
    <div className="border-b py-2">
      <div className="text-sm text-gray-500 truncate">{message.name}</div>
      <div className="flex gap-2 break-all">
        <div>{">"}</div>
        <div>{message.message}</div>
      </div>
    </div>
  );
}
