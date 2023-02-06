"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type PageProp = {
  children: ReactNode;
};

function Provider({ children }: PageProp) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
