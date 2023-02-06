"use client";

import { IPost } from "@/type";
import getDbFileUrlInClient from "@/utils/client/getDbFileUrl";
import React, { useState } from "react";
import PostView from "./PostView";

interface PostsProp {
  posts: IPost[];
}

function Posts({ posts }: PostsProp) {
  const [selectedPostView, setSelectedPostView] = useState<number | null>(null);

  return (
    <div className="py-6 w-full max-w-[calc(192px_*_3)] flex flex-col items-center gap-6">
      <span className="w-full text-3xl indent-2">Posts</span>
      <div className="w-full grid grid-cols-[repeat(auto-fill,_192px)] max-sm:grid-cols-[repeat(auto-fill,_168px)] max-sm:justify-center">
        {posts.map((post, i) => (
          <img
            onClick={() => setSelectedPostView(i)}
            key={i}
            src={
              post.image
                ? getDbFileUrlInClient("posts", post.id, post.image, "192x192")
                : ""
            }
            title={post.content}
            alt=""
            className="w-full aspect-square hover:opacity-70 hover:cursor-pointer rounded hover:rounded-xl transition-all bg-slate-100"
          />
        ))}
      </div>
      <PostView
        posts={posts}
        selected={selectedPostView}
        setSelected={setSelectedPostView}
      />
    </div>
  );
}

export default Posts;
