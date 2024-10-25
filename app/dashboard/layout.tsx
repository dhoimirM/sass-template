import { ToastContainer } from "react-toastify";
import DashboardNav from "../components/DashboardNav";
import SignOutButton from "../components/SignOutButton";
import { getUser } from "@/lib/actionsUsers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();

  if (!user) {
    return <div>Veuillez vous connecter</div>;
  }

  if (!user?.stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: user?.email as string,
    });

    await prisma.user.update({
      where: {
        id: user?.id as string,
      },
      data: {
        stripeCustomerId: stripeCustomer.id as string,
      },
    });
  }

  return (
    <section className=" max-w-[1200px] mx-auto md:flex md:items-center md:gap-4 h-screen w-full mt-2 p-2">
      <DashboardNav />
      <div className="w-full h-full">
        <SignOutButton />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </section>
  );
}
