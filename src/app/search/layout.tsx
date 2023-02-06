import React from "react";
import SearchBar from "./SearchBar";

interface PageProp {
  children: React.ReactNode;
}

function SearchLayout({ children }: PageProp) {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full max-w-5xl grid grid-rows-[min-content_1fr]">
        <SearchBar />
        {children}
      </div>
    </div>
  );
}

export default SearchLayout;
