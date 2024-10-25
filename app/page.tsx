"use client";
import MainLogo from "@/public/img/YourLogo.png";
import Image from "next/image";
import { Cursor, Typewriter } from "react-simple-typewriter";
import ButtonsProvider from "./components/ButtonsProvider";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (session) {
    redirect("dashboard/notes");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect");
        return;
      }
    } catch (error) {
      console.log(error);
      setError("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-2">
      <Image
        width={300}
        height={300}
        src={MainLogo}
        alt="Votre logo"
        className="mb-4 object-contain"
      />

      <h1 className="text-4xl md:text-6xl font-black mb-2 text-center uppercase flex items-center">
        <Typewriter
          typeSpeed={50}
          words={[
            "Votre Application",
            "Your application",
            "Ihre Anwendung",
            "Su aplicación",
            "Sua aplicação",
            "La tua applicazione",
            "تطبيقك",
            "あなたのアプリケーション",
          ]}
          loop={0}
        />
        <span>
          <Cursor />
        </span>
      </h1>
      <p className="my-2 text-center">
        Phrase d&apos;accroche de votre application
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col gap-y-2">
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>
          )}
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="@ email"
            required
          />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="mot de passe"
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Connexion"}
          </Button>
        </div>
      </form>

      <div className="flex flex-row justify-center mt-4">
        <div className="w-60 h-0 border m-auto mx-2"></div>
        <span>ou continuer avec</span>
        <div className="w-60 h-0 border m-auto mx-2"></div>
      </div>

      <ButtonsProvider />
      <div className="text-sm text-center">
        <Link
          href="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Pas encore de compte ? S&apos;inscrire
        </Link>
      </div>
    </section>
  );
}
