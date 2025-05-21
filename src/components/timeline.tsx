import * as React from "react";

export interface TimelineEvent {
  year: number;
  label: string;
  description?: string;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  events: TimelineEvent[];
  startYear?: number;
  endYear?: number;
  tickInterval?: number;
}

export const Timeline = ({
  title = "",
  events = [],
  startYear = Math.min(...events.map((e) => e.year)) - 100,
  endYear = Math.max(...events.map((e) => e.year)) + 100,
  tickInterval = 5,
}: TimelineProps) => {
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

  return (
    <div className="relative h-full">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <div className="overflow-x-auto h-full min-h-[150px]">
        <div
          style={{
            width: `${timelineWidth}px`,
          }}
        >
          {/* Events above the timeline */}
          <div className="mb-2">
            <TimelineEvents
              events={events}
              startYear={startYear}
              endYear={endYear}
            />
          </div>
          {/* Timeline bar */}
          <div className="h-1 bg-border" />
          {/* Year ticks */}
          <div className="relative w-full">
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
    </div>
  );
};

export const TimelineEvents = ({
  events,
  startYear,
  endYear,
}: {
  events: TimelineEvent[];
  startYear: number;
  endYear: number;
}) => {
  return (
    <div className="relative w-full min-h-[20px] mb-8">
      {events.map((event, index) => {
        const position =
          ((event.year - startYear) / (endYear - startYear)) * 100;

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
                <div className="w-3 h-3 bg-primary rounded-full" />
                {event.description && (
                  <div className="text-xs text-muted-foreground mt-2 whitespace-nowrap">
                    {event.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Timeline.displayName = "Timeline";
