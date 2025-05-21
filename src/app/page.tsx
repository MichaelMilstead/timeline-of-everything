import { MessageThreadFull } from "@/components/ui/message-thread-full";
import { Timeline } from "@/components/ui/timeline";

export default function Home() {
  const historicalEvents = [
    { year: 1969, label: "Moon Landing" },
    { year: 1989, label: "Fall of Berlin Wall" },
    { year: 1991, label: "World Wide Web" },
    { year: 2007, label: "First iPhone" },
    { year: 2008, label: "Bitcoin Created" },
    { year: 2023, label: "ChatGPT Launch" },
  ];

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl w-full space-y-8">
        <div className="flex flex-col items-center">
          <Timeline
            title="Timeline of Modern Technology"
            events={historicalEvents}
            startYear={1969}
            endYear={2025}
            tickInterval={5}
            className="w-full"
          />
          <MessageThreadFull contextKey="tambo-template" />
        </div>
      </main>
    </div>
  );
}
