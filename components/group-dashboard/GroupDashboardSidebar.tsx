import Sidebar from "components/sidebar/Sidebar";
import * as React from "react";
import cx from "classnames";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

function GroupDashboardSidebarWithSSR() {
  const collapsed = useMediaQuery({ minWidth: "768px" });

  return (
    <Sidebar
      className={cx("py-4 max-w-sm", {
        "w-1/6 min-w-fit": !collapsed,
      })}
      showLabel={collapsed}
      showTabGroupLabels={collapsed}
      tabGroups={[
        {
          label: "Group",
          tabs: [
            {
              id: "group-dashboard",
              label: "Dashboard",
            },
            {
              id: "settings",
              label: "Settings",
            },
          ],
        },
      ]}
    />
  );
}

// By default, we will No SSR this component because
// useMediaQuery is not SSR friendly.
const GroupDashboardSidebar = dynamic(
  () => {
    return Promise.resolve(GroupDashboardSidebarWithSSR);
  },
  {
    ssr: false,
  }
);

export default GroupDashboardSidebar;
