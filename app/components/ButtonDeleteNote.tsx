"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteNote } from "@/lib/actionsNotes";
import { Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

interface DeleteButtonProps {
  id: string;
}

export default function ButtonDeleteNote({ id }: DeleteButtonProps) {
  const handleSubmit = () => {
    toast.success("Note supprimé");
  };
  return (
    <form action={deleteNote} onClick={handleSubmit}>
      <ToastContainer />
      <Input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        className=" bg-red-500 hover:bg-red-600 text-white mt-1"
      >
        <Trash2 />
      </Button>
    </form>
  );
}
