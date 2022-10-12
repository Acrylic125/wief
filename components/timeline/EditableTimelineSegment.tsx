import React from "react";
import useDrag, { DragListenerResult } from "../../hooks/useDrag";

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

export default EditableTimelineSegment;
