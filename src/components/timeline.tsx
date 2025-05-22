import * as React from "react";
import { useEffect } from "react";

export interface TimelineEvent {
  year: number;
  label: string;
  description: string;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  events: TimelineEvent[];
  tickInterval?: number;
}

export const Timeline = ({
  title = "",
  events = [],
  tickInterval = 5,
}: TimelineProps) => {
  const startYear = Math.min(...events.map((e) => e.year)) - 2 * tickInterval;
  const endYear = Math.max(...events.map((e) => e.year)) + 2 * tickInterval;
  // Generate array of years for ticks
  const years = React.useMemo(() => {
    const years: number[] = [];
    for (let year = startYear; year <= endYear; year += tickInterval) {
      years.push(year);
    }
    return years;
  }, [startYear, endYear, tickInterval]);

  // Calculate timeline width based on number of years
  const timelineWidth = (years.length - 1) * 100; // 100px per interval

  const [focusedEvent, setFocusedEvent] = React.useState<TimelineEvent>(
    events?.[0] ?? null
  );
  const timelineRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (events.length > 0) {
      setFocusedEvent(events[0]);
    }
  }, [events]);

  const handleEventClick = (event: TimelineEvent) => {
    setFocusedEvent(focusedEvent?.year === event.year ? events[0] : event);

    // Calculate scroll position to center the clicked event
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
    const currentIndex = events.findIndex((e) => e.year === focusedEvent?.year);
    const prevEvent = events[currentIndex - 1] ?? events[events.length - 1];
    setFocusedEvent(prevEvent);
    scrollToEvent(prevEvent);
  };

  const handleNextEvent = () => {
    const currentIndex = events.findIndex((e) => e.year === focusedEvent?.year);
    const nextEvent = events[currentIndex + 1] ?? events[0];
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

  return (
    <div className="relative h-full">
      {title && <h2 className="text-lg mb-4">{title}</h2>}
      <div className="relative">
        <div className="overflow-x-auto h-full min-h-[150px]" ref={timelineRef}>
          <div
            style={{
              width: `${timelineWidth}px`,
            }}
          >
            {/* Events above the timeline */}
            <div className="mb-2 relative z-10">
              <TimelineEvents
                events={events}
                startYear={startYear}
                endYear={endYear}
                focusedEvent={focusedEvent}
                onEventClick={handleEventClick}
              />
            </div>
            {/* Timeline bar */}
            <div className="h-1 bg-border" />
            {/* Year ticks */}
            <div className="relative w-full z-0">
              {years.map((year) => {
                const position =
                  ((year - startYear) / (endYear - startYear)) * 100;

                const yearDisplay =
                  year < 0 ? `${Math.abs(year)} BC` : `${year} AD`;

                return (
                  <div
                    key={year}
                    className="absolute transform -translate-x-1/2"
                    style={{ left: `${position}%` }}
                  >
                    <div className="h-2 w-0.5 bg-border mt-[-0.3rem]" />
                    <div className="mt-2 text-sm text-muted-foreground">
                      {yearDisplay}
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
                {focusedEvent.label} ({Math.abs(focusedEvent.year)}
                {focusedEvent.year < 0 ? " BC" : " AD"})
              </div>
              <div className="text-sm text-muted-foreground">
                {focusedEvent.description}
              </div>
            </div>
          </div>
        )}
      </div>
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
            style={{ left: `${position}%` }}
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
