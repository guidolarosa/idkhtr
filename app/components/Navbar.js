import React from 'react';

const Navbar = ({selectedIssue, setShowSidebar, showSidebar}) => {
  return (
    <div className="navbar fixed p-4 z-20 w-full flex top-0 left-0 justify-between">
        <div>{selectedIssue && selectedIssue.title}</div>
        <div
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
          className="cursor-pointer"
        >
          Menu
        </div>
      </div>
  );
};

export default Navbar;
