"use client";
import { useTambo } from "@tambo-ai/react";
import * as React from "react";
import { Timeline, TimelineEvent } from "./timeline";

// Default historical events for the timeline
const defaultHistoricalEvents: TimelineEvent[] = [
  {
    year: 1452,
    label: "Birth of Leonardo",
    description:
      "Leonardo da Vinci is born in Vinci, Republic of Florence, to Ser Piero and Caterina.",
  },
  {
    year: 1466,
    label: "Apprenticeship Begins",
    description:
      "Begins apprenticeship in Verrocchio's workshop in Florence, learning painting, sculpture, and technical skills.",
  },
  {
    year: 1472,
    label: "Guild Membership",
    description:
      "Qualifies as a master in the Guild of St Luke, the guild of artists and doctors of medicine.",
  },
  {
    year: 1482,
    label: "Moves to Milan",
    description:
      "Enters the service of Duke of Milan, Ludovico Sforza, as an engineer, architect, and painter.",
  },
  {
    year: 1495,
    label: "The Last Supper",
    description:
      "Begins painting The Last Supper in the Convent of Santa Maria delle Grazie in Milan.",
  },
  {
    year: 1503,
    label: "Mona Lisa",
    description:
      "Starts painting the Mona Lisa, which would become his most famous work.",
  },
  {
    year: 1506,
    label: "Return to Milan",
    description:
      "Returns to Milan to work as an architect and engineer for the French governor Charles d'Amboise.",
  },
  {
    year: 1513,
    label: "Rome Period",
    description:
      "Moves to Rome under the patronage of Pope Leo X, focusing on scientific studies and engineering projects.",
  },
  {
    year: 1519,
    label: "Death of Leonardo",
    description:
      "Dies at Clos Lucé, France, while in the service of King Francis I.",
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
          title="The life of Leonardo da Vinci"
          events={defaultHistoricalEvents}
          tickInterval={5}
        />
      )}
    </div>
  );
}
