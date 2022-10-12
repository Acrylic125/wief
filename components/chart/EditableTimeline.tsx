import React, { HTMLAttributes, SVGAttributes, useEffect, useRef, WheelEventHandler } from "react";
import cx from "classnames";
import { useResizeDetector } from "react-resize-detector";
import useDrag, { DragListenerResult } from "../../hooks/useDrag";
import EditableTimelineGraph from "../timeline/EditableTimelineGraph";

type TimeFrame = {
  id: number | string;
  from: number;
  to: number;
};

const EditableTimeline: React.FC<{}> = () => {
  const { ref, width, height } = useResizeDetector();

  const fakeRows = [];
  for (let i = 0; i < 3; i++) {
    fakeRows.push({
      id: i,
      label: `Row ${i}`,
      segments: [
        {
          id: 1,
          from: 0,
          to: 200,
        },
        {
          id: 2,
          from: 300,
          to: 500,
        },
      ],
    });
  }

  return (
    <svg ref={ref} width="100%" height={500}>
      <EditableTimelineGraph
        data={fakeRows}
        row={{
          segmentHeight: 20,
          px: 10,
          py: 10,
          // spacing: 10,
        }}
        xAxis={{
          height: 40,
          width: (width ?? 0) - 150,
        }}
        yAxis={{
          height: (height ?? 0) - 40,
          width: 150,
        }}
        ticks={{
          amount: 3,
          tickFormat: (value) => `${value}h`,
        }}
        defaultStart={0}
        defaultEnd={500}
        // segmentHeight={20}
        // rowSpacing={0}
        // rowStyle={{
        //   px: 10,
        //   py: 10,
        // }}
        // contentHeight={(height ?? 0) - 40}
        // xAxisHeight={40}
        // yAxis={{
        //   width: 100,
        // }}
        // segmentsContainer={{
        //   width: (width ?? 0) - 100,
        // }}
        // rows={fakeRows}
      />
    </svg>
  );
};

export default EditableTimeline;
