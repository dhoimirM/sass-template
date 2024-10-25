import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  createCustomerPortal,
  createSubscription,
  getDataStripeUser,
} from "@/lib/actionStripe";
import { getUser } from "@/lib/actionsUsers";

export default async function Payment() {
  const user = await getUser();
  const dataStripe = await getDataStripeUser(user?.id as string);

  const itemsPremium = [
    { name: "Générateur de couleurs" },
    { name: "Générateur de mot de passe" },
    { name: "Générateur de QR Code" },
    { name: "Compresseur d'image" },
  ];

  if (dataStripe?.status === "active") {
    return (
      <div className="max-w-lg mx-auto space-y-4 my-3">
        <Card className=" flex flex-col">
          <CardContent className=" py-8">
            <div>
              <h3 className="text-md font-black uppercase bg-gray-900 bg-opacity-20 text-gray-500 p-3 rounded-md inline">
                Pass Premium
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Modifier votre abonnement
              </p>
              <form className="w-full mt-4" action={createCustomerPortal}>
                <Button className=" bg-gray-500 hover:bg-gray-600 w-full">
                  Modifier abonnement
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className=" max-w-lg mx-auto space-y-4 mt-3">
      <Card className=" flex flex-col">
        <CardContent className=" py-8">
          <div>
            <h3 className="text-md font-black uppercase bg-gray-900 bg-opacity-20 text-gray-500 p-3 rounded-md inline">
              Pass Premium
            </h3>
          </div>
          <div className="mt-4 text-6xl font-black">
            <span>19,99€</span>{" "}
            <span className="text-sm text-muted-foreground">par mois</span>
          </div>
          <p className="mt-4 text-muted-foreground">
            Decouvrez le developpement web avec notre passe premium
          </p>
          <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-secondary rounded-lg m-1 space-t-6 p-3 mt-4">
            <ul className="space-y-3">
              {itemsPremium.map((items, index) => (
                <li
                  key={index}
                  className=" flex items-center gap-2 text-muted-foreground"
                >
                  <span>✅</span>
                  <span>{items.name}</span>
                </li>
              ))}
            </ul>
            <form action={createSubscription} className=" w-full mt-4">
              <Button className=" bg-gray-500 hover:bg-gray-600">
                Devenir membre Premium
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
