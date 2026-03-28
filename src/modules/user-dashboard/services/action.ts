"use server";

import { auth } from "@/src/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(auth.sessionCookieName)?.value;

  if (sessionId) {
    await auth.invalidateSession(sessionId);
  }

  const blankCookie = auth.createBlankSessionCookie();
  cookieStore.set(blankCookie.name, blankCookie.value, blankCookie.attributes);

  redirect("/login");
}
