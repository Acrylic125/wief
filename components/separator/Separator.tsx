import { Size, StylingProps } from "components/types";
import cx from "classnames";
import React from "react";

export type SeparatorBaseProps = {
  size?: Size | undefined;
};

export type SeparatorProps = SeparatorBaseProps & StylingProps;

export default function Separator({ size = "sm", style, className }: SeparatorProps) {
  return (
    <div
      style={style}
      className={cx({
        "h-1": size === "xs",
        "h-2": size === "sm",
        "h-4": size === "md",
        "h-6": size === "lg",
        "h-16": size === "xl",
        className,
      })}
    />
  );
}
