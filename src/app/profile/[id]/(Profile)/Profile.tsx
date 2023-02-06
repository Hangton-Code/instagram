import { IUser } from "@/type";
import { getDbFileUrl } from "@/utils/db";
import Link from "next/link";
import React from "react";
import FollowButton from "./FollowButton";

interface ProfileProp {
  user: IUser;
  followers: IUser[];
}

function Profile({ user, followers }: ProfileProp) {
  const created = new Date(user.created);
  const created_at_display = `${
    created.getMonth() + 1
  }/${created.getFullYear()}`;
  return (
    <div className="w-full flex px-[6%] py-12 gap-12 max-md:gap-4 max-md:px-[4%] justify-center items-center">
      <img
        className="w-36 max-sm:w-28 rounded-full"
        src={
          user.avatar
            ? getDbFileUrl("users", user.id, user.avatar, "144x144")
            : `https://ui-avatars.com/api/?name=${user.display_name}`
        }
        alt=""
      />
      <div className="flex-grow max-w-xs grid grid-rows-[min-content_min-content] grid-cols-[auto_auto] gap-2">
        {/* name */}
        <div className="flex flex-col">
          <span className="text-slate-800 text-3xl max-md:text-xl">
            {user.display_name}
          </span>
          <span className="text-slate-500 font-semibold text-lg max-md:text-sm">
            @{user.user_name}
          </span>
        </div>
        {/* follow button */}
        <FollowButton id={user.id} />
        {/* number data */}
        <div className="mt-1 justify-evenly flex col-start-1 col-end-3 max-md:scale-90 gap-2">
          <Link href={`/profile/${user.id}/followers`}>
            <div className="flex flex-col items-center hover:cursor-pointer text-center">
              <span>Followers</span>
              <span>{followers.length}</span>
            </div>
          </Link>

          <Link href={`/profile/${user.id}/following`}>
            <div className="flex flex-col items-center hover:cursor-pointer text-center">
              <span>Following</span>
              <span>{user.following_ids.length}</span>
            </div>
          </Link>

          <div
            className="flex flex-col items-center text-center"
            title={created.toDateString()}
          >
            <span>Created At</span>
            <span>{created_at_display}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
