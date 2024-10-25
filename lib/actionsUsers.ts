"use server";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { revalidatePath } from "next/cache";

export async function getUser() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }

  const id = session.user.id;
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export const updateUser = async (formData: FormData) => {
  try {
    const userName = formData.get("name") as string;
    const id = formData.get("id") as string;

    if (userName !== null) {
      await prisma.user.update({
        where: { id },
        data: { name: userName },
      });
    }
    revalidatePath("/");
    return { success: true, message: "Profil mis à jour avec succès" };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "Erreur lors de la mise à jour du profil",
    };
  }
};

export async function deleteUser() {
  const session = await auth();

  const userId = session?.user?.id as string;

  if (!session || !session.user || !session.user.id) {
    redirect("../");
  }

  await prisma.user.deleteMany({
    where: { stripeCustomerId: userId },
  });
  await prisma.subscription.deleteMany({
    where: { userId: userId },
  });

  await prisma.session.deleteMany({
    where: { userId: userId },
  });

  await prisma.account.deleteMany({
    where: { userId: userId },
  });

  return redirect("../");
}
