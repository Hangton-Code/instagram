import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image
        src={require("@/icons/loading-indigo-500-bg-white.gif").default}
        className="w-24"
        alt=""
      />
      <span className="leading-loose font-medium text-slate-800">
        Life is the process of patient.
      </span>
    </div>
  );
}

export default Loading;
