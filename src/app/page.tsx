import { TimelineSpace } from "@/components/timeline-space";
import { MessageThreadFull } from "@/components/ui/message-thread-full";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col font-[family-name:var(--font-geist-sans)]">
      <main className="flex-1 max-w-4xl w-full mx-auto flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          <TimelineSpace />
        </div>
        <div className="w-full">
          <MessageThreadFull contextKey="tambo-template" />
        </div>
      </main>
    </div>
  );
}
