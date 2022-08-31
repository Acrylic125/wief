import { StylingProps } from "components/types";
import * as React from "react";

export type GroupDashboardSidebarBaseProps = {};

export type GroupDashboardSidebarPrps = GroupDashboardSidebarBaseProps & StylingProps;

export default function GroupDashboardSidebar({ style, className }: GroupDashboardSidebarPrps) {
  return (
    <aside style={style} className={className}>
      <ul>
        <li>Hello</li>
      </ul>
    </aside>
  );
}
