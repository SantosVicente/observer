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
import { useEffect, useRef, useState } from "react";

const Signup = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const audioRef3 = useRef<HTMLAudioElement>(null);
  const audioRef4 = useRef<HTMLAudioElement>(null);
  const audioRef5 = useRef<HTMLAudioElement>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    message: "",
    error: false,
  });

  const [values, setValues] = useState({
    username: "",
    password: "",
    token: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    token: false,
  });

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

  useEffect(() => {
    if (audioRef5.current) {
      audioRef5.current.play();
    } else {
      console.log("audioRef5.current is not defined");
    }
  }, []);

  const isValidToken = (token: string) => {
    if (token === "123456") {
      return true;
    } else {
      return false;
    }
  };

  const verifyValues = () => {
    if (values.username.length < 3) {
      return {
        error: true,
        message: "O Username é muito curto",
        field: "username",
      };
    } else if (values.password.length < 6) {
      return {
        error: true,
        message: "A senha precisa ter no mínimo 6 caracteres",
        field: "password",
      };
    } else if (!isValidToken(values.token)) {
      return {
        error: true,
        message: "Token inválido",
        field: "token",
      };
    }
  };

  const send = () => {
    console.log("Enviando dados para o servidor...");
    console.log(values);
    console.log("Dados enviados com sucesso!");

    return {
      error: false,
    };
  };

  const redirect = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col items-center relative justify-center min-h-screen py-2 gap-5 sm:gap-11 bg-[#0e0101] overflow-hidden">
      <div className="flex rounded-full bg-[#bd0302] absolute -top-[77rem] left-50 h-[80rem] w-[110rem] blur-xl" />
      <Title title="Sign Up" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className=" absolute top-0 left-0 mt-4 ml-4">
            <Link
              href="/"
              onMouseEnter={() => {
                play3();
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

      <form className="flex flex-col gap-5 items-center justify-center">
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
              if (e.target.value.length < 3) {
                setErrors({ ...errors, username: true });
              } else {
                setErrors({ ...errors, username: false });
              }
            }}
            className={`bg-transparent ${
              errors.username
                ? "border-[#ff3332]"
                : "border-zinc-500 focus:border-zinc-50"
            } border rounded-none w-64 md:w-[25rem] h-10 sm:h-12 text-zinc-100 font-bold px-3 outline-none transition-all`}
          />
          {errors.username && (
            <p className="text-[#ff3332] text-sm absolute bottom-[-1.2rem] font-bold">
              O Username é muito curto
            </p>
          )}
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
              if (e.target.value.length < 6) {
                setErrors({ ...errors, password: true });
              } else {
                setErrors({ ...errors, password: false });
              }
            }}
            className={`bg-transparent ${
              errors.password
                ? "border-[#ff3332]"
                : "border-zinc-500 focus:border-zinc-50"
            } border rounded-none w-64 md:w-[25rem] h-10 sm:h-12 text-zinc-100 font-bold px-3 outline-none transition-all`}
          />
          {errors.password && (
            <p className="text-[#ff3332] text-sm absolute bottom-[-1.2rem] font-bold">
              Senha muito curta
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="uppercase font-bold text-sm text-zinc-300">
            TOKEN
          </label>
          <input
            value={values.token}
            type="password"
            required
            onKeyDown={play}
            onChange={(e) => {
              setValues({ ...values, token: e.target.value });
              if (!isValidToken(e.target.value)) {
                setErrors({ ...errors, token: true });
              } else {
                setErrors({ ...errors, token: false });
              }
            }}
            className={`bg-transparent border-zinc-500 focus:border-zinc-50 border rounded-none w-64 md:w-[25rem] h-10 sm:h-12 text-zinc-100 font-bold px-3 outline-none transition-all`}
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
                  message: "[✓] Conta criada com sucesso!",
                  error: false,
                });
              } else {
                setDialogContent({
                  message: "[ ! ] Falha ao criar conta",
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
          href="/login"
          className="uppercase font-bold text-sm text-center underline"
        >
          Already have an account? Login
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
              token: "",
            });
            setErrors({
              username: false,
              password: false,
              token: false,
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
            <DialogTitle className="text-zinc-900 uppercase text-base sm:text-xl text-center font-bold">
              {dialogContent.error
                ? "[ ! ] Falha ao criar conta"
                : dialogContent.message}
            </DialogTitle>
            {dialogContent.error && (
              <DialogDescription className="text-zinc-900 uppercase text-center font-bold">
                {dialogContent.message}
              </DialogDescription>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Footer isSignup />

      <audio ref={audioRef} src="/audios/sound1.wav"></audio>
      <audio ref={audioRef5} loop src="/audios/trilha.mp3"></audio>
    </div>
  );
};

export default Signup;
