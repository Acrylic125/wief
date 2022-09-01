import { ChildrenProps, StylingProps } from "components/types";
import cx from "classnames";
import * as React from "react";
import GroupDashboardHeader from "./GroupDashboardHeader";
import GroupDashboardSidebar from "./GroupDashboardSidebar";

export type GroupDashboardBaseProps = {
  groupName: string;
};

export type GroupDashboardProps = GroupDashboardBaseProps & StylingProps & ChildrenProps;

export default function GroupDashboardBase({ groupName, children, style, className }: GroupDashboardProps) {
  return (
    <div style={style} className={cx("flex flex-col gap-4", className)}>
      <GroupDashboardHeader className="px-4" groupName={groupName} />
      <div className="flex flex-row gap-4 w-full">
        <GroupDashboardSidebar />
        {children}
      </div>
    </div>
  );
}
