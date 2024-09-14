"use client";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import Icons from "./Icons";
import Link from "next/link";
import { useTheme } from "@/context/theme-context";

interface DashboardSideNavBarProps {
  DrawerClose?: FC<{ children: ReactNode }>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

type Icon = keyof typeof Icons;

interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Dashboard",
    href: "/",
    Icon: "home",
  },
  {
    id: 2,
    name: "Data",
    href: "/dataView",
    Icon: "info",
  },
];

const DashboardSideNavBar: FC<DashboardSideNavBarProps> = ({
  DrawerClose,
  setOpen,
}) => {
  const { theme } = useTheme();
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <div className=" flex flex-col max-w-60 w-full h-dvh py-4  overflow-y-auto">
      <div className={`flex justify-between pl-2`}>
        <Icons.logo />
        {/* {DrawerClose && (
          <DrawerClose>
            <Icons.close />
          </DrawerClose>
        )} */}
      </div>
      <nav className={`flex flex-col py-10`}>
        <ul role="list" className="flex flex-col gap-y-4">
          {sidebarOptions.map((option) => {
            const Icon = Icons[option.Icon];
            return (
              <li key={option.id} className="hover:bg-slate-500 p-2 pr-10">
                <Link
                  onClick={() => {
                    if (setOpen) setOpen(false);
                  }}
                  href={option.href}
                  className=" flex items-center  gap-3 text-lg font-semibold">
                  <span className="">
                    <Icon
                      className=""
                      stroke={theme === "dark" ? "white" : "black"}
                    />
                  </span>

                  <span
                    className={`truncate ${activeId === option.id ? "" : ""}`}>
                    {option.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSideNavBar;
