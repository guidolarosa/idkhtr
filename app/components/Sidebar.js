import React from "react";

const Sidebar = ({
  showSidebar,
  setShowSidebar,
  allIssues,
  setSelectedIssue,
  setShowCanvas,
  setShowStart
}) => {
  return (
    <side
      className={`absolute w-60 border top-0 right-0 h-[100dvh] z-20 px-8 py-4 bg-[rgba(255,255,255,0.5)] backdrop-blur-md transition duration-500 flex flex-col ${
        showSidebar
          ? "opacity-100 translate-x-0"
          : "opacity-0 pointer-events-none translate-x-52"
      }`}
    >
      <div className="flex justify-between">
        <h1 className="font-bold tracking-wider">IDKHTR</h1>
        <div
          className="cursor-pointer rotate-90 text-neutral-400"
          onClick={() => {
            setShowSidebar(false);
          }}
        >
          ▲
        </div>
      </div>
      <div className="mt-8">
        <ul>
          <li className="mb-4">
            <span className="uppercase text-sm tracking-wider text-neutral-500">
              Issues
            </span>
            <ul className="mt-2">
              {allIssues.map((issue, idx) => (
                <li
                  className="text-sm cursor-pointer mb-2"
                  key={idx}
                  onClick={() => {
                    setSelectedIssue(issue);
                    setShowSidebar(false);
                    setShowCanvas(true);
                    setShowStart(false)
                  }}
                >
                  {issue.title}
                </li>
              ))}
            </ul>
          </li>
          <li className="mb-4">
            <span className="uppercase text-sm tracking-wider text-neutral-500"><a href="#">ABOUT</a></span>
          </li>
        </ul>
      </div>
    </side>
  );
};

export default Sidebar;
