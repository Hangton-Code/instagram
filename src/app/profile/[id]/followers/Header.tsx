import { IUser } from "@/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HeaderProp {
  user: IUser;
}

function Header({ user }: HeaderProp) {
  return (
    <div className="w-full flex justify-between items-center p-4">
      {/* back button */}
      <Link href={`/profile/${user.id}`}>
        <button className="rounded-lg p-3 hover:bg-indigo-50">
          <Image
            src={require("@/icons/arrow-left-24.svg")}
            className="w-6"
            alt=""
          />
        </button>
      </Link>
      {/* Heading */}
      <span className="font-semibold text-slate-800 text-lg">
        <span className="text-indigo-500">{user.display_name}</span>'s Followers
      </span>
      {/* use for centering Heading */}
      <div className="p-3">
        <div className="w-6 aspect-square" />
      </div>
    </div>
  );
}

export default Header;
