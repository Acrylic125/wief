import { ChildrenProps, StylingProps } from "components/types";
import cx from "classnames";
import * as React from "react";

export type PageBaseProps = {};

export type PageProps = PageBaseProps & StylingProps & ChildrenProps;

export default function Page({ children, style, className }: PageProps) {
  return (
    <div style={style} className={cx("h-screen w-screen overflow-auto", className)}>
      {children}
    </div>
  );
}
