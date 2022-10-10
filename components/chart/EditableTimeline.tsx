import React, { HTMLAttributes, SVGAttributes, useRef } from "react";
import cx from "classnames";
import { useResizeDetector } from "react-resize-detector";

type TimeFrame = {
  id: number | string;
  from: number;
  to: number;
};

type PercentageUnit = number; // From 0 to 1
type TimelineRowSegment = {
  id: number | string;
  // Here, we use Percentage Unit as a numeric representation of the
  // position and width of the segment. DO NOT USE ThE EXACT VALUE
  // AS IT WILL INTRODUCE A LOT OF UNPREDICTABLE BEHAVIOR.
  x: PercentageUnit;
  width: PercentageUnit;
};
type DragListenerResult<T extends Element> = { event: React.MouseEvent<T, MouseEvent>; dx: number; dy: number; x: number; y: number };

function useDrag<T extends Element>(onDrag?: (e: DragListenerResult<T>) => void) {
  const ref = useRef<T>(null);

  const [startingX, setStartingX] = React.useState(0);
  const [startingY, setStartingY] = React.useState(0);

  return {
    props: {
      ref,
      onMouseDown: (e: React.MouseEvent<T, MouseEvent>) => {
        setStartingX(e.clientX);
        setStartingY(e.clientY);
      },
      onMouseMove: (e: React.MouseEvent<T, MouseEvent>) => {
        if (ref.current) {
          const { x, y } = ref.current.getBoundingClientRect();
          if (onDrag)
            onDrag({
              event: e,
              dx: e.clientX - startingX,
              dy: e.clientY - startingY,
              x: e.clientX - x,
              y: e.clientY - y,
            });
        }
      },
    },
  };
}

const EditableTimelineSegment: React.FC<{
  x: number | string;
  width: number | string;
  height: number | string;
  rx: number | string;
  onDrag?: (e: DragListenerResult<SVGGElement>) => void;
}> = ({ x, width, height, rx, onDrag }) => {
  const { props } = useDrag<SVGRectElement>(onDrag);
  return <rect x={x} width={width} height={height} rx={rx} className="fill-primary" {...props} />;
};

const GWrapper: React.FC<
  {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    px?: number;
    py?: number;
  } & SVGAttributes<SVGElement>
> = ({ children, x = 0, y = 0, px = 0, py = 0, width = 0, height = 0, ...otherProps }) => {
  return (
    <g width={width} height={height} x={x} y={y} {...otherProps}>
      <g aria-label="a" width={width - px * 2} height={height - py * 2} transform={`translate(${px}, ${py})`}>
        {children}
      </g>
    </g>
  );
};

const EditableTimelineSegmentRow: React.FC<{
  width?: number;
  transform?: string;
  x?: number;
  y?: number;
  px?: number;
  py?: number;
  segmentHeight?: number;
  segments: TimelineRowSegment[];
  edit?: boolean;
  onRequestStartEdit?: () => void;
  onRequestSegmentEdit?: (segment: TimelineRowSegment) => void;
  style?: React.CSSProperties;
  className?: string;
}> = ({ width = 0, transform, x = 0, y = 0, px = 0, py = 0, segmentHeight = 0, segments, edit, onRequestSegmentEdit, style, className }) => {
  const containerWidth = width;
  const containerHeight = segmentHeight + py * 2;

  const rowWidth = (containerWidth || 0) - px * 2;
  const rowHeight = segmentHeight;

  return (
    // Container
    <GWrapper transform={transform} x={x} y={y} width={containerWidth} height={containerHeight} px={px} py={py} style={style}>
      <rect
        rx={20}
        width={containerWidth}
        height={containerHeight}
        fillOpacity={0.25}
        strokeWidth={1}
        className={cx({
          "fill-transparent": !edit,
          "stroke-neutral-content fill-neutral-content": edit,
        })}
      />
      <g>
        {segments.map((segment) => {
          const segmentWidth = segment.width * rowWidth;
          const segmentX = segment.x * rowWidth;

          return <EditableTimelineSegment key={segment.id} x={segmentX} width={segmentWidth} height={rowHeight} rx={rowHeight / 2} />;
        })}
      </g>
    </GWrapper>
  );
};

const EditableTimelineSegmentRowContainer: React.FC<{
  width?: number;
  height?: number;
  offsetY?: number;
  segmentHeight?: number;
  rowSpacing?: number;
  rowStyle?: {
    px?: number;
    py?: number;
  };
  rows: {
    id: number | string;
    segments: TimelineRowSegment[];
    editable?: boolean;
  }[];
}> = ({
  width = 0,
  height = 0,
  offsetY = 0,
  segmentHeight = 20,
  rowSpacing = 10,
  rowStyle = {
    px: 10,
    py: 10,
  },
  rows,
}) => {
  function calculateYPos(row: number) {
    return row * (2 * (rowStyle?.py || 0) + segmentHeight + rowSpacing);
  }

  return (
    <svg width={width} height={height}>
      {rows.map((row, index) => {
        const y = calculateYPos(index);
        // If the row is not visible, don't render it.
        if (y < offsetY || y > offsetY + height) return null;

        return (
          <EditableTimelineSegmentRow
            key={row.id}
            width={width}
            transform={`translate(0, ${y - offsetY})`}
            segmentHeight={segmentHeight}
            px={rowStyle.px}
            py={rowStyle.py}
            segments={row.segments}
          />
        );
      })}
    </svg>
  );
};

function useSVGTextAlignment(verticalAlign: "top" | "middle" | "bottom", horizontalAlign: "left" | "middle" | "right") {
  let transformX = "0";
  let transformY = "0";

  let textAnchor = undefined;
  let dominantBaseline = undefined;

  if (verticalAlign === "top") {
    dominantBaseline = "hanging";
  } else if (verticalAlign === "middle") {
    dominantBaseline = "middle";
    transformY = "50%";
  } else {
    transformY = "100%";
  }

  if (horizontalAlign === "left") {
    textAnchor = "start";
  } else if (horizontalAlign === "middle") {
    textAnchor = "middle";
    transformX = "50%";
  } else {
    textAnchor = "end";
    transformX = "100%";
  }

  return {
    transform: `translate(${transformX}, ${transformY})`,
    textAnchor,
    dominantBaseline,
  };
}

const EditableTimelineLabel: React.FC<{
  label: string;
  width?: number;
  transform?: string;
  x?: number;
  y?: number;
  px?: number;
  py?: number;
  labelHeight?: number;
  style?: React.CSSProperties;
  className?: string;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  verticalAlign?: "top" | "middle" | "bottom";
  horizontalAlign?: "left" | "middle" | "right";
}> = ({
  label,
  width = 0,
  transform,
  x = 0,
  y = 0,
  px = 0,
  py = 0,
  labelHeight = 0,
  style,
  className,
  labelStyle,
  labelClassName,
  verticalAlign = "middle",
  horizontalAlign = "left",
}) => {
  const labelProps = useSVGTextAlignment(verticalAlign, horizontalAlign);
  const containerWidth = width;
  const containerHeight = labelHeight + py * 2;

  const rowWidth = (containerWidth || 0) - px * 2;
  const rowHeight = labelHeight;

  return (
    // Container
    <>
      <rect transform={transform} x={x} y={y} width={containerWidth} height={containerHeight} className="fill-secondary" />
      <GWrapper transform={transform} x={x} y={y} width={containerWidth} height={containerHeight} px={px} py={py} style={style} className={className}>
        <rect width={rowWidth} height={rowHeight} className="fill-primary" />
        <text width={rowWidth} height={rowHeight} style={labelStyle} className={cx(labelClassName, "fill-base-content text-sm font-medium")}>
          <tspan width={rowWidth} height={rowHeight} {...labelProps}>
            {label}
          </tspan>
        </text>
      </GWrapper>
    </>
  );
};

const EditableTimelineYAxis: React.FC<{
  width?: number;
  height?: number;
  offsetY?: number;
  rowSpacing?: number;
  labelHeight: number;
  rowStyle?: {
    px?: number;
    py?: number;
  };
  labelStyle?: {
    style?: React.CSSProperties;
    className?: string;
    verticalAlign?: "top" | "middle" | "bottom";
    horizontalAlign?: "left" | "middle" | "right";
  };
  rows: {
    id?: number | string;
    label: string;
  }[];
}> = ({ width = 0, height = 0, offsetY = 0, rowSpacing = 0, labelHeight, rowStyle, labelStyle, rows }) => {
  const rowWidth = width;

  function calculateYPos(row: number) {
    // console.log(`row ${row}, ${row * (2 * (rowStyle?.py ?? 0) + labelHeight + rowSpacing)}`);
    return row * (2 * (rowStyle?.py ?? 0) + labelHeight + rowSpacing);
  }

  return (
    <g width={width} height={height}>
      {rows.map((row, index) => {
        const y = calculateYPos(index);

        // If the row is not visible, don't render it.
        if (y < offsetY || y > offsetY + height) return null;

        return (
          <EditableTimelineLabel
            key={row.id ?? row.label}
            width={rowWidth}
            transform={`translate(0, ${y - offsetY})`}
            labelHeight={labelHeight}
            px={rowStyle?.px}
            py={rowStyle?.py}
            label={row.label}
            verticalAlign={labelStyle?.verticalAlign}
            horizontalAlign={labelStyle?.horizontalAlign}
          />
        );
      })}
    </g>
  );
};

const EditableTimelineGraph: React.FC<{
  height?: number;
  segmentHeight?: number;
  rowSpacing?: number;
  rowStyle?: {
    px?: number;
    py?: number;
  };
  yAxis?: {
    width?: number;
  };
  segmentsContainer?: {
    width?: number;
  };
  rows: {
    id?: number | string;
    label: string;
    segments: TimelineRowSegment[];
    editable?: boolean;
  }[];
}> = ({
  height = 0,
  rows,
  segmentHeight = 0,
  rowSpacing = 0,
  rowStyle,
  yAxis = {
    width: 0,
  },
  segmentsContainer = {
    width: 0,
  },
}) => {
  const [scrollY, setScrollY] = React.useState(0);
  const width = (yAxis.width ?? 0) + (segmentsContainer.width ?? 0);
  const maxScrollY = calculateYPos(rows.length) - height;

  function calculateYPos(row: number) {
    return row * (2 * (rowStyle?.py ?? 0) + segmentHeight + rowSpacing);
  }

  return (
    <g>
      <g
        onWheel={(e) => {
          // console.log(e.deltaY);
          const next = scrollY + e.deltaY;
          setScrollY(Math.max(0, Math.min(maxScrollY, next)));
        }}
        width={width}
        height={height}
      >
        <EditableTimelineYAxis
          width={yAxis.width}
          height={height}
          rowSpacing={rowSpacing}
          labelHeight={segmentHeight}
          rowStyle={{
            px: rowStyle?.px,
            py: rowStyle?.py,
          }}
          rows={rows.map((row) => {
            return {
              id: row.id,
              label: row.label,
            };
          })}
          offsetY={scrollY}
        />
        <g transform={`translate(${yAxis.width ?? 0}, 0)`}>
          <EditableTimelineSegmentRowContainer
            width={segmentsContainer.width}
            height={height}
            rowSpacing={rowSpacing}
            segmentHeight={segmentHeight}
            rows={rows.map((row) => {
              return {
                id: row.id ?? row.label,
                segments: row.segments,
                editable: row.editable,
              };
            })}
            rowStyle={{
              px: rowStyle?.px,
              py: rowStyle?.py,
            }}
            offsetY={scrollY}
          />
        </g>
      </g>
    </g>
  );
};

const EditableTimeline: React.FC<{}> = () => {
  const { ref, width, height } = useResizeDetector();

  const fakeRows = [];
  for (let i = 0; i < 100; i++) {
    fakeRows.push({
      id: i,
      label: `Row widi iwi dedwnd wdne nwnj njewj njnew njdwje n w ${i}`,
      segments: [
        {
          id: 1,
          x: Math.random() * 0.15,
          width: Math.random() * 0.2,
        },
        {
          id: 2,
          x: Math.random() * 0.15 + 0.3,
          width: Math.random() * 0.4,
        },
      ],
    });
  }

  return (
    <svg ref={ref} width="100%" height={500}>
      <EditableTimelineGraph
        segmentHeight={20}
        rowSpacing={0}
        rowStyle={{
          px: 10,
          py: 10,
        }}
        height={height}
        yAxis={{
          width: 200,
        }}
        segmentsContainer={{
          width: (width ?? 0) - 100,
        }}
        rows={fakeRows}
      />
    </svg>
  );
};

export default EditableTimeline;

// const EditableTimeline: React.FC<{
//   width?: number | string;
//   rowSegmentsWidth?: number | string;
//   rows: React.ComponentProps<typeof EditableTimelineSegmentRow> &
//     {
//       id?: number | string; // optional, if not provided, label will be used.
//       label: string;
//       editable?: boolean;
//       timeFrames: TimeFrame[];
//       onTimeFrameChange?: (timeFrame: TimeFrame) => void;
//     }[];
//   onTimeFrameChange: (label: string, timeFrame: TimeFrame) => void;
//   style?: React.CSSProperties;
//   className?: string;
// }> = ({ width, rowSegmentsWidth = "80%", rows, style, className }) => {
//   const [rowsWidth, setRowsWidth] = React.useState(0);
//   return (
//     <svg width={width} style={style} className={className}>
//       <Measure
//         onResize={(rect) => {
//           setRowsWidth(rect.entry.width);
//         }}
//       >
//         {({ measureRef }) => {
//           return (
//             <g ref={measureRef} width={rowSegmentsWidth}>
//               {rows.map((row) => {
//                 return (
//                   <EditableTimelineSegmentRow
//                     key={row.id}
//                     width={rowsWidth}
//                     onRequestSegmentEdit={(segment) => {
//                       segment.x;
//                     }}
//                     segments={row.timeFrames.map((timeFrame) => {
//                       return {
//                         id: timeFrame.id,
//                       };
//                     })}
//                   />
//                 );
//               })}
//             </g>
//           );
//         }}
//       </Measure>
//     </svg>
//   );
// };
