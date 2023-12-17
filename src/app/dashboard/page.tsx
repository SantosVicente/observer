"use client";

import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { useCallback, useEffect, useRef, useState } from "react";
import "./dashboard.css";
import Link from "next/link";

const Dashboard = () => {
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
      setPage(3);
      setErrorMessage(null);
    }
  }, [progress]);

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
          <Title title="Welcome," />
          <p className="text-[#ff3332] text-2xl md:text-4xl font-bold uppercase neon-text">
            Lucky participant!
          </p>

          <div
            className="
        flex flex-col gap-2 mt-5 items-center"
          >
            <p
              className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
            >
              Entre muitos, você foi escolhido para participar desse projeto.
            </p>
            <p
              className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
            >
              Você foi escolhido por ter um perfil que se encaixa no que estamos
              procurando.
            </p>
            <p
              className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
            >
              E agora só tem uma escolha que você pode fazer
            </p>

            <Button
              variant={"outline"}
              onClick={() => {
                setPage(1);
              }}
              className="scale-75 hover:box-shadow md:scale-100 mt-10 bg-transparent rounded-sm border-2 border-dashed w-44 h-14 text-[#ff3332] neon-text font-bold text-2xl border-[#ff3332] hover:bg-[#ff3332] hover:text-[#0e0101] hover:border-[#0e0101] sm:hover:scale-110 transform transition-all"
            >
              YES
            </Button>
          </div>
        </>
      )}

      {page === 1 && (
        <>
          <Title title="Are you ready?" />
          <p className="text-[#ff3332] text-2xl md:text-4xl font-bold uppercase neon-text">
            {"You can't go back"}
          </p>

          <div
            className="
        flex flex-col gap-2 mt-5 items-center"
          >
            <p
              className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
            >
              Você está pronto?
            </p>
            <p
              className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
            >
              Não tem mais volta
            </p>

            <Button
              variant={"outline"}
              onClick={() => {
                setPage(2);
              }}
              className="scale-75 hover:box-shadow md:scale-100 mt-10 bg-transparent rounded-sm border-2 border-dashed w-44 h-14 text-[#ff3332] neon-text font-bold text-2xl border-[#ff3332] hover:bg-[#ff3332] hover:text-[#0e0101] hover:border-[#0e0101] sm:hover:scale-110 transform transition-all"
            >
              YES
            </Button>
          </div>
        </>
      )}

      {page === 2 && (
        <>
          <Title title="Good luck," />
          <p className="text-[#ff3332] text-2xl md:text-4xl font-bold uppercase neon-text">
            {user.username}
          </p>

          <div
            className="
        flex flex-col gap-2 mt-5 items-center"
          >
            <p
              className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
            >
              Você foi avisado
            </p>
            <p
              className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
            >
              Boa sorte
            </p>
            <p
              className="
          text-zinc-300 text-xl md:text-2xl font-bold uppercase neon-text"
            >
              Você vai precisar
            </p>

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
            {errorMessage && (
              <p className="text-[#ff3332] text-xs font-bold uppercase">
                {errorMessage}
              </p>
            )}
          </div>
        </>
      )}

      {page === 3 && (
        <>
          <p className="text-zinc-300 text-4xl md:text-5xl font-bold uppercase neon-text-white">
            Você conseguiu
          </p>
          <p className="text-zinc-300 text-2xl md:text-2xl font-bold uppercase -mt-10 neon-text-white">
            A hora chegou, pegue seu ingresso
          </p>

          <div className="flex gap-4">
            <div className="border border-zinc-200 bg-zinc-300 bg-opacity-40 font-bold w-40 h-20 flex flex-col items-center justify-center">
              <p className="text-zinc-300 text-xs font-bold uppercase shadow-text">
                Nome
              </p>
              <p className="text-zinc-300 text-base font-bold uppercase shadow-text">
                {user.username}
              </p>
            </div>

            <div className="border border-zinc-200 bg-zinc-300 bg-opacity-40 font-bold w-40 h-20 flex flex-col items-center justify-center">
              <p className="text-zinc-300 text-xs font-bold uppercase shadow-text">
                Assento
              </p>
              <p className="text-zinc-300 text-base font-bold uppercase shadow-text">
                P-20
              </p>
            </div>
          </div>

          <Link
            href="https://zenith-hub.vercel.app/"
            className="underline text-zinc-300 text-base font-bold uppercase shadow-text"
          >
            Clique aqui para embarcar
          </Link>
        </>
      )}

      <audio ref={audioRef} src="/audios/suspense.wav" />
    </div>
  );
};

export default Dashboard;
