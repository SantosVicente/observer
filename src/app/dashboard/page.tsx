"use client";

import Title from "@/components/ui/title";
import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setUser(
      JSON.parse(
        localStorage.getItem("user") ||
          "{username: 'User', password: 'Password'}"
      )
    );

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

      <div className="flex flex-col gap-2 mt-5 items-center">
        <h1 className="text-2xl text-white">Bem vindo, {user.username}</h1>
        <h1 className="text-2xl text-white">Você está logado!</h1>
      </div>

      <audio ref={audioRef} src="/audios/suspense.wav" />
    </div>
  );
};

export default Dashboard;
