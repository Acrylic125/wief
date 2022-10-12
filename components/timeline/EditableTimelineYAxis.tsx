import React from "react";
import { HorizontalAlignment, VerticalAlignment } from "../../hooks/useSVGTextAlignment";
import EditableTimelineLabel from "./EditableTimelineLabel";

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
    verticalAlign?: VerticalAlignment;
    horizontalAlign?: HorizontalAlignment;
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
        if (calculateYPos(index + 1) < offsetY || y > offsetY + height) return null;

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

export default EditableTimelineYAxis;
