"use client";

import type { messageVariants } from "@/components/ui/message";
import {
  MessageInput,
  MessageInputError,
  MessageInputSubmitButton,
  MessageInputTextarea,
  MessageInputToolbar,
} from "@/components/ui/message-input";
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
  const { containerRef } = useThreadContainerContext();
  const mergedRef = useMergedRef<HTMLDivElement | null>(ref, containerRef);

  return (
    <div className="w-full mx-auto bg-[#f5f5f5]">
      <ThreadContainer ref={mergedRef} className={className} {...props}>
        <ScrollableMessageContainer>
          <ThreadContent variant={variant}>
            <ThreadContentMessages />
          </ThreadContent>
        </ScrollableMessageContainer>

        {/* Message input */}
        <div>
          <MessageInput contextKey={contextKey}>
            <MessageInputTextarea placeholder="Tell me about the history of computers" />
            <MessageInputToolbar>
              <MessageInputSubmitButton />
            </MessageInputToolbar>
            <MessageInputError />
          </MessageInput>
        </div>
      </ThreadContainer>
    </div>
  );
});
MessageThreadFull.displayName = "MessageThreadFull";
