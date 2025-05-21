"use client";

import type { messageVariants } from "@/components/ui/message";
import {
  MessageInput,
  MessageInputError,
  MessageInputSubmitButton,
  MessageInputTextarea,
  MessageInputToolbar,
} from "@/components/ui/message-input";
import {
  MessageSuggestions,
  MessageSuggestionsList,
} from "@/components/ui/message-suggestions";
import { ScrollableMessageContainer } from "@/components/ui/scrollable-message-container";
import {
  ThreadContainer,
  useThreadContainerContext,
} from "@/components/ui/thread-container";
import {
  ThreadContent,
  ThreadContentMessages,
} from "@/components/ui/thread-content";
import { useMergedRef } from "@/lib/thread-hooks";
import { Suggestion } from "@tambo-ai/react";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

/**
 * Props for the MessageThreadFull component
 */
export interface MessageThreadFullProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional context key for the thread */
  contextKey?: string;
  /**
   * Controls the visual styling of messages in the thread.
   * Possible values include: "default", "compact", etc.
   * These values are defined in messageVariants from "@/components/ui/message".
   * @example variant="compact"
   */
  variant?: VariantProps<typeof messageVariants>["variant"];
}

/**
 * A full-screen chat thread component with message history, input, and suggestions
 */
export const MessageThreadFull = React.forwardRef<
  HTMLDivElement,
  MessageThreadFullProps
>(({ className, contextKey, variant, ...props }, ref) => {
  const { containerRef, historyPosition } = useThreadContainerContext();
  const mergedRef = useMergedRef<HTMLDivElement | null>(ref, containerRef);

  const populationSuggestions: Suggestion[] = [
    {
      id: "pop-suggestion-1",
      title: "Top 10 countries by population",
      detailedSuggestion: "Show me the top 10 countries by population in 2023.",
      messageId: "population-query",
    },
    {
      id: "pop-suggestion-2",
      title: "Population density comparison",
      detailedSuggestion:
        "Compare population density of the top 10 most populous countries.",
      messageId: "population-query",
    },
    {
      id: "pop-suggestion-3",
      title: "Population growth trends",
      detailedSuggestion:
        "What are the projected population growth trends for the top 10 most populated countries?",
      messageId: "population-query",
    },
  ];

  return (
    <>
      <ThreadContainer ref={mergedRef} className={className} {...props}>
        <ScrollableMessageContainer className="p-4 ">
          <ThreadContent variant={variant}>
            <ThreadContentMessages />
          </ThreadContent>
        </ScrollableMessageContainer>

        {/* Message input */}
        <div className="p-4">
          <MessageInput contextKey={contextKey}>
            <MessageInputTextarea placeholder="Ask about any historical events" />
            <MessageInputToolbar>
              <MessageInputSubmitButton />
            </MessageInputToolbar>
            <MessageInputError />
          </MessageInput>
        </div>

        {/* Message suggestions */}
        <MessageSuggestions initialSuggestions={populationSuggestions}>
          <MessageSuggestionsList />
        </MessageSuggestions>
      </ThreadContainer>
    </>
  );
});
MessageThreadFull.displayName = "MessageThreadFull";
