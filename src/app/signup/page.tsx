"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { send } from "process";
import { useState } from "react";

const Signup = () => {
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
    console.log("Redirecionando...");
  };

  return (
    <div className="flex flex-col items-center relative justify-center min-h-screen py-2 gap-11 bg-[#0e0101]">
      <div className="flex rounded-full bg-[#bd0302] absolute -top-[77rem] left-50 h-[80rem] w-[110rem] blur-xl" />
      <p className="text-[#ff3332] text-6xl font-bold uppercase neon-text">
        SIGN UP
      </p>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="uppercase font-bold text-sm text-zinc-300">
            USERNAME
          </label>
          <input
            value={values.username}
            required
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
            } border rounded-none w-[25rem] h-12 text-zinc-100 font-bold px-3 outline-none transition-all`}
          />
          {errors.username && (
            <p className="text-[#ff3332] text-sm font-bold">
              O Username é muito curto
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="uppercase font-bold text-sm text-zinc-300">
            PASSWORD
          </label>
          <input
            value={values.password}
            type="password"
            required
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
            } border rounded-none w-[25rem] h-12 text-zinc-100 font-bold px-3 outline-none transition-all`}
          />
          {errors.password && (
            <p className="text-[#ff3332] text-sm font-bold">
              A senha precisa ter no mínimo 6 caracteres
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
            onChange={(e) => {
              setValues({ ...values, token: e.target.value });
              if (!isValidToken(e.target.value)) {
                setErrors({ ...errors, token: true });
              } else {
                setErrors({ ...errors, token: false });
              }
            }}
            className={`bg-transparent ${
              errors.token
                ? "border-[#ff3332]"
                : "border-zinc-500 focus:border-zinc-50"
            } border rounded-none w-[25rem] h-12 text-zinc-100 font-bold px-3 outline-none transition-all`}
          />
          {errors.token && (
            <p className="text-[#ff3332] text-sm font-bold">Token inválido</p>
          )}
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
                  message: "Conta criada com sucesso!",
                  error: false,
                });
              } else {
                setDialogContent({
                  message: "Falha ao criar conta",
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
          className="bg-transparent rounded-sm border-2 w-[25rem] h-14 mt-4 text-[#ff3332] neon-text font-bold text-lg border-[#ff3332] hover:bg-[#ff3332] hover:text-[#0e0101] hover:border-[#0e0101] hover:scale-110 transform transition-all"
        >
          SUBMIT
        </Button>
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
          } rounded-none`}
        >
          <DialogHeader>
            <DialogTitle className="text-zinc-900 uppercase text-center font-bold">
              {dialogContent.error
                ? "Falha ao criar conta"
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

      <footer className="flex absolute bottom-0 gap-1 mb-11 w-full items-center justify-center text-center">
        <h2>Produced By </h2>
        <Link href="" className="text-[#ff3332] hover:neon-text transition-all">
          Quackity Studios
        </Link>
      </footer>
    </div>
  );
};

export default Signup;
