export type VerticalAlignment = "top" | "middle" | "bottom";
export type HorizontalAlignment = "left" | "middle" | "right";

export default function useSVGTextAlignment({
  verticalAlign,
  horizontalAlign,
  width,
  height,
}: {
  verticalAlign: VerticalAlignment;
  horizontalAlign: HorizontalAlignment;
  width: number;
  height: number;
}) {
  let transformX = 0;
  let transformY = 0;

  let textAnchor = undefined;
  let dominantBaseline = undefined;

  if (verticalAlign === "top") {
    dominantBaseline = "hanging";
  } else if (verticalAlign === "middle") {
    dominantBaseline = "middle";
    transformY = height * 0.5;
  } else {
    transformY = height;
  }

  if (horizontalAlign === "left") {
    textAnchor = "start";
  } else if (horizontalAlign === "middle") {
    textAnchor = "middle";
    transformX = width * 0.5;
  } else {
    textAnchor = "end";
    transformX = width;
  }

  return {
    transform: `translate(${transformX}, ${transformY})`,
    textAnchor,
    dominantBaseline,
  };
}
