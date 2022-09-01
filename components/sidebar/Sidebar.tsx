import cx from "classnames";
import { ID, StylingProps } from "components/types";
import * as React from "react";

export type SidebarTab = {
  id: ID;
  label: string;
  icon?: React.ReactNode;
  onClick?: (() => void) | undefined;
};

export type SidebarTabGroup = {
  label: string;
  tabs: SidebarTab[];
};

export type SidebarBaseProps = {
  defaultSelectedId?: ID | undefined;
  showIcon?: boolean | undefined;
  showLabel?: boolean | undefined;
  showTabGroupLabels?: boolean | undefined;
  tabGroups: SidebarTabGroup[];
};

export type SidebarPrps = SidebarBaseProps & StylingProps;

export default function Sidebar({
  defaultSelectedId,
  showIcon = true,
  showLabel = true,
  showTabGroupLabels = true,
  tabGroups,
  style,
  className,
}: SidebarPrps) {
  const [selectedId, setSelectedId] = React.useState<ID | null>(defaultSelectedId || null);

  return (
    <aside style={style} className={className}>
      <ul className="w-full">
        {tabGroups.map((tabGroup) => (
          <li className="flex flex-col gap-2" key={tabGroup.label}>
            {showTabGroupLabels && <h3 className="font-bold px-4 text-base-alt dark:text-dark-base-alt">{tabGroup.label}</h3>}
            <ul>
              {tabGroup.tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    className={cx(
                      "text-left w-full px-4 py-1 rounded-xl border-1 border-transparent hover:border-accent-default hover:dark:border-dark-accent-default active:brightness-75 transition duration-150 ease-in-out",
                      {
                        "bg-accent-default dark:bg-dark-accent-default text-base-dark dark:text-dark-base-dark": selectedId === tab.id,
                        "text-base-alt alt:text-alt-base-alt": selectedId !== tab.id,
                      }
                    )}
                    type="button"
                    onClick={() => {
                      setSelectedId(tab.id);
                      if (tab.onClick) {
                        tab.onClick();
                      }
                    }}
                  >
                    {showIcon && tab.icon && <span>{tab.icon}</span>}
                    {showLabel && tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
