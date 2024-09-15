"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

interface UserAvatarProps {}

const UserAvatar: FC<UserAvatarProps> = ({}) => {
  return (
    <li className="flex w-full items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white text-gray-800">
          <DropdownMenuItem>
            <Link href="#profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="#settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="#logout">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};

export default UserAvatar;
