import { getFollowersById, getProfileById } from "@/utils/db";
import React from "react";
import NotFound from "../NotFound";
import Header from "./Header";

interface PageProp {
  params: {
    id: string;
  };
}

async function getProfile(id: string) {
  const user = await getProfileById(id, "no-cache");
  if (!user) return null;

  const followers = await getFollowersById(id, "no-cache");
  return { user, followers };
}

async function Followers({ params: { id } }: PageProp) {
  const data = await getProfile(id);
  if (!data) return <NotFound />;

  return (
    <div className="w-full h-full grid grid-rows-[min-content_1fr]">
      <Header user={data.user} />
    </div>
  );
}

export default Followers;
