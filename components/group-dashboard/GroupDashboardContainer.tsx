import * as React from "react";
import cx from "classnames";
import { ChildrenProps, StylingProps } from "components/types";

export type GroupDashboardContainerBaseProps = {
  header?: React.ReactNode | undefined;
};

export type GroupDashboardContainerProps = GroupDashboardContainerBaseProps & StylingProps & ChildrenProps;

export default function GroupDashboardContainer({ header, children, style, className }: GroupDashboardContainerProps) {
  return (
    <div style={style} className={cx("flex flex-col border-2 rounded-md border-base-light", className)}>
      {header}
      <div className="w-full">{children}</div>
    </div>
  );
}
