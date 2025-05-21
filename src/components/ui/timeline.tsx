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
  title,
  events,
  startYear = Math.min(...events.map((e) => e.year)),
  endYear = Math.max(...events.map((e) => e.year)),
  tickInterval = 5,
  ...props
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
    <div>
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <div style={{ width: `${timelineWidth}px`, minWidth: "100%" }}>
        {/* Events */}
        <div className="absolute w-full">
          {events.map((event, index) => {
            const position =
              ((event.year - startYear) / (endYear - startYear)) * 100;

            return (
              <div
                key={`${event.year}-${index}`}
                className="absolute"
                style={{ left: `${position}%` }}
              >
                <div className="relative">
                  <div className="absolute bottom-2 transform -translate-x-1/2">
                    <div className="w-4 h-4 bg-primary rounded-full" />
                    <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-sm font-medium">{event.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline bar */}
        <div className="h-1 bg-border mt-16" />

        {/* Year ticks */}
        <div className="relative w-full">
          {years.map((year) => {
            const position = ((year - startYear) / (endYear - startYear)) * 100;

            return (
              <div
                key={year}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${position}%` }}
              >
                <div className="h-2 w-0.5 bg-border mt-[-0.3rem]" />
                <div className="mt-2 text-sm text-muted-foreground">{year}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Timeline.displayName = "Timeline";
