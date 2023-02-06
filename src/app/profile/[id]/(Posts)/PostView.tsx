"use client";

import { IPost } from "@/type";
import getDbFileUrlInClient from "@/utils/client/getDbFileUrl";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface PostViewProp {
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
  posts: IPost[];
}

function PostView({ selected, setSelected, posts }: PostViewProp) {
  const selectedPost = selected !== null ? posts[selected] : null;

  return (
    <div
      className={`top-0 left-0 fixed w-full h-full ${
        selected === null ? "hidden" : ""
      } z-50 flex justify-center items-center`}
    >
      {/* gray layout*/}
      <div className="absolute bg-black w-full h-full z-0 opacity-60" />
      {/* main */}
      <div className="w-full max-w-xl p-6 max-sm:p-4 bg-white rounded-2xl shadow-lg z-10 flex flex-col gap-4">
        {/* header */}
        <div className="w-full flex items-center justify-between">
          <span className="text-2xl">Post</span>
          <button
            className="p-3 hover:bg-slate-50 rounded-full"
            onClick={() => setSelected(null)}
          >
            <Image
              src={require("@/icons/minimize-24.svg")}
              alt=""
              className="w-5"
            />
          </button>
        </div>
        {selectedPost !== null && selected !== null ? (
          <>
            {/* img */}
            <img
              src={
                selectedPost.image
                  ? getDbFileUrlInClient(
                      "posts",
                      selectedPost.id,
                      selectedPost.image as string,
                      "576x576"
                    )
                  : ""
              }
              alt=""
              className="w-full aspect-square rounded transition-all bg-slate-100"
            />
            {/* like */}
            {/* content */}
            <span className="indent-4">{selectedPost.content}</span>
            {/* pagination */}
            <div className="flex items-center justify-between">
              {/* Prev */}
              <button
                className="p-3 rounded-full shadow shadow-indigo-300 disabled:shadow-sm"
                onClick={() => {
                  setSelected(selected - 1);
                }}
                disabled={selected === 0}
              >
                <Image
                  src={require("@/icons/left-24.svg")}
                  alt=""
                  className="w-6"
                />
              </button>
              {/* Next */}
              <button
                className="p-3 rounded-full shadow shadow-indigo-300 disabled:shadow-sm"
                onClick={() => {
                  setSelected(selected + 1);
                }}
                disabled={selected + 1 === posts.length}
              >
                <Image
                  src={require("@/icons/right-24.svg")}
                  alt=""
                  className="w-6"
                />
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default PostView;
