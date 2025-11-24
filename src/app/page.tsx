"use client";
import Footer from "@/components/footer";
import GithubLink from "@/components/github-link";
import MessageList from "@/components/message-list";
import { TimelineSpace } from "@/components/timeline-space";
import { MessageThreadFull } from "@/components/ui/message-thread-full";
import { components } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col font-gelasio">
      <main className="flex-1 w-full mx-auto flex flex-col items-center">
        <GithubLink />
        <TamboProvider
          apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
          components={components}
          tamboUrl={process.env.NEXT_PUBLIC_TAMBO_API_URL}
        >
          <h1 className="text-2xl font-bold py-4">
            The Timeline of Everything
          </h1>
          <div className="flex-1 flex w-[90%] mx-auto flex-col items-center justify-center h-full">
            <TimelineSpace />
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col gap-2 pb-2">
              <MessageList />
            </div>
            <MessageThreadFull contextKey="tambo-template" />
          </div>
        </TamboProvider>
        <Footer />
      </main>
    </div>
  );
}
