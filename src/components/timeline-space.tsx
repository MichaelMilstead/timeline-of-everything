"use client";
import { useTambo } from "@tambo-ai/react";
import * as React from "react";
import { Timeline, TimelineEvent } from "./timeline";

// Default historical events for the timeline
const defaultHistoricalEvents: TimelineEvent[] = [
  { year: -3000, label: "First civilizations emerge in Mesopotamia" },
  { year: -500, label: "Classical Age in Ancient Greece" },
  { year: 476, label: "Fall of the Western Roman Empire" },
  { year: 1440, label: "Invention of the Printing Press" },
  { year: 1776, label: "American Declaration of Independence" },
  { year: 1903, label: "First Powered Flight by Wright Brothers" },
  { year: 1969, label: "First Moon Landing" },
  { year: 1991, label: "World Wide Web becomes publicly available" },
  { year: 2007, label: "First iPhone Released" },
  { year: 2023, label: "AI Revolution with GPT and LLMs" },
];

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

  return (
    <div className="w-full p-4 mb-4" data-canvas-space="true">
      {latestComponent || (
        <Timeline events={defaultHistoricalEvents} tickInterval={100} />
      )}
    </div>
  );
}
