import { searchTagsByQuery, searchUsersByName } from "@/utils/db";
import React from "react";
import TabLayout from "./TabLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface PageProp {
  params: {
    query: string;
  };
}

async function searchFromDB(query: string) {
  const users = await searchUsersByName(query, "no-cache");
  const tags = await searchTagsByQuery(query, "no-cache");

  return { users, tags };
}

async function SearchByQuery({ params: { query } }: PageProp) {
  const session = await getServerSession(authOptions);
  const { users, tags } = await searchFromDB(query);

  const filtered_users = users.filter((user) => user.id !== session?.user.id);

  return (
    <div className="w-full h-full grid grid-rows-[min-content_1fr]">
      <TabLayout users={filtered_users} tags={tags} />
    </div>
  );
}

export default SearchByQuery;
