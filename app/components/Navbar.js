import React from 'react';

const Navbar = (props) => {
  return (
    <div className="navbar fixed p-4 z-20 w-full flex top-0 left-0 justify-between">
        <div>Issue 1</div>
        <div
          onClick={() => {
            props.setShowStart(!props.showStart);
          }}
        >
          Menu
        </div>
      </div>
  );
};

export default Navbar;
