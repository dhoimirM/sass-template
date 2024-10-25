"use server";
import { redirect } from "next/navigation";
import { getUser } from "./actionsUsers";
import { prisma } from "./db";
import { revalidatePath } from "next/cache";

export const getAllNotes = async (userId: string) => {
  const data = await prisma.notes.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createAT: "desc",
    },
  });
  return data;
};

export const deleteNote = async (FormData: FormData) => {
  const id = FormData.get("id") as string;

  await prisma.notes.delete({
    where: { id },
  });
  revalidatePath("/");
};

export const createNote = async (FormData: FormData) => {
  const title = FormData.get("title") as string;
  const description = FormData.get("description") as string;
  const completed = FormData.get("completed") as string;
  const user = await getUser();
  const userId = user?.id as string;

  await prisma.notes.create({
    data: {
      userId: userId,
      title: title,
      description: description,
      completed: completed === "on",
    },
  });
  redirect("/dashboard/notes");
};
export const getNote = async (id: string) => {
  const note = prisma.notes.findUnique({
    where: { id: id },
  });
  return note;
};

export const updateNote = async (FormData: FormData) => {
  try {
    const id = FormData.get("id") as string;
    const title = FormData.get("title") as string;
    const description = FormData.get("description") as string;
    const completed = FormData.get("completed");

    if (title !== null || description !== null) {
      await prisma.notes.update({
        where: { id },
        data: {
          title: title,
          description: description,
          completed: completed === "on",
        },
      });
    }
  } catch (error) {
    console.log("Erreur lors de la modification de la note", error);
  } finally {
    redirect("/");
  }
};
