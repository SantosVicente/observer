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
import { useState } from "react";

const Login = () => {
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
    console.log("Enviando dados para o servidor...");
    console.log(values);
    console.log("Dados enviados com sucesso!");

    return {
      error: false,
    };
  };

  const redirect = () => {
    console.log("Redirecionando...");
  };

  return (
    <div className="flex flex-col items-center relative justify-center min-h-screen py-2 gap-5 sm:gap-11 bg-[#0e0101] overflow-hidden">
      <div className="flex rounded-full bg-[#bd0302] absolute -top-[77rem] left-50 h-[80rem] w-[110rem] blur-xl" />
      <Title title="Login" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className=" absolute top-0 left-0 mt-4 ml-4">
            <Link href="/">
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
          onClick={(e) => {
            e.preventDefault();
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
        <Link
          href="/signup"
          className="uppercase font-bold text-sm text-center underline"
        >
          {"Don't have an account? Sign up"}
        </Link>
      </form>

      <Dialog
        open={isDialogOpen}
        onOpenChange={() => {
          setIsDialogOpen(false);
          if (!dialogContent.error) {
            redirect();
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
            {dialogContent.error && (
              <DialogDescription className="text-zinc-900 uppercase text-center font-bold">
                {dialogContent.message}
              </DialogDescription>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Login;
