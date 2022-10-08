import React from "react";
import cx from "classnames";

const TimelineChartSegment: React.FC<{
  width: number;
  height: number;
  borderRadius?: number;
  strokeWidth?: number;
  opacity?: number;
  x?: number;
  y?: number;
  className?: string;
}> = ({ width, height, borderRadius = 0, strokeWidth = 1, opacity = 0.5, x = 0, y = 0, className }) => {
  // Sample:
  // M0,0 h200 a10,10 0 0 1 10,10 v200 a10,10 0 0 1 -10,10 h-200 a10,10 0 0 1 -10,-10 v-200 a 10,10 0 0 1 10,-10 z

  // We need to reprocess the width and height to account for the border radius and stroke width.
  const processedX = x + borderRadius + strokeWidth / 2;
  const processedY = y + strokeWidth / 2;
  const processedWidth = width - borderRadius * 2 - strokeWidth;
  const processedHeight = height - borderRadius * 2 - strokeWidth;

  return (
    <path
      d={`M${processedX},${processedY}
          h${processedWidth} a${borderRadius},${borderRadius} 0 0 1 ${borderRadius},${borderRadius} 
          v${processedHeight} a${borderRadius},${borderRadius} 0 0 1 -${borderRadius},${borderRadius}
          h-${processedWidth} a${borderRadius},${borderRadius} 0 0 1 -${borderRadius},-${borderRadius} 
          v-${processedHeight} a${borderRadius},${borderRadius} 0 0 1 ${borderRadius},-${borderRadius} z`}
      fillOpacity={opacity}
      strokeWidth={strokeWidth}
      className={cx(className, "fill-primary stroke-primary")}
    />
  );
};

export default function TimelineChart() {
  return (
    <svg width={400} height={400}>
      <g>
        <TimelineChartSegment width={400} height={400} strokeWidth={0} />
        <TimelineChartSegment width={200} height={200} strokeWidth={30} />
        <TimelineChartSegment width={200} height={200} className="fill-secondary" />
      </g>
    </svg>
  );
}
