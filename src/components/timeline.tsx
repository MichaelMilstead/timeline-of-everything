import * as React from "react";
import { useEffect } from "react";

export interface TimelineEvent {
  year: number;
  label: string;
  description: string;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  timelineOverview?: string;
  title?: string;
  events: TimelineEvent[];
  tickInterval?: number;
}

// Update the tickInterval calculation
const calculateTickInterval = (
  startYear: number,
  endYear: number,
  desiredTicks = 10
) => {
  const range = Math.abs(endYear - startYear);

  // For ranges over 1 billion years
  if (range > 1_000_000_000) {
    return Math.ceil(range / desiredTicks / 100_000_000) * 100_000_000;
  }
  // For ranges over 1 million years
  if (range > 1_000_000) {
    return Math.ceil(range / desiredTicks / 1_000_000) * 1_000_000;
  }
  // For ranges over 1000 years
  if (range > 1000) {
    return Math.ceil(range / desiredTicks / 1000) * 1000;
  }

  return Math.ceil(range / desiredTicks);
};

// Update the Timeline component to use dynamic tick intervals
export const Timeline = ({
  timelineOverview = "",
  title = "",
  events = [],
  tickInterval: providedTickInterval = 10,
}: TimelineProps) => {
  // Filter complete events once at the start
  const completeYearEvents = React.useMemo(
    () => events.filter((e) => e.year != null && e.label && e.description),
    [events]
  );

  // Move all hooks to the top
  const [focusedEvent, setFocusedEvent] = React.useState<TimelineEvent>(
    completeYearEvents[0] ?? null
  );
  const timelineRef = React.useRef<HTMLDivElement>(null);

  // Update to use completeEvents
  const { years, startYear, endYear, timelineWidth } = React.useMemo(() => {
    if (!completeYearEvents.length) {
      return {
        years: [],
        startYear: 0,
        endYear: 0,
        effectiveTickInterval: 0,
        timelineWidth: 0,
      };
    }

    const startYear = Math.min(...completeYearEvents.map((e) => e.year));
    const endYear = Math.max(...completeYearEvents.map((e) => e.year));
    const effectiveTickInterval =
      providedTickInterval || calculateTickInterval(startYear, endYear);

    if (!Number.isFinite(startYear) || !Number.isFinite(endYear)) {
      return {
        years: [],
        startYear,
        endYear,
        effectiveTickInterval,
        timelineWidth: 0,
      };
    }

    const years: number[] = [];

    // Add two ticks before the start year
    for (let i = 2; i > 0; i--) {
      years.push(startYear - effectiveTickInterval * i);
    }

    // Add original ticks
    for (let year = startYear; year <= endYear; year += effectiveTickInterval) {
      years.push(year);
    }

    // Add two ticks after the end year
    for (let i = 1; i <= 2; i++) {
      years.push(endYear + effectiveTickInterval * i);
    }

    const timelineWidth = Math.max((years.length - 1) * 100, 100);

    return {
      years,
      startYear,
      endYear,
      effectiveTickInterval,
      timelineWidth,
    };
  }, [completeYearEvents, providedTickInterval]);

  useEffect(() => {
    if (completeYearEvents.length > 0) {
      setFocusedEvent(completeYearEvents[0]);
    }
  }, [completeYearEvents]);

  const handleEventClick = (event: TimelineEvent) => {
    setFocusedEvent(
      focusedEvent?.year === event.year ? completeYearEvents[0] : event
    );

    if (timelineRef.current) {
      const position =
        ((event.year - startYear) / (endYear - startYear)) * timelineWidth;
      timelineRef.current.scrollTo({
        left: position - timelineRef.current.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const handlePrevEvent = () => {
    const currentIndex = completeYearEvents.findIndex(
      (e) => e.year === focusedEvent?.year
    );
    const prevEvent =
      completeYearEvents[currentIndex - 1] ??
      completeYearEvents[completeYearEvents.length - 1];
    setFocusedEvent(prevEvent);
    scrollToEvent(prevEvent);
  };

  const handleNextEvent = () => {
    const currentIndex = completeYearEvents.findIndex(
      (e) => e.year === focusedEvent?.year
    );
    const nextEvent =
      completeYearEvents[currentIndex + 1] ?? completeYearEvents[0];
    setFocusedEvent(nextEvent);
    scrollToEvent(nextEvent);
  };

  const scrollToEvent = (event: TimelineEvent) => {
    if (timelineRef.current) {
      const position =
        ((event.year - startYear) / (endYear - startYear)) * timelineWidth;
      timelineRef.current.scrollTo({
        left: position - timelineRef.current.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const yearDisplay = (year: number) => {
    const absYear = Math.abs(year);
    const suffix = year < 0 ? " BCE" : " CE";

    if (absYear >= 1_000_000_000) {
      return `${(absYear / 1_000_000_000).toFixed(1)}B${suffix}`;
    }
    if (absYear >= 1_000_000) {
      return `${(absYear / 1_000_000).toFixed(1)}M${suffix}`;
    }

    return `${absYear.toLocaleString()}${suffix}`;
  };

  return (
    <div className="relative h-full">
      {title && <h2 className="text-lg mb-4">{title}</h2>}
      <div className="relative">
        <div className="overflow-x-auto h-full min-h-[150px]" ref={timelineRef}>
          <div
            style={{
              width: `${timelineWidth}px`,
              transition: "width 0.3s ease-in-out",
            }}
            className="mx-auto"
          >
            {/* Events above the timeline */}
            <div className="mb-2 relative z-10">
              <TimelineEvents
                events={completeYearEvents}
                startYear={years[0]}
                endYear={years[years.length - 1]}
                focusedEvent={focusedEvent}
                onEventClick={handleEventClick}
              />
            </div>
            {/* Timeline bar */}
            <div className="h-1 bg-border w-full" />
            {/* Year ticks */}
            <div className="relative w-full z-0">
              {years.map((year) => {
                const position =
                  ((year - years[0]) / (years[years.length - 1] - years[0])) *
                  100;

                return (
                  <div
                    key={year}
                    className="absolute transform -translate-x-1/2"
                    style={{ left: `${position}%` }}
                  >
                    <div className="h-2 w-0.5 bg-border mt-[-0.3rem]" />
                    <div className="mt-2 text-sm text-muted-foreground">
                      {yearDisplay(year)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Description box below timeline */}
        {focusedEvent && (
          <div className="mt-8 p-4 bg-background rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto relative">
            <button
              onClick={handlePrevEvent}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              aria-label="Previous event"
            >
              ←
            </button>
            <button
              onClick={handleNextEvent}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              aria-label="Next event"
            >
              →
            </button>
            <div className="px-8">
              {" "}
              {/* Add padding to accommodate arrows */}
              <div className="text-sm font-medium mb-2">
                {focusedEvent.label} ({yearDisplay(focusedEvent.year)})
              </div>
              <div className="text-sm">{focusedEvent.description}</div>
            </div>
          </div>
        )}
      </div>
      {timelineOverview && (
        <div className="mt-4 text-sm text-foreground max-w-4xl mx-auto">
          {timelineOverview}
        </div>
      )}
    </div>
  );
};

export const TimelineEvents = ({
  events,
  startYear,
  endYear,
  focusedEvent,
  onEventClick,
}: {
  events: TimelineEvent[];
  startYear: number;
  endYear: number;
  focusedEvent: TimelineEvent | null;
  onEventClick: (event: TimelineEvent) => void;
}) => {
  return (
    <div className="relative w-full min-h-[20px] mb-8">
      {events.map((event, index) => {
        const position =
          ((event.year - startYear) / (endYear - startYear)) * 100;
        const isFocused = focusedEvent?.year === event.year;

        return (
          <div
            key={`${event.year}-${index}`}
            className="absolute transform -translate-x-1/2"
            style={{
              left: `${position}%`,
              transition: "left 0.3s ease-in-out",
            }}
          >
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="text-sm font-medium mb-2 whitespace-nowrap">
                  {event.label}
                </div>
                <div
                  className={`w-3 h-3 bg-primary rounded-full cursor-pointer transition-transform ${
                    isFocused ? "scale-150" : "hover:scale-125"
                  }`}
                  onClick={() => onEventClick(event)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Timeline.displayName = "Timeline";
