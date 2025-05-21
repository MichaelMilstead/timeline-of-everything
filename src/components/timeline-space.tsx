"use client";
import { useTambo } from "@tambo-ai/react";
import * as React from "react";

export function TimelineSpace() {
  const { thread } = useTambo();
  const [latestComponent, setLatestComponent] =
    React.useState<React.ReactNode | null>(null);

  React.useEffect(() => {
    if (!thread?.messages) return;

    // Find the latest assistant message with a rendered component
    const latestMessageWithComponent = [...thread.messages]
      .reverse()
      .find((msg) => msg.role === "assistant" && msg.renderedComponent);

    if (latestMessageWithComponent?.renderedComponent) {
      setLatestComponent(latestMessageWithComponent.renderedComponent);
    }
  }, [thread?.messages]);

  if (!latestComponent) {
    return null;
  }

  return (
    <div className="w-full p-4 mb-4" data-canvas-space="true">
      {latestComponent}
    </div>
  );
}
