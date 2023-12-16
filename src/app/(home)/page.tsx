"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDisabled(!isDisabled);
    }, Math.floor(Math.random() * 5000 - 2000) + 1000); //não quero que o tempo seja fixo, quero que seja aleatório
    return () => clearInterval(interval);
  }, [isDisabled]);

  return (
    <div className="flex flex-col items-center relative justify-center min-h-screen py-2 gap-11 bg-[#0e0101]">
      <div className="flex rounded-full bg-[#bd0302] absolute -top-[77rem] left-50 h-[80rem] w-[110rem] blur-xl" />

      <div className="flex flex-col gap-2 items-center">
        {/* <div className="h-[4.5rem] w-52 flex z-0 items-center justify-center bg-[#ff3332] eye box-shadow">
          <div className="relative w-16 h-16 bg-[#ff3332] z-10 rounded-full overflow-hidden box-shadow">
            <Image
              src="/radiation-solid.svg"
              alt="radiation"
              width={0}
              height={0}
              className="w-10 h-10 animate-pulse z-30 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2"
              objectFit="cover"
            />

            <div className="w-14 h-14 bg-[#0e0101] rounded-full z-20 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13rem"
          height="8rem"
          className="animate-pulse"
          viewBox="0 0 576 360"
        >
          <path
            fill="#ff3332"
            d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
          />
        </svg>

        <h1 className="text-xl font-bold uppercase text-center">Welcome to </h1>
        <p className="text-[#ff3332] text-6xl font-bold uppercase neon-text">
          PURGATORY
        </p>
      </div>

      <div className="flex items-center justify-center gap-8">
        <Button
          variant={"outline"}
          disabled={isDisabled}
          className={`bg-transparent isDisabled rounded-sm border-2 w-44 h-14 ${
            isDisabled
              ? "text-zinc-500 border-zinc-500"
              : "text-[#0ce4d8] border-[#0ce4d8] neon-text-blue"
          } font-bold text-lg cursor-default transition-all hover:bg-transparent hover:text-[#0ce4d8]`}
        >
          WATCHER
        </Button>

        <Link href="/signup">
          <Button
            variant={"outline"}
            className="bg-transparent rounded-sm border-2 w-44 h-14 text-[#ff3332] neon-text font-bold text-lg border-[#ff3332] hover:bg-[#ff3332] hover:text-[#0e0101] hover:border-[#0e0101] hover:scale-110 transform transition-all"
          >
            COMPETITOR
          </Button>
        </Link>
      </div>

      <footer className="flex absolute bottom-0 gap-1 mb-11 w-full items-center justify-center text-center">
        <h2>Produced By </h2>
        <Link href="" className="text-[#ff3332] hover:neon-text transition-all">
          Quackity Studios
        </Link>
      </footer>
    </div>
  );
}
