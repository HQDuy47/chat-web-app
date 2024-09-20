import React from "react";

export default function DetailMessage() {
  return (
    <div className="px-4 ">
      <div className="py-1">
        <p className="text-lg font-semibold">Gold Coast</p>
        <p className="text-sm">From: Hali</p>
      </div>
      <div className="w-full  h-[1px] bg-gray-200 text-center"></div>
      <div className="h-96 py-2">
        {/* list message  */}
        <ul>
          <li>message</li>
        </ul>
      </div>
      <div className="">bottom</div>
    </div>
  );
}
