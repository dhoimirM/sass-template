"use client";
import React from "react";
import Link from "next/link";
import Logo from "@/public/img/nextdotjs.svg";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToogle";

export default function Navigation() {
  return (
    <nav className=" max-w-[1200px] w-full mx-auto h-[80px] flex items-center justify-between p-5 border-b border-gray-400">
      <div>
        <Link href={"/"}>
          <Image width={30} height={30} src={Logo} alt="logo" />
        </Link>
      </div>
      <div className=" flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
