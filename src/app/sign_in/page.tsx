import React from "react";
import GoogleButton from "./GoogleButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session?.user) return redirect("/");
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="rounded-xl border-2 border-slate-300 px-5 py-3 flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-indigo-500">Sign In</span>
        <GoogleButton />
      </div>
    </div>
  );
}

export default SignIn;
