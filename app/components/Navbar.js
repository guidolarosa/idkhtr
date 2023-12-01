import React from 'react';

const Navbar = ({selectedIssue, setShowSidebar, showSidebar}) => {
  return (
    <div className="navbar fixed py-4 px-8 z-20 w-full flex top-0 left-0 justify-between ">
        <div className="ml-auto">{selectedIssue && selectedIssue.title}</div>
        {/* <div
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
          className="cursor-pointer rotate-[-90deg]"
        >
          ▲
        </div> */}
      </div>
  );
};

export default Navbar;
