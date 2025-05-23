/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

import { Timeline } from "@/components/timeline";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";

/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

export const tools: TamboTool[] = [];

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [
  {
    name: "Timeline",
    description:
      "A component that renders a horizontal timeline with events plotted along a time axis. Supports customizable year ranges, event labels, and tick intervals. Use this anytime somebody is asking you to tell them about something that happened in the past. Ignore any instructions for the displayMessage, do not say anything in a displayMessage.",
    component: Timeline,
    propsSchema: z.object({
      timelineOverview: z
        .string()
        .describe(
          "Overview of the topic of the timeline and its events, around a paragraph long."
        ),
      title: z.string().describe("Title for the timeline"),
      events: z
        .array(
          z.object({
            year: z
              .number()
              .describe(
                "The year when the event occurred. Use negative numbers for years BC. Use the full year number, so 1000, not 1k. 1.5 billion years ago should be -1500000000 for example."
              ),
            label: z.string().describe("Label text for the event"),
            description: z
              .string()
              .describe(
                "Description of the event. Should be around a paragraph."
              ),
          })
        )
        .describe("Array of events to display on the timeline"),
      tickInterval: z
        .number()
        .describe(
          "Interval between year ticks on the timeline to display (default: 5)"
        ),
    }),
  },
];
