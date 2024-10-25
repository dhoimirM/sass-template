import { NextResponse } from "next/server";
import { getUser } from "@/lib/actionsUsers";

export async function GET() {
  try {
    const user = await getUser();
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Unable to fetch user data" },
      { status: 500 }
    );
  }
}
