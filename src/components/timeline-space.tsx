"use client";
import { useTambo } from "@tambo-ai/react";
import * as React from "react";
import { Timeline, TimelineEvent } from "./timeline";

// Default historical events for the timeline
const defaultHistoricalEvents: TimelineEvent[] = [
  {
    year: -4600000000,
    label: "Formation of Earth",
    description:
      "Earth forms from the solar nebula, becoming the third planet from the Sun.",
  },
  {
    year: -3800000000,
    label: "First Life Appears",
    description:
      "Earliest evidence of simple life forms appears in the form of single-celled organisms.",
  },
  {
    year: -540000000,
    label: "Cambrian Explosion",
    description:
      "Rapid diversification of complex animal life forms, marking the beginning of most modern phyla.",
  },
  {
    year: -252000000,
    label: "Great Permian Extinction",
    description:
      "The largest mass extinction event in Earth's history, wiping out about 95% of marine species and 70% of terrestrial species.",
  },
  {
    year: -66000000,
    label: "Dinosaur Extinction",
    description:
      "A massive asteroid impact leads to the extinction of non-avian dinosaurs, allowing mammals to diversify.",
  },
  {
    year: -300000,
    label: "Rise of Homo Sapiens",
    description:
      "Modern humans evolve in Africa, eventually spreading across the globe.",
  },
  {
    year: -12000,
    label: "End of Last Ice Age",
    description:
      "The end of the Pleistocene epoch marks the transition to our current geological epoch, the Holocene.",
  },
  {
    year: 1750,
    label: "Industrial Revolution Begins",
    description:
      "The Industrial Revolution marks the transition to new manufacturing processes and significant environmental changes.",
  },
  {
    year: 2023,
    label: "AI Revolution",
    description:
      "The development of advanced artificial intelligence begins to reshape human society and technology.",
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
          title="History of the world"
          events={defaultHistoricalEvents}
          tickInterval={100}
        />
      )}
    </div>
  );
}
