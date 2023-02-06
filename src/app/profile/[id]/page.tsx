import {
  getFollowersById,
  getPostsByUserId,
  getProfileById,
  getProfileByIds,
} from "@/utils/db";
import React from "react";
import NotFound from "./NotFound";
import Posts from "./(Posts)/Posts";
import Profile from "./(Profile)/Profile";

interface PageProp {
  params: {
    id: string;
  };
}

async function getProfile(id: string) {
  const user = await getProfileById(id, "no-cache");
  if (!user) return null;

  const posts = await getPostsByUserId(id, "no-cache");
  const followers = await getFollowersById(id, "no-cache");
  const following = await getProfileByIds(user.following_ids, "no-cache");
  return { user, posts, followers };
}

async function ProfileById({ params: { id } }: PageProp) {
  const data = await getProfile(id);
  if (!data) return <NotFound />;

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-full max-w-5xl flex items-center flex-col overflow-y-auto">
        <Profile user={data.user} followers={data.followers} />
        {/* divider */}
        <div className="h-[2px] w-full max-w-3xl bg-slate-100" />
        <Posts posts={data.posts} />
      </div>
    </div>
  );
}

export default ProfileById;
