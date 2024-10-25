import { Button } from "@/components/ui/button";
import Image from "next/image";
import Github from "@/public/img/icons8-github.svg";
import Google from "@/public/img/icons8-logo-google.svg";
import React from "react";
import { signIn } from "next-auth/react";

export default function ButtonsProvider() {
  return (
    <div className=" flex flex-col gap-4">
      <Button
        onClick={() => signIn("google")}
        className="flex items-center space-x-2 bg-white border-black text-black"
      >
        <Image width={20} height={20} src={Google} alt="google" />
        <span>Continuer avec Google</span>
      </Button>
      <Button
        onClick={() => signIn("github")}
        className=" flex items-center space-x-2 bg-white border-black text-black"
      >
        <Image width={20} height={20} src={Github} alt="github" /> Continuer
        avec Github
      </Button>
    </div>
  );
}
