import React from "react";
import EditableTimelineSegmentRow, { TimelineRowSegment } from "./EditableTimelineSegmentRow";

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
  rowSpacing = 0,
  rowStyle = {
    px: 10,
    py: 10,
  },
  rows,
}) => {
  function calculateYPos(row: number) {
    return row * (2 * (rowStyle?.py ?? 0) + segmentHeight + rowSpacing);
  }

  return (
    <svg width={width} height={height}>
      {rows.map((row, index) => {
        const y = calculateYPos(index);
        // If the row is not visible, don't render it.
        if (calculateYPos(index + 1) < offsetY || y > offsetY + height) return null;

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

export default EditableTimelineSegmentRowContainer;
