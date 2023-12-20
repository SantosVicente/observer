"use client";

import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { useCallback, useEffect, useRef, useState } from "react";
import "./dashboard.css";
import Link from "next/link";
import ScrollAnimation from "@/components/ui/framer";
import { progress } from "framer-motion";
import page from "../(home)/page";

const Dashboard = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const audioRef3 = useRef<HTMLAudioElement>(null);
  const audioRef4 = useRef<HTMLAudioElement>(null);

  const [shouldPlayAudio, setShouldPlayAudio] = useState(true);

  useEffect(() => {
    if (shouldPlayAudio) {
      play();
      setShouldPlayAudio(false);
    }
  }, [shouldPlayAudio]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      console.log("audioRef.current is not defined");
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      console.log("audioRef.current is not defined");
    }
  };

  const play2 = () => {
    if (audioRef2.current) {
      audioRef2.current.play();
    } else {
      console.log("audioRef2.current is not defined");
    }
  };

  const play3 = () => {
    if (audioRef3.current) {
      audioRef3.current.play();
    } else {
      console.log("audioRef3.current is not defined");
    }
  };

  const play4 = () => {
    if (audioRef4.current) {
      audioRef4.current.play();
    } else {
      console.log("audioRef4.current is not defined");
    }
  };

  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorMessageNumber, setErrorMessageNumber] = useState(0);

  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  const handleMouseDown = () => {
    setIsHolding(true);
    setProgress(0);

    timerRef.current = window.setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 1, 100));
    }, 30);
  };

  const handleMouseUp = useCallback(() => {
    if (isHolding) {
      clearInterval(timerRef.current as any);
      setIsHolding(false);

      if (progress === 100) {
        setPage(3);
        setShouldPlayAudio(true);
        setErrorMessage(null);
      } else {
        setProgress(0);
        if (errorMessageNumber === 0) {
          setErrorMessageNumber(1);
          setErrorMessage("Segure o botão até o fim para prosseguir");
        } else if (errorMessageNumber === 1) {
          setErrorMessageNumber(2);
          setErrorMessage("Vamos lá... Você consegue");
        } else if (errorMessageNumber === 2) {
          setErrorMessageNumber(3);
          setErrorMessage("Você é... burro?");
        } else if (errorMessageNumber === 3) {
          setErrorMessageNumber(4);
          setErrorMessage("Eu não acredito que você não consegue...");
        } else {
          setErrorMessageNumber(0);
          setErrorMessage("Você é muito burro...");
        }
      }
    }
  }, [isHolding, progress, errorMessageNumber]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isHolding, handleMouseUp]);

  useEffect(() => {
    if (progress === 100) {
      play4();
      setPage(3);
      setErrorMessage(null);
    }
  }, [progress]);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    //trate para quando não tiver nada no localstorage
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser({
        username: "user",
        password: "password",
      });
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }, 1700);

    if (audioRef2.current) {
      audioRef2.current?.pause();
    }

    return () => clearTimeout(timeoutId);
  }, [page]);

  return (
    <div
      className={`flex flex-col items-center relative justify-center min-h-screen py-2 gap-5 sm:gap-11 ${
        progress === 100 ? "bg-gradient" : "bg-[#0e0101]"
      } overflow-hidden`}
    >
      {progress < 100 && (
        <>
          <div className="flex rounded-full bg-[#bd0302] absolute -top-[77rem] left-50 h-[80rem] w-[110rem] blur-xl" />
          <div className="flex rounded-full bg-[#bd0302] absolute -top-[77rem] left-50 h-[80rem] w-[110rem] blur-xl" />
        </>
      )}
      {progress > 25 && progress < 100 && (
        <>
          <div className="flex rounded-full bg-[#bd0302] absolute -left-[77rem] top-50 h-[110rem] w-[80rem] blur-xl" />
          <div className="flex rounded-full bg-[#bd0302] absolute -left-[77rem] top-50 h-[110rem] w-[80rem] blur-xl" />
        </>
      )}

      {progress > 50 && progress < 100 && (
        <>
          <div className="flex rounded-full bg-[#bd0302] absolute -right-[77rem] top-50 h-[110rem] w-[80rem] blur-xl" />
          <div className="flex rounded-full bg-[#bd0302] absolute -right-[77rem] top-50 h-[110rem] w-[80rem] blur-xl" />
        </>
      )}

      {progress > 75 && progress < 100 && (
        <>
          <div className="flex rounded-full bg-[#bd0302] absolute -bottom-[77rem] left-50 h-[80rem] w-[110rem] blur-xl" />
          <div className="flex rounded-full bg-[#bd0302] absolute -bottom-[77rem] left-50 h-[80rem] w-[110rem] blur-xl" />
        </>
      )}
      {page === 0 && (
        <>
          <ScrollAnimation delay={0.1} duration={0.3} y={150}>
            <Title title="Welcome," />
          </ScrollAnimation>
          <ScrollAnimation delay={0.2} duration={0.3} y={150}>
            <p className="text-[#ff3332] text-2xl md:text-4xl font-bold uppercase neon-text">
              Lucky participant!
            </p>
          </ScrollAnimation>
          <div
            className="
        flex flex-col gap-2 mt-5 items-center"
          >
            <ScrollAnimation delay={0.7} duration={0.3} y={150}>
              <p
                className="
          text-zinc-300 text-xs text-center mx-7 md:text-2xl font-bold uppercase neon-text"
              >
                Entre muitos, você foi escolhido para participar desse projeto.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={1.1} duration={0.3} y={150}>
              <p
                className="
          text-zinc-300 text-xs text-center mx-7 md:text-2xl font-bold uppercase neon-text"
              >
                Você foi escolhido por ter um perfil que se encaixa no que
                estamos procurando.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={1.3} duration={0.3} y={150}>
              <p
                className="
          text-zinc-300 text-xs text-center mx-7 md:text-2xl font-bold uppercase neon-text"
              >
                E agora só tem uma escolha que você pode fazer
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={2.4} duration={0.3} y={150}>
              <Button
                variant={"outline"}
                onMouseEnter={() => {
                  play2();
                }}
                onClick={() => {
                  play3();
                  setPage(1);
                  setShouldPlayAudio(true);
                }}
                className="scale-75 hover:box-shadow md:scale-100 mt-5 sm:mt-10 bg-transparent rounded-sm border-2 border-dashed w-44 h-14 text-[#ff3332] neon-text font-bold text-2xl border-[#ff3332] hover:bg-[#ff3332] hover:text-[#0e0101] hover:border-[#0e0101] sm:hover:scale-110 transform transition-all"
              >
                YES
              </Button>
            </ScrollAnimation>
          </div>
        </>
      )}

      {page === 1 && (
        <>
          <ScrollAnimation delay={0.1} duration={0.3} y={150}>
            <p className="text-[#ff3332] text-3xl md:text-5xl font-bold uppercase neon-text">
              {"Are you ready?"}
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={0.5} duration={0.3} y={150}>
            <p className="text-[#ff3332] text-2xl md:text-4xl font-bold uppercase neon-text">
              {"You can't go back"}
            </p>
          </ScrollAnimation>
          <div
            className="
        flex flex-col gap-2 mt-5 items-center"
          >
            <ScrollAnimation delay={0.7} duration={0.3} y={150}>
              <p
                className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
              >
                Você está pronto?
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.8} duration={0.3} y={150}>
              <p
                className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
              >
                Não tem mais volta
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={1} duration={0.3} y={150}>
              <Button
                variant={"outline"}
                onMouseEnter={() => {
                  play2();
                }}
                onClick={() => {
                  play3();
                  setPage(2);
                  setShouldPlayAudio(true);
                }}
                className="scale-75 hover:box-shadow md:scale-100 mt-10 bg-transparent rounded-sm border-2 border-dashed w-44 h-14 text-[#ff3332] neon-text font-bold text-2xl border-[#ff3332] hover:bg-[#ff3332] hover:text-[#0e0101] hover:border-[#0e0101] sm:hover:scale-110 transform transition-all"
              >
                YES
              </Button>
            </ScrollAnimation>
          </div>
        </>
      )}

      {page === 2 && (
        <>
          <ScrollAnimation delay={0.1} duration={0.3} y={150}>
            <Title title="Good luck," />
          </ScrollAnimation>
          <ScrollAnimation delay={0.4} duration={0.3} y={150}>
            <p className="text-[#ff3332] text-2xl md:text-4xl font-bold uppercase neon-text">
              {user.username}
            </p>
          </ScrollAnimation>

          <div
            className="
        flex flex-col gap-2 mt-5 items-center"
          >
            <ScrollAnimation delay={0.6} duration={0.3} y={150}>
              <p
                className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
              >
                Você foi avisado
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.7} duration={0.3} y={150}>
              <p
                className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
              >
                Boa sorte
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.8} duration={0.3} y={150}>
              <p
                className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
              >
                Você vai precisar
              </p>
            </ScrollAnimation>

            <div className="hidden md:flex items-center justify-center flex-col gap-4">
              <ScrollAnimation delay={1.2} duration={0.3} y={150}>
                <Button
                  variant={"outline"}
                  /* scale-75 hover:box-shadow md:scale-100 mt-10 bg-transparent rounded-sm border-2 border-dashed w-44 h-14 text-[#ff3332] neon-text font-bold text-2xl border-[#ff3332] hover:bg-[#ff3332] hover:text-[#0e0101] hover:border-[#0e0101] sm:hover:scale-110 transform transition-all */
                  className="scale-75 md:scale-100 mt-10 bg-transparent rounded-sm border-2 border-dashed w-44 h-14 text-[#ff3332]  text-2xl border-[#ff3332] sm:hover:scale-110 transform transition-all relative text-center font-bold neon-text hover:bg-transparent"
                  onMouseDown={handleMouseDown}
                >
                  {isHolding && (
                    <div
                      className="absolute inset-0 bg-[#ff3332] rounded-md"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                  <p className="z-30">CONTINUE</p>
                </Button>
              </ScrollAnimation>
              {errorMessage && (
                <ScrollAnimation delay={0.1} duration={0.3} y={150}>
                  <p className="text-[#ff3332] text-xs font-bold uppercase">
                    {errorMessage}
                  </p>
                </ScrollAnimation>
              )}
            </div>
            <div className="block md:hidden">
              <Button
                variant={"outline"}
                className="scale-75 md:scale-100 mt-10 bg-transparent rounded-sm border-2 border-dashed w-44 h-14 text-[#ff3332]  text-2xl border-[#ff3332] sm:hover:scale-110 transform transition-all relative text-center font-bold neon-text hover:bg-transparent"
                onClick={() => {
                  setProgress(100);
                }}
              >
                <p className="z-30">CONTINUE</p>
              </Button>
            </div>
          </div>
        </>
      )}

      {page === 3 && (
        <>
          <ScrollAnimation delay={0.1} duration={0.3} y={150}>
            <p className="text-zinc-300 text-3xl md:text-5xl text-center font-bold uppercase neon-text-white">
              Você conseguiu
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={0.5} duration={0.3} y={150}>
            <p className="text-zinc-300 text-xl text-center md:text-2xl font-bold uppercase md:-mt-10 neon-text-white">
              A hora chegou, pegue seu ingresso
            </p>
          </ScrollAnimation>
          <div className="flex gap-4">
            <ScrollAnimation delay={0.6} duration={0.3} y={150}>
              <div className="border border-zinc-200 bg-zinc-300 bg-opacity-40 font-bold w-32 h-16 md:w-40 md:h-20 flex flex-col items-center justify-center">
                <p className="text-zinc-300 text-xs font-bold uppercase shadow-text">
                  Nome
                </p>
                <p className="text-zinc-300 text-base font-bold uppercase shadow-text">
                  {user.username}
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.7} duration={0.3} y={150}>
              <div className="border border-zinc-200 bg-zinc-300 bg-opacity-40 font-bold w-32 h-16 md:w-40 md:h-20 flex flex-col items-center justify-center">
                <p className="text-zinc-300 text-xs font-bold uppercase shadow-text">
                  Assento
                </p>
                <p className="text-zinc-300 text-base font-bold uppercase shadow-text">
                  P-20
                </p>
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation delay={0.8} duration={0.3} y={150}>
            <div className="transform hover:scale-110 transition-all flex flex-col gap-2 mt-5 items-center">
              <Link
                href="https://zenith-hub.vercel.app/"
                className="underline text-zinc-300 text-sm md:text-base font-bold uppercase shadow-text"
                onMouseEnter={() => {
                  play2();
                }}
                onClick={() => {
                  play3();
                }}
              >
                Clique aqui para embarcar
              </Link>
            </div>
          </ScrollAnimation>
        </>
      )}

      <audio ref={audioRef} src="/audios/hacking.wav"></audio>
      <audio ref={audioRef2} src="/audios/success1.wav"></audio>
      <audio ref={audioRef3} src="/audios/click1.wav"></audio>
      <audio ref={audioRef4} src="/audios/submit1.wav"></audio>
    </div>
  );
};

export default Dashboard;
