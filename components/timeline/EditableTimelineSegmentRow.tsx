import React from "react";
import cx from "classnames";
import EditableTimelineSegment from "./EditableTimelineSegment";

type PercentageUnit = number; // From 0 to 1
export type TimelineRowSegment = {
  id: number | string;
  // Here, we use Percentage Unit as a numeric representation of the
  // position and width of the segment. DO NOT USE ThE EXACT VALUE
  // AS IT WILL INTRODUCE A LOT OF UNPREDICTABLE BEHAVIOR.
  x: PercentageUnit;
  width: PercentageUnit;
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
    <g transform={transform} x={x} y={y} width={containerWidth} height={containerHeight} style={style}>
      <rect
        rx={20}
        width={containerWidth}
        height={containerHeight}
        fillOpacity={0.35}
        strokeWidth={1}
        className={cx({
          "fill-transparent": !edit,
          "stroke-neutral fill-neutral": edit,
        })}
      />
      <g width={rowWidth} height={rowHeight} transform={`translate(${px}, ${py})`}>
        <g>
          {segments.map((segment) => {
            const segmentWidth = segment.width * rowWidth;
            const segmentX = segment.x * rowWidth;

            return <EditableTimelineSegment key={segment.id} x={segmentX} width={segmentWidth} height={rowHeight} rx={rowHeight / 2} />;
          })}
        </g>
      </g>
    </g>
  );
};

export default EditableTimelineSegmentRow;
