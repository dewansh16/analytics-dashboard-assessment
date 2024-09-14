"use client";
import { FC, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import DashboardSideNavBar from "./DashboardSideNavBar";
import Icons from "./Icons";
import { useTheme } from "@/context/theme-context";

interface DashboardSideDrawerProps {}

const DashboardSideDrawer: FC<DashboardSideDrawerProps> = ({}) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Drawer direction="left" open={open} onOpenChange={setOpen}>
        <div className={`pt-4 pl-4`}>
          <DrawerTrigger>
            <Icons.menu stroke={theme === "dark" ? "white" : "black"} />
          </DrawerTrigger>
        </div>
        <DrawerContent className="w-fit bg-background text-foregroundl">
          <DrawerHeader className="hidden">
            <DrawerTitle>navbar</DrawerTitle>
            <DrawerDescription>
              For navigating different pages
            </DrawerDescription>
          </DrawerHeader>
          <DashboardSideNavBar DrawerClose={DrawerClose} setOpen={setOpen} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DashboardSideDrawer;
