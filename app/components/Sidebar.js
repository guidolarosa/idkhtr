import React from 'react';

const Sidebar = ({showSidebar, setShowSidebar}) => {
  return (
    <side className={`absolute w-60 border top-0 right-0 h-[100dvh] z-20 p-4 bg-[rgba(255,255,255,0.5)] backdrop-blur-md transition duration-500 ${showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none translate-x-52'}`}>
      <div className="flex justify-between">
        <h1>IDKHTR</h1>
        <div className="cursor-pointer" onClick={() => {setShowSidebar(false)}}>X</div>
      </div>
    </side>
  );
};

export default Sidebar;
