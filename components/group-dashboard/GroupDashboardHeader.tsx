import { StylingProps } from "components/types";
import cx from "classnames";
import React from "react";
import Button from "components/buttons/Button";

export type GroupDashboardHeaderBaseProps = {
  groupName: string;
  onRequestShare?: (() => void) | undefined;
};

export type GroupDashboardHeaderProps = GroupDashboardHeaderBaseProps & StylingProps;

export default function GroupDashboardHeader({ groupName, onRequestShare, style, className }: GroupDashboardHeaderProps) {
  return (
    <header style={style} className={cx("flex flex-row items-center justify-between", className)}>
      <h1 className="text-4xl font-bold">{groupName}</h1>
      <Button size="md" onClick={onRequestShare}>
        Share
      </Button>
    </header>
  );
}
