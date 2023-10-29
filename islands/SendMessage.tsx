import { useRef } from "preact/hooks";
import { server } from "../core/server.ts";
import classNames from "classNames";

type Props = {
  className?: string;
};

export default function SendMessage({ className }: Props) {
  // refs
  const formRef = useRef<HTMLFormElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  // on submit handler
  const onSubmit = (e: Event) => {
    // prevent pagereload
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      // retrieve values
      const name = formData.get("name") as string || "Anonymous";
      const message = formData.get("message") as string;
      // no submit if message is empty
      if (!message) return;

      // send message
      server.sendMessage(name, message);
      // reset message input field
      if (messageInputRef.current) messageInputRef.current.value = "";
    }
  };

  return (
    <div className={classNames("", className)}>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-2"
        ref={formRef}
      >
        <div className="grid grid-cols-1 gap-2">
          <label for="name">Name</label>
          <input
            id="name"
            name="name"
            className="rounded-md bg-gray-200 appearance-none outline-none px-4 py-2"
            placeholder="Timo"
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label for="message">Message</label>
          <input
            id="message"
            name="message"
            className="rounded-md bg-gray-200 appearance-none outline-none px-4 py-2"
            placeholder="This is a message..."
            ref={messageInputRef}
          />
        </div>
        <button type="submit">send message</button>
      </form>
    </div>
  );
}
