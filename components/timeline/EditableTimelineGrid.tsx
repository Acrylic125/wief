import React from "react";

const EditableTimelineGrid: React.FC<{
  rows?: {
    amount: number;
    spacing: number;
    width: number;
    strokeWidth: number;
  };
  columns?: {
    amount: number;
    spacing: number;
    height: number;
    strokeWidth: number;
  };
}> = ({ rows, columns }) => {
  const rowElements = [];
  const columnElements = [];

  if (rows) {
    for (let i = 0; i < rows.amount; i++) {
      const y = i * rows.spacing;
      rowElements.push(<line key={i} x1={0} y1={y} x2={rows.width} y2={y} strokeWidth={rows.strokeWidth} className="stroke-neutral" />);
    }
  }

  if (columns) {
    for (let i = 0; i < columns.amount; i++) {
      const x = i * columns.spacing;
      columnElements.push(<line key={i} x1={x} y1={0} x2={x} y2={columns.height} strokeWidth={columns.strokeWidth} className="stroke-neutral" />);
    }
  }

  return (
    <g>
      {rowElements}
      {columnElements}
    </g>
  );
};

export default EditableTimelineGrid;
