"use client";

import updateSession from "@/utils/client/updateSession";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

interface FollowButtonProp {
  id: string;
}

function FollowButton({ id }: FollowButtonProp) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function followHandler() {
    setIsLoading(true);
    const res = await fetch(`/api/follow/${id}`, {
      method: "PATCH",
    });
    setIsLoading(false);
    if (res.status !== 200) return;

    updateSession();
  }

  async function unfollowHandler() {
    setIsLoading(true);
    const res = await fetch(`/api/follow/${id}`, {
      method: "DELETE",
    });
    setIsLoading(false);
    if (res.status !== 200) return;

    updateSession();
  }

  const isFollowing = session?.user.following_ids.includes(id);

  return (
    <button
      onClick={isFollowing ? unfollowHandler : followHandler}
      className={`border-2 w-fit h-fit justify-self-end self-center py-1 px-3 rounded-md font-semibold transition-all max-md:text-sm
      ${
        isFollowing
          ? "border-slate-800 text-slate-800 hover:border-indigo-500 hover:text-indigo-500"
          : "border-transparent bg-indigo-500 hover:shadow-md hover:shadow-indigo-300 text-white"
      }`}
      disabled={!session?.user || isLoading}
    >
      {isLoading ? (
        isFollowing ? (
          <Image
            src={require("@/icons/loading-slate-800-bg-white.gif")}
            className="w-7 max-md:w-6"
            alt=""
          />
        ) : (
          <Image
            src={require("@/icons/loading-white-bg-indigo-500.gif")}
            className="w-7 max-md:w-6"
            alt=""
          />
        )
      ) : isFollowing ? (
        "unfollow"
      ) : (
        "follow"
      )}
    </button>
  );
}

export default FollowButton;
