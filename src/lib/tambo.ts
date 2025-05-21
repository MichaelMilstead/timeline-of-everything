/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

import { Timeline } from "@/components/ui/timeline";
import {
  getCountryPopulations,
  getGlobalPopulationTrend,
} from "@/services/population-stats";
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

export const tools: TamboTool[] = [
  {
    name: "countryPopulation",
    description:
      "A tool to get population statistics by country with advanced filtering options",
    tool: getCountryPopulations,
    toolSchema: z
      .function()
      .args(z.string().describe("The continent to filter countries by"))
      .returns(
        z
          .object({
            continent: z.string().optional(),
            sortBy: z.enum(["population", "growthRate"]).optional(),
            limit: z.number().optional(),
            order: z.enum(["asc", "desc"]).optional(),
          })
          .optional()
      ),
  },
  {
    name: "globalPopulation",
    description:
      "A tool to get global population trends with optional year range filtering",
    tool: getGlobalPopulationTrend,
    toolSchema: z
      .function()
      .args(z.string().describe("The continent to filter countries by"))
      .returns(
        z
          .object({
            startYear: z.number().optional(),
            endYear: z.number().optional(),
          })
          .optional()
      ),
  },
  // Add more tools here
];

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
      "A component that renders a horizontal timeline with events plotted along a time axis. Supports customizable year ranges, event labels, and tick intervals.",
    component: Timeline,
    propsSchema: z.object({
      title: z.string().describe("Title for the timeline"),
      events: z
        .array(
          z.object({
            year: z.number().describe("The year when the event occurred"),
            label: z.string().describe("Label text for the event"),
            description: z
              .string()
              .optional()
              .describe("Optional detailed description of the event"),
          })
        )
        .describe("Array of events to display on the timeline"),
      startYear: z
        .number()
        .describe(
          "Start year for the timeline to display (defaults to earliest event year)"
        ),
      endYear: z
        .number()
        .describe(
          "End year for the timeline to display (defaults to latest event year)"
        ),
      tickInterval: z
        .number()
        .describe(
          "Interval between year ticks on the timeline to display (default: 5)"
        ),
    }),
  },
];
