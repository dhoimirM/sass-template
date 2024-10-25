"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteUser, updateUser } from "@/lib/actionsUsers";
import Image from "next/image";
import { useState, useEffect, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data: User) => setUser(data));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await updateUser(formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <section className="border border-gray-300 rounded-lg p-3">
      <ToastContainer />
      <h2 className="text-3xl uppercase font-black">Settings</h2>
      <p className="text-lg text-muted-foreground">Vos parametres de profil</p>
      <div className="w-12 bg-white my-2 mx-1 h-1"></div>
      <form onSubmit={handleSubmit}>
        <Input type="hidden" name="id" value={user.id} />
        <Card>
          <CardHeader>
            <CardTitle>Parametres globals</CardTitle>
            <CardDescription>
              Modifier vos informations puis sauvegarder
            </CardDescription>
            <CardContent>
              {user.image && (
                <Image
                  width={100}
                  height={100}
                  alt="Photo de profil"
                  src={user.image}
                  className="w-16 h-16 object-contain mb-4 rounded-full"
                />
              )}
              <div className="space-y-1 mb-2">
                <Label htmlFor="idUser">ID</Label>
                <Input
                  type="text"
                  name="idUser"
                  id="idUser"
                  disabled
                  defaultValue={user.id}
                />
              </div>
              <div className="space-y-1 mb-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user.name || ""}
                />
              </div>
              <div className="space-y-1 mb-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  disabled
                  defaultValue={user.email || ""}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Modifier</Button>
            </CardFooter>
          </CardHeader>
        </Card>
      </form>
      <form action={deleteUser}>
        <Button className="bg-red-500 mx-1 my-2 hover:bg-red-700 text-white">
          Supprimer mon compte
        </Button>
      </form>
    </section>
  );
}
