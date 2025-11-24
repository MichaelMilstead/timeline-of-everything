import { useTamboThread } from "@tambo-ai/react";
import DefaultMessage from "./default-message";
import LatestTamboMessage from "./latest-tambo-message";
import LatestUserMessage from "./latest-user-message";

export default function MessageList() {
  const { thread } = useTamboThread();
  const messages = thread?.messages || [];

  return (
    <div className="w-full h-full">
      {messages.length == 0 ? (
        <DefaultMessage />
      ) : (
        <>
          <LatestUserMessage />
          <LatestTamboMessage />
        </>
      )}
    </div>
  );
}
