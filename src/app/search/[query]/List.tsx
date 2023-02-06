"use client";

import React from "react";
import getDbFileUrlInClient from "@/utils/client/getDbFileUrl";
import { ITag, IUser } from "@/type";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface ListProp {
  users: IUser[];
  tags: ITag[];
  selectedItem: number;
}

function List({ users, tags, selectedItem }: ListProp) {
  const { data: session } = useSession();
  const userData = session?.user as IUser;

  return (
    <>
      {/* user */}
      <div
        className={`w-full overflow-auto py-4 ${
          selectedItem !== 0 ? "hidden" : ""
        }`}
      >
        {users.map((user, i) =>
          user.id !== userData?.id ? (
            <Link key={i} href={`/profile/${user.id}`}>
              <div className="w-full py-2 px-[5%] flex items-center hover:bg-slate-50 hover:rounded-lg transition-all justify-between">
                {/* left */}
                <div className="flex items-center gap-4">
                  {/* avatar */}
                  <img
                    className="w-14 rounded-full"
                    src={
                      user.avatar
                        ? getDbFileUrlInClient(
                            "users",
                            user.id,
                            user.avatar,
                            "56x56"
                          )
                        : `https://ui-avatars.com/api/?name=${user.display_name}`
                    }
                    alt=""
                  />
                  {/* name */}
                  <div className="flex flex-col">
                    <span className="font-medium text-salte-800">
                      {user.display_name}
                    </span>
                    <span className="text-xs text-salte-300">
                      @{user.user_name}
                    </span>
                  </div>
                </div>

                {/* right */}
                <button className="transition-all py-1 px-4 bg-indigo-500 font-medium text-white rounded hover:shadow-md hover:shadow-indigo-300">
                  Follow
                </button>
              </div>
            </Link>
          ) : (
            <></>
          )
        )}
      </div>

      <div
        className={`w-full overflow-auto py-4 ${
          selectedItem !== 1 ? "hidden" : ""
        }`}
      >
        {tags.map((tag, i) => (
          <Link key={i} href={`/tag/${tag.id}`}>
            <div className="w-full py-4 px-[5%] flex items-center hover:bg-slate-50 hover:rounded-lg transition-all justify-between">
              {/* left */}
              <span className="font-medium text-lg text-salte-800">
                #{tag.name}
              </span>

              {/* right */}
              <span className="text-slate-500">{tag.posts} Posts</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default List;
