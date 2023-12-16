"use client";

import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Title from "@/components/ui/title";
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
    <div className="flex flex-col items-center relative justify-center min-h-screen py-2 gap-11 bg-[#0e0101] overflow-hidden">
      <div className="flex rounded-full bg-[#bd0302] absolute -top-[77rem] left-50 h-[80rem] w-[110rem] blur-xl" />

      <div className="flex flex-col gap-2 items-center">
        <div className="h-[4.5rem] w-52 flex z-0 items-center relative justify-center bg-transparent eye ">
          <Image
            src="/eye-icon.png"
            alt="eye"
            width={0}
            height={0}
            className="w-[20rem] z-30 absolute inset-1/2 transform -translate-x-1/2 top-0 mt-6 -translate-y-1/2"
            objectFit="cover"
            sizes="100vw"
          />

          <Image
            src="/radiation-solid.svg"
            alt="radiation"
            width={0}
            height={0}
            className="w-16 h-16 animate-pulse z-30 absolute inset-1/2 transform top-0 mt-6 -translate-x-1/2  -translate-y-1/2"
            objectFit="cover"
          />
        </div>

        <h1 className="text-xl font-bold uppercase mt-2 text-center">
          Welcome to{" "}
        </h1>

        <Title title="Purgatory" />
      </div>

      <div className="flex items-center justify-center gap-0 md:gap-8">
        <Button
          variant={"outline"}
          disabled={isDisabled}
          className={`bg-transparent isDisabled rounded-sm border-2 w-44 h-14 transform scale-75 md:scale-100 ${
            isDisabled
              ? "text-zinc-500 border-zinc-500"
              : "text-[#0ce4d8] border-[#0ce4d8] neon-text-blue"
          } font-bold text-lg cursor-default transition-all hover:bg-transparent hover:text-[#0ce4d8] -mr-8 sm:mr-0`}
        >
          WATCHER
        </Button>

        <Link href="/signup">
          <Button
            variant={"outline"}
            className="scale-75 md:scale-100 bg-transparent rounded-sm border-2 w-44 h-14 text-[#ff3332] neon-text font-bold text-lg border-[#ff3332] hover:bg-[#ff3332] hover:text-[#0e0101] hover:border-[#0e0101] sm:hover:scale-110 transform transition-all"
          >
            COMPETITOR
          </Button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
