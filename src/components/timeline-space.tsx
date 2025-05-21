"use client";
import { useTambo } from "@tambo-ai/react";
import * as React from "react";
import { Timeline, TimelineEvent } from "./timeline";

// Default historical events for the timeline
const defaultHistoricalEvents: TimelineEvent[] = [
  {
    year: -3000,
    label: "First civilizations emerge in Mesopotamia",
    description:
      "The earliest known civilizations emerged in Mesopotamia around 3000 BC, marking the beginning of human history.",
  },
  {
    year: -500,
    label: "Classical Age in Ancient Greece",
    description:
      "The Classical Age in Ancient Greece, spanning from 500 to 300 BC, was a period of great cultural and intellectual achievement.",
  },
  {
    year: 476,
    label: "Fall of the Western Roman Empire",
    description:
      "The fall of the Western Roman Empire in 476 AD marked the end of the ancient world and the beginning of the Middle Ages.",
  },
  {
    year: 1440,
    label: "Invention of the Printing Press",
    description:
      "The invention of the printing press by Johannes Gutenberg in 1440 AD revolutionized the way information was disseminated, making books more accessible to the public.",
  },
  {
    year: 1776,
    label: "American Declaration of Independence",
    description:
      "The American Declaration of Independence, adopted in 1776, marked the beginning of the United States of America as a nation.",
  },
  {
    year: 1903,
    label: "First Powered Flight by Wright Brothers",
    description:
      "The first successful powered flight by the Wright brothers took place in 1903, marking a major milestone in aviation history.",
  },
  {
    year: 1969,
    label: "First Moon Landing",
    description:
      "The first Moon landing by the Apollo 11 mission in 1969 marked a major milestone in human history.",
  },
  {
    year: 2007,
    label: "First iPhone Released",
    description:
      "The first iPhone was released in 2007, revolutionizing the mobile phone industry and changing the way people communicate and access information.",
  },
  {
    year: 2023,
    label: "AI Revolution with GPT and LLMs",
    description:
      "The AI revolution, led by GPT and LLMs, has transformed the way information is processed and generated, impacting various industries and sectors.",
  },
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
    <div className="w-full h-full p-4 mb-4">
      {latestComponent || (
        <Timeline
          title="Human history"
          events={defaultHistoricalEvents}
          tickInterval={100}
        />
      )}
    </div>
  );
}
