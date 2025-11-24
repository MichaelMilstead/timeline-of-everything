import { extractMessageContent } from "@/lib/utils";
import { useTamboGenerationStage, useTamboThread } from "@tambo-ai/react";

export default function LatestTamboMessage() {
  const { thread } = useTamboThread();
  const { isIdle } = useTamboGenerationStage();

  const messages = thread?.messages || [];

  const latestTamboMessage = [...messages]
    .reverse()
    .find((message) => message.role === "assistant");

  if (latestTamboMessage) {
    const latestTamboIndex = messages.findIndex(
      (msg) => msg.id === latestTamboMessage.id
    );
    const hasUserMessageAfter = messages
      .slice(latestTamboIndex + 1)
      .some((message) => message.role === "user");

    if (hasUserMessageAfter) {
      return null;
    }
  }

  return (
    <div className="text-sm text-[#0d2d64] p-2 w-full text-left font-semibold">
      {extractMessageContent(latestTamboMessage)}
      {!isIdle && (
        <span className="inline-block ml-1 text-xs text-gray-500 rounded-full bg-black h-2 w-2 animate-pulse"></span>
      )}
    </div>
  );
}
