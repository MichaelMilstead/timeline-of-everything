import { TamboThreadMessage } from "@tambo-ai/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractMessageContent = (
  message: TamboThreadMessage | undefined | null
) => {
  if (!message || !message.content) return "";

  return message.content.map((content) => content.text).join("");
};
