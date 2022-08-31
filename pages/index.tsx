import Button from "components/buttons/Button";
import GroupDashboardContainer from "components/group-dashboard/GroupDashboardContainer";
import GroupDashboardPage from "components/page/GroupDashboardPage";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <GroupDashboardPage>
      <GroupDashboardContainer>
        <h1>Hello</h1>
      </GroupDashboardContainer>
    </GroupDashboardPage>
  );
};

export default Home;
