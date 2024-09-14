"use client";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import Icons from "./Icons";
import Link from "next/link";

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
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <div className=" flex flex-col max-w-60 w-full h-dvh bg-dark-g p-4 pr-10 overflow-y-auto">
      <div className={`flex justify-between `}>
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
              <li key={option.id}>
                <Link
                  onClick={() => {
                    if (setOpen) setOpen(false);
                  }}
                  href={option.href}
                  className="text-white flex items-center  gap-3 text-lg font-semibold">
                  <span className="">
                    <Icon
                      className=""
                      stroke={activeId === option.id ? "#35BAFD" : "white"}
                    />
                  </span>

                  <span
                    className={`truncate ${
                      activeId === option.id
                        ? "text-joprimary-400"
                        : "text-white"
                    }`}>
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
