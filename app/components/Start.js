import React from "react";
import About from './About'

const Start = (props) => {
  return (
    <div
      className={`menu h-[100dvh] w-full fixed top-0 left-0 z-10 flex justify-center backdrop-blur-md transition px-10 pt-72 ${
          props.showStart ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          <h1 className="mb-2 text-6xl font-bold tracking-wider">IDKHTR</h1>
        </div>
        <div className="mt-8">
          <h2 className="uppercase tracking-wide text-xs opacity-50 mb-2">Issues</h2>
          <ul>
            {props.allIssues && props.allIssues.map((issue, idx) => (
              <li
                key={idx}
                className="font-medium cursor-pointer mb-2"
                onClick={() => {
                  props.setSelectedIssue(issue);
                  props.setShowStart(false);
                  props.setShowCanvas(true);
                }}
              >
                {issue.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full">
        <About />
      </div>
    </div>
  );
};

export default Start;
