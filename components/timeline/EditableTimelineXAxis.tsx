import React from "react";
import EditableTimelineLabel from "./EditableTimelineLabel";

const EditableTimelineXAxis: React.FC<{
  width?: number;
  px?: number;
  py?: number;
  labelStyle?: {
    height?: number;
    style?: React.CSSProperties;
    className?: string;
  };
  ticks?: number;
  tickFormat?: (d: number) => string;
  startX: number;
  endX: number;
}> = ({ width = 0, px = 0, py = 0, labelStyle, ticks = 0, tickFormat, startX, endX }) => {
  if (startX >= endX) throw new Error("startX must be less than endX");

  function calculateXPos(tickIndex: number) {
    if (ticks <= 1) {
      return 0;
    }
    // console.log(`row ${row}, ${row * (2 * (rowStyle?.py ?? 0) + labelHeight + rowSpacing)}`);
    return (tickIndex / (ticks - 1)) * (width - px * 2);
  }

  const tickElements: React.ReactNode[] = [];

  for (let i = 0; i < ticks; i++) {
    const x = calculateXPos(i);
    const xTicks = (i / (ticks - 1)) * (endX - startX) + startX;
    const label = tickFormat ? tickFormat(xTicks) : xTicks.toString();
    tickElements.push(
      <EditableTimelineLabel
        key={i}
        label={label}
        transform={`translate(${x}, 0)`}
        className={labelStyle?.className}
        style={labelStyle?.style}
        labelHeight={labelStyle?.height}
        verticalAlign="middle"
        horizontalAlign="middle"
      />
    );
  }

  return (
    <g width={width} height={(labelStyle?.height ?? 0) + 2 * py}>
      <g width={width - 2 * px} transform={`translate(${px}, ${py})`} height={labelStyle?.height}>
        {tickElements}
      </g>
    </g>
  );
};

export default EditableTimelineXAxis;
