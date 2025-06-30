import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/firebase/admin";
import { db } from "@/firebase/admin";

export async function GET() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("session")?.value;

  if (!sessionCookie) return NextResponse.json({ user: null });

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userDoc.exists) return NextResponse.json({ user: null });

    return NextResponse.json({ user: { ...userDoc.data(), id: userDoc.id } });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
