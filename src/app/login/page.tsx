"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Footer from "@/components/ui/footer";
import Title from "@/components/ui/title";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const Login = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const audioRef3 = useRef<HTMLAudioElement>(null);
  const audioRef4 = useRef<HTMLAudioElement>(null);

  const play = () => {
    if (audioRef.current) {
      const newAudio = new Audio(audioRef.current.src);
      newAudio.volume = 1;
      newAudio.play();
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    message: "",
    error: false,
  });

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const verifyValues = () => {
    if (values.username.length < 1) {
      return {
        error: true,
        message: "Username inválido",
        field: "username",
      };
    } else if (values.password.length < 1) {
      return {
        error: true,
        message: "Senha inválida",
        field: "password",
      };
    }
  };

  const send = () => {
    localStorage.setItem("user", JSON.stringify(values));
    return {
      error: false,
    };
  };

  const redirect = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex flex-col items-center relative justify-center min-h-screen py-2 gap-5 sm:gap-11 bg-[#0e0101] overflow-hidden">
      <div className="flex rounded-full bg-[#bd0302] absolute -top-[77rem] left-50 h-[80rem] w-[110rem] blur-xl" />
      <Title title="Login" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className=" absolute top-0 left-0 mt-4 ml-4">
            <Link
              href="/"
              onMouseEnter={() => {
                play3();
              }}
              onClick={() => {
                play2();
              }}
            >
              <ArrowLeft className="text-zinc-400 h-10 w-10 " />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Return to Home</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <form className="flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col gap-2 relative">
          <label className="uppercase font-bold text-sm text-zinc-300">
            USERNAME
          </label>
          <input
            value={values.username}
            required
            onKeyDown={play}
            onChange={(e) => {
              setValues({ ...values, username: e.target.value });
            }}
            className={`bg-transparent ${
              errors.username
                ? "border-[#ff3332]"
                : "border-zinc-500 focus:border-zinc-50"
            } border rounded-none w-64 md:w-[25rem] h-10 sm:h-12 text-zinc-100 font-bold px-3 outline-none transition-all`}
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="uppercase font-bold text-sm text-zinc-300">
            PASSWORD
          </label>
          <input
            value={values.password}
            type="password"
            required
            onKeyDown={play}
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
            }}
            className={`bg-transparent ${
              errors.password
                ? "border-[#ff3332]"
                : "border-zinc-500 focus:border-zinc-50"
            } border rounded-none w-64 md:w-[25rem] h-10 sm:h-12 text-zinc-100 font-bold px-3 outline-none transition-all`}
          />
        </div>

        <Button
          variant={"outline"}
          onMouseEnter={() => {
            play3();
          }}
          onClick={(e) => {
            e.preventDefault();
            play2();

            const valuesVerify = verifyValues();

            if (!valuesVerify?.error) {
              const res = send();

              if (!res?.error) {
                setDialogContent({
                  message: "[✓] CONNEXÃO ESTABELECIDA",
                  error: false,
                });
              } else {
                setDialogContent({
                  message: "[ ! ] FALHA AO LOGAR",
                  error: true,
                });
              }
            } else {
              setDialogContent({
                message: valuesVerify.message,
                error: true,
              });
            }

            setTimeout(() => {
              setIsDialogOpen(true);
            }, 1000);
          }}
          className="bg-transparent rounded-sm border-2 w-64 md:w-[25rem] h-12 sm:h-14 mt-4 text-[#ff3332] neon-text font-bold text-lg border-[#ff3332] hover:bg-[#ff3332] hover:text-[#0e0101] hover:border-[#0e0101] hover:scale-110 transform transition-all"
        >
          SUBMIT
        </Button>
        <audio ref={audioRef2} src="/audios/failed1.wav"></audio>
        <audio ref={audioRef3} src="/audios/success1.wav"></audio>
        <Link
          href="/signup"
          className="uppercase font-bold text-sm text-center underline"
        >
          {"Don't have an account? Sign up"}
        </Link>
      </form>

      <audio ref={audioRef4} src="/audios/closemodal.wav"></audio>
      <Dialog
        open={isDialogOpen}
        onOpenChange={() => {
          setIsDialogOpen(false);
          play4();
          if (!dialogContent.error) {
            setValues({
              username: "",
              password: "",
            });
            setErrors({
              username: false,
              password: false,
            });
            setTimeout(() => {
              redirect();
            }, 700);
          }
        }}
      >
        <DialogContent
          className={`${
            dialogContent.error ? "bg-[#ff3332]" : "bg-[#28c45c]"
          } rounded-none w-72 sm:w-96 h-28 sm:h-32 items-center justify-center`}
        >
          <DialogHeader>
            <DialogTitle className="text-zinc-900 uppercase text-center text-base sm:text-xl font-bold">
              {dialogContent.error
                ? "[ ! ] Falha ao logar"
                : dialogContent.message}
            </DialogTitle>

            <DialogDescription className="text-zinc-900 uppercase text-center font-bold">
              {dialogContent.error
                ? dialogContent.message
                : `Bem vindo! ${values.username}`}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Footer />

      <audio ref={audioRef} src="/audios/sound1.wav"></audio>
    </div>
  );
};

export default Login;
