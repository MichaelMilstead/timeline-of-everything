import { TimelineSpace } from "@/components/timeline-space";
import { MessageThreadFull } from "@/components/ui/message-thread-full";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col font-sans">
      <main className="flex-1 w-full mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-bold py-4">Timeline of Everything</h1>
        <div className="flex-1 flex w-[90%] mx-auto flex-col items-center justify-center h-full">
          <TimelineSpace />
        </div>
        <div className="w-full">
          <MessageThreadFull contextKey="tambo-template" />
        </div>
      </main>
    </div>
  );
}
