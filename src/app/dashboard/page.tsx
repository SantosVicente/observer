"use client";

import Title from "@/components/ui/title";
import { useEffect, useRef } from "react";

const Dashboard = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      console.log("audioRef.current is not defined");
    }
  }, []);

  return (
    <div className="flex flex-col items-center relative justify-center min-h-screen py-2 gap-5 sm:gap-11 bg-[#0e0101] overflow-hidden">
      <div className="flex rounded-full bg-[#bd0302] absolute -top-[77rem] left-50 h-[80rem] w-[110rem] blur-xl" />
      <Title title="Dashboard" />

      <audio ref={audioRef} src="/audios/suspense.wav" />
    </div>
  );
};

export default Dashboard;
