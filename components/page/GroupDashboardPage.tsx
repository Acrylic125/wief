import GroupDashboardBase from "components/group-dashboard/GroupDashboard";
import Separator from "components/separator/Separator";
import { ChildrenProps } from "components/types";
import Page from "./Page";

export type GroupDashboardPageBaseProps = {};

export type GroupDashboardProps = GroupDashboardPageBaseProps & ChildrenProps;

export default function GroupDashboardPage({ children }: GroupDashboardProps) {
  return (
    <Page className="flex flex-col items-center px-4">
      <div className="flex flex-col w-full max-w-10xl">
        <Separator size="xl" />
        <GroupDashboardBase groupName="Group B">{children}</GroupDashboardBase>
      </div>
    </Page>
  );
}
