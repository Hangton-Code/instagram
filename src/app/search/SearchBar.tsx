"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

function SearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/search/${searchQuery.replace("/", "").trim()}`);
  }

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <form
      onSubmit={onSubmit}
      className="w-full py-4 px-[5%] flex items-center gap-4"
    >
      <input
        className="flex-grow bg-white shadow border-2 border-transparent focus:border-indigo-500  text-lg text-slate-800 py-2 px-4 rounded-md outline-none transition-all"
        type="text"
        placeholder="Search Query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="py-2 px-4 rounded-md text-white font-medium bg-indigo-500 hover:shadow-md hover:shadow-indigo-300 transition-all"
        disabled={
          !searchQuery.trim() ||
          searchQuery.replace("/", "").trim() ===
            pathname?.replace("search/", "").replace("/", "").trim()
        }
      >
        {isLoading ? (
          <Image
            src={require("@/icons/loading-white-bg-indigo-500.gif")}
            alt=""
            className="w-6"
          />
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
}

export default SearchBar;
