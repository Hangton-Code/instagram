"use client";

import { ITag, IUser } from "@/type";
import React, { useState } from "react";
import Tab from "./Tab";
import List from "./List";

interface TabLayoutProp {
  users: IUser[];
  tags: ITag[];
}

function TabLayout({ users, tags }: TabLayoutProp) {
  const [selectedItem, setSelectedItem] = useState(
    users.length || !tags.length ? 0 : 1
  );

  return (
    <div className=" px-[5%] w-full grid grid-rows-[min-content_1fr]">
      <Tab selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <List users={users} tags={tags} selectedItem={selectedItem} />
    </div>
  );
}

export default TabLayout;
