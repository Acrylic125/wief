import React, { useEffect } from "react";
import useCancelScroll from "../../hooks/useCancelScroll";
import EditableTimelineGrid from "./EditableTimelineGrid";
import { TimelineRowSegment } from "./EditableTimelineSegmentRow";
import EditableTimelineSegmentRowContainer from "./EditableTimelineSegmentRowContainer";
import EditableTimelineXAxis from "./EditableTimelineXAxis";
import EditableTimelineYAxis from "./EditableTimelineYAxis";

const EditableTimelineGraph: React.FC<{
  xAxis?: {
    width?: number;
    height?: number;
  };
  yAxis?: {
    width?: number;
    height?: number;
  };
  row?: {
    segmentHeight?: number;
    spacing?: number;
    px?: number;
    py?: number;
  };
  data: {
    id?: number | string;
    label: string;
    segments: {
      id: number | string;
      from: number;
      to: number;
    }[];
    editable?: boolean;
  }[];
  ticks?: {
    amount: number;
    tickFormat?: (value: number) => string;
  };
  defaultStart?: number;
  defaultEnd?: number;
}> = ({
  xAxis,
  yAxis,
  row,
  data,
  ticks = {
    amount: 3,
  },
  defaultStart = 0,
  defaultEnd = 1,
}) => {
  const { onWheel } = useCancelScroll({
    ignoreCTRLScroll: false,
  });
  const [scrollY, setScrollY] = React.useState(0);
  const [start, setStart] = React.useState(defaultStart);
  const [end, setEnd] = React.useState(defaultEnd);

  // useEffect(() => {
  //   setStart(defaultStart);
  //   setEnd(defaultEnd);
  // }, [defaultStart, defaultEnd]);

  const [xAxisHeight, xAxisWidth] = [xAxis?.height ?? 0, xAxis?.width ?? 0];
  const [yAxisHeight, yAxisWidth] = [yAxis?.height ?? 0, yAxis?.width ?? 0];

  const width = xAxisWidth + yAxisWidth;
  const height = xAxisHeight + yAxisHeight;
  const maxScrollY = calculateYPos(data.length) - (yAxis?.height ?? 0);

  function calculateYPos(rowIndex: number) {
    return rowIndex * (2 * (row?.py ?? 0) + (row?.segmentHeight ?? 0) + (row?.spacing ?? 0));
  }

  return (
    <g
      data-aria-label="timeline-graph"
      onWheel={(e) => {
        console.log("EEE");
        onWheel();

        if (e.shiftKey) {
          const delta = -((start - end) * Math.max(Math.min(e.deltaY, 1000), -1000)) / 1000;

          const newStart = start + delta;
          const newEnd = end + delta;

          setStart(newStart);
          setEnd(newEnd);
        } else if (e.ctrlKey) {
          const delta = ((start - end) * Math.max(Math.min(e.deltaY, 1000), -1000)) / 1000;
          const newStart = start - delta;
          const newEnd = end + delta;

          setStart(newStart);
          setEnd(newEnd);
        } else {
          const next = scrollY + e.deltaY;
          setScrollY(Math.max(0, Math.min(maxScrollY, next)));
        }
      }}
      width={width}
      height={height}
    >
      {/* Hack to extend scroll boundaries. */}
      <rect width={width} height={height} className="fill-transparent" />
      <g transform={`translate(${yAxisWidth + (row?.px ?? 0)}, 0)`}>
        <EditableTimelineGrid
          columns={{
            amount: ticks.amount,
            height: yAxisHeight,
            spacing: (xAxisWidth - (row?.px ?? 0) * 2) / (ticks.amount - 1),
            strokeWidth: 1,
          }}
        />
      </g>
      <g>
        <EditableTimelineYAxis
          width={yAxisWidth}
          height={yAxisHeight}
          rowSpacing={row?.spacing}
          labelHeight={row?.segmentHeight ?? 0}
          rowStyle={{
            px: row?.px,
            py: row?.py,
          }}
          rows={data.map((row) => {
            return {
              id: row.id,
              label: row.label,
            };
          })}
          offsetY={scrollY}
        />
      </g>
      <g transform={`translate(${yAxisWidth}, ${yAxisHeight})`}>
        <EditableTimelineXAxis
          width={xAxisWidth}
          labelStyle={{
            height: xAxis?.height,
          }}
          startX={start}
          endX={end}
          ticks={ticks.amount}
          tickFormat={ticks.tickFormat}
          px={row?.px}
        />
      </g>
      <g transform={`translate(${yAxisWidth}, 0)`}>
        <EditableTimelineSegmentRowContainer
          width={xAxisWidth}
          height={yAxisHeight}
          rowSpacing={row?.spacing}
          segmentHeight={row?.segmentHeight}
          rows={data.map((row) => {
            return {
              id: row.id ?? row.label,
              segments: row.segments.map((segment) => {
                return {
                  id: segment.id,
                  x: (segment.from - start) / (end - start),
                  width: (segment.to - segment.from) / (end - start),
                  editable: row.editable,
                };
              }),
              editable: row.editable,
            };
          })}
          rowStyle={{
            px: row?.px,
            py: row?.py,
          }}
          offsetY={scrollY}
        />
      </g>
    </g>
  );
};

export default EditableTimelineGraph;
