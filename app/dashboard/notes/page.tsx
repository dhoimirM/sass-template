import ButtonDeleteNote from "@/app/components/ButtonDeleteNote";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllNotes } from "@/lib/actionsNotes";
import { getUser } from "@/lib/actionsUsers";
import { File, FilePenLine } from "lucide-react";
import Link from "next/link";

export default async function PageNotes() {
  const user = await getUser();
  const data = await getAllNotes(user?.id as string);
  return (
    <section className="grid items-start gap-y-8">
      <div className="flex md:items-cente md:justify-between flex-col md:flex-row">
        <div className="grid gap-1">
          <h2 className="text-3xl uppercase font-black">Notes</h2>
          <p className="text-lg text-muted-foreground">
            Ne perdez pas vos idée, prennez des notes
          </p>
          <div className="w-12  bg-black my-2 mx-1 h-[1px]"></div>
          <Button>
            <Link href="/dashboard/notes/create">Créer une note</Link>
          </Button>
        </div>
      </div>
      {data.length < 1 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center ">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-500 bg-opacity-20 mb-4">
            <File className="text-gray-900" />
          </div>
          <p className="text-lg ">Vous n&apos;avez aucune note</p>
          <p className="text-muted-foreground text-sm">
            Commencez des maintenant à creer des notes
          </p>
          <Button className=" bg-gray-500 hover:bg-gray-600 text-white mt-4">
            <Link href="/dashboard/notes/create">Créer une nouvelle note</Link>
          </Button>
        </div>
      ) : (
        <div className=" flex flex-col space-y-4">
          {data?.map((item, index) => (
            <Card key={index} className="flex items-center justify-between p-4">
              <div>
                <h2 className="text-gray-500 text-xl font-bold">
                  {item.title}
                </h2>{" "}
                <p className="text-sm text-muted-foreground">
                  écrit le{" "}
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "full",
                  }).format(new Date(item.createAT))}
                </p>
                <p>{item.description}</p>
              </div>
              <div className=" flex items-center gap-2">
                <Button
                  type="button"
                  className=" bg-yellow-500 hover:bg-yellow-600 mt-4 text-white mb-3"
                >
                  <Link href={`notes/note/${item.id}`}>
                    <FilePenLine className="w-4" />
                  </Link>
                </Button>
                <ButtonDeleteNote id={item.id} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
