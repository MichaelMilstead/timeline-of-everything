import { TimelineSpace } from "@/components/timeline-space";
import { MessageThreadFull } from "@/components/ui/message-thread-full";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl w-full space-y-8">
        <div className="flex flex-col items-center">
          <TimelineSpace />
          <MessageThreadFull contextKey="tambo-template" />
        </div>
      </main>
    </div>
  );
}
