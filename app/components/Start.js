import React from "react";

const Start = (props) => {
  return (
    <div
      className={`menu h-[100dvh] w-full fixed top-0 left-0 z-10 bg-[rgba(255,255,255,0.3)] flex flex-col-reverse items-center
        justify-center backdrop-blur-md transition ${
          props.showStart ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="flex flex-col">
        <div className="flex flex-col w-[200px]">
          <h1 className="text-center mb-2 text-2xl font-medium">IDKHTR</h1>
          <input
            className="input text-center mb-2"
            placeholder="Create a new issue"
            type="text"
          />
          <button
            className="button"
            onClick={() => {
              props.setShowCanvas(true);
              props.setShowStart(false);
            }}
          >
            Start
          </button>
        </div>
        <div className="mt-8">
          <h2 className="uppercase tracking-wide text-xs opacity-50 mb-2">Issues</h2>
          <ul>
            {props.allIssues && props.allIssues.map((issue, idx) => (
              <li
                key={idx}
                className="font-medium cursor-pointer"
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
    </div>
  );
};

export default Start;
