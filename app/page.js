"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Start from "./components/Start";

const Canvas = dynamic(() => import("./components/Canvas"), {
  ssr: false,
});

export default function Home() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [showStart, setShowStart] = useState(true);

  return (
    <>
      <header>
        <Navbar setShowStart={setShowStart} showStart={showStart} />
      </header>
      <main className="bg-white min-h-[100dvh]">
        <Start
          showCanvas={showCanvas}
          setShowCanvas={setShowCanvas}
          showStart={showStart}
          setShowStart={setShowStart}
        />
        {showCanvas && <Canvas />}
      </main>
    </>
  );
}
