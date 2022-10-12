import React from "react";
import cx from "classnames";
import useSVGTextAlignment, { HorizontalAlignment, VerticalAlignment } from "../../hooks/useSVGTextAlignment";

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
  verticalAlign?: VerticalAlignment;
  horizontalAlign?: HorizontalAlignment;
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
  horizontalAlign = "right",
}) => {
  const containerWidth = width;
  const containerHeight = labelHeight + py * 2;

  const rowWidth = (containerWidth || 0) - px * 2;
  const rowHeight = labelHeight;
  const labelProps = useSVGTextAlignment({
    verticalAlign,
    horizontalAlign,
    width: rowWidth,
    height: rowHeight,
  });

  return (
    // Container
    <g transform={transform} x={x} y={y} width={containerWidth} height={containerHeight} style={style} className={className}>
      <g width={rowWidth} height={rowHeight} transform={`translate(${px}, ${py})`}>
        <text
          {...labelProps}
          width={rowWidth}
          height={rowHeight}
          style={labelStyle}
          className={cx(labelClassName, "fill-base-content text-sm font-medium")}
        >
          <tspan width={rowWidth} height={rowHeight}>
            {label}
          </tspan>
          <title>{label}</title>
        </text>
      </g>
    </g>
  );
};

export default EditableTimelineLabel;
