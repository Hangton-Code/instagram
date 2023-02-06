"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

function GoogleButton() {
  function googleHandler() {
    signIn("google");
  }

  return (
    <button
      className="py-2 px-4 bg-white shadow rounded-lg text-slate-800 font-semibold flex gap-2 items-center"
      onClick={googleHandler}
    >
      <Image
        src={require("../../icons/google-48.svg")}
        className="w-8"
        alt=""
      />
      Sign In With Google
    </button>
  );
}

export default GoogleButton;
