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

interface DashboardSideDrawerProps {}

const DashboardSideDrawer: FC<DashboardSideDrawerProps> = ({}) => {
  const [open, setOpen] = useState(true);
  //   const hamburgerClicked = () => {
  //     // console.log("hamburger clicked");
  //     if (callStarted) {
  //       setEndCallDialogOpen(true);
  //     }
  //   };

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <div className={`pt-4 pl-4`}>
        <DrawerTrigger>
          <Icons.menu stroke="white" />
        </DrawerTrigger>
      </div>
      <DrawerContent className="w-fit bg-black">
        <DrawerHeader className="hidden">
          <DrawerTitle>navbar</DrawerTitle>
          <DrawerDescription>For navigating different pages</DrawerDescription>
        </DrawerHeader>
        <DashboardSideNavBar DrawerClose={DrawerClose} setOpen={setOpen} />
      </DrawerContent>
    </Drawer>
  );
};

export default DashboardSideDrawer;
