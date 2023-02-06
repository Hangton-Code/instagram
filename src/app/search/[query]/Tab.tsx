import React, { Dispatch, SetStateAction } from "react";

interface TabProp {
  selectedItem: number;
  setSelectedItem: Dispatch<SetStateAction<number>>;
}

function Tab({ selectedItem, setSelectedItem }: TabProp) {
  return (
    <div className="w-fit flex rounded-md overflow-hidden">
      {["Related Users", "Trendy Tags"].map((item, i) => (
        <button
          key={i}
          className={`font-semibold py-3 px-4 text-slate-800 bg-slate-50 ${
            selectedItem === i ? "bg-indigo-50 text-indigo-500" : ""
          }`}
          onClick={() => {
            setSelectedItem(i);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default Tab;
