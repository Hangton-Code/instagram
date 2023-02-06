"use client";

import getDbFileUrlInClient from "@/utils/client/getDbFileUrl";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function NavBar() {
  const { data: session, status } = useSession();
  const id = session?.user.id;
  const display_name = session?.user.display_name;
  const avatar = session?.user.avatar;

  return (
    <div className="w-full h-[72px] py-3 px-8 max-md:py-2 max-md:px-4 shadow-sm bg-slate-50 flex items-center justify-between">
      <Link
        className="text-slate-800 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600"
        href={"/"}
      >
        Instagram
      </Link>

      <div className="flex items-center justify-end gap-2">
        {/* button group */}
        <div className="flex items-center justify-end gap-1">
          <Link href="/search">
            <button className="p-3 rounded-full text-slate-800 hover:bg-slate-100">
              <Image src={require("../icons/search-24.svg")} alt="" />
            </button>
          </Link>
        </div>

        {/* profile */}
        {status !== "loading" ? (
          <>
            {status === "authenticated" ? (
              <Link href={`/profile/${id}`}>
                <div className="md:bg-indigo-50 md:rounded-md md:py-2 md:px-3 flex items-center gap-1">
                  <img
                    className="w-8 rounded-full max-md:w-9"
                    src={
                      avatar
                        ? getDbFileUrlInClient(
                            "users",
                            id as string,
                            avatar,
                            "36x36"
                          )
                        : `https://ui-avatars.com/api/?name=${display_name}`
                    }
                    alt=""
                  />
                  <span className="text-slate-800 font-semibold text-sm max-md:hidden">
                    {display_name}
                  </span>
                </div>
              </Link>
            ) : (
              <Link href="/sign_in">
                <button className="py-1 px-4 bg-indigo-500 font-medium text-white rounded hover:shadow-md hover:shadow-indigo-300 transition-all">
                  Sign In
                </button>
              </Link>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default NavBar;
