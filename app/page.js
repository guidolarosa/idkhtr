"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Start from "./components/Start";
import Sidebar from "./components/Sidebar";
import { client } from "./utils/sanity";

const Canvas = dynamic(() => import("./components/Canvas"), {
  ssr: false,
});

export default function Home() {
  const [showCanvas, setShowCanvas] = useState(true);
  const [showStart, setShowStart] = useState(false);
  const [allIssues, setAllIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const onFetchDataSuccess = (data) => {
    setAllIssues(data);
  };

  useEffect(() => {
    setSelectedIssue(allIssues[0])
  }, [allIssues])

  useEffect(() => {
    client
      .fetch(`*[_type == "issue"]`)
      .then(onFetchDataSuccess)
      .catch(console.error);
  }, []);

  return (
    <div className="root overflow-x-hidden">
      <header>
        <Navbar
          selectedIssue={selectedIssue}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </header>
      <main className="bg-white min-h-[100dvh]">
        {/* <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          allIssues={allIssues}
          setSelectedIssue={setSelectedIssue}
          setShowCanvas={setShowCanvas}
          setShowStart={setShowStart}
        /> */}
        <Start
          showCanvas={showCanvas}
          setShowCanvas={setShowCanvas}
          showStart={showStart}
          setShowStart={setShowStart}
          setSelectedIssue={setSelectedIssue}
          allIssues={allIssues}
        />
        {showCanvas && <Canvas selectedIssue={selectedIssue} />}
      </main>
    </div>
  );
}
