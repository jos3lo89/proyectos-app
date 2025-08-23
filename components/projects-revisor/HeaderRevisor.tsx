import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BackButton from "../BackButton";

import UserMenuRevisor from "./UserMenuRevisor";

const HeaderRevisor = async () => {
  const session = await auth();

  if (
    !session?.user?.id ||
    !session.user.name ||
    !session.user.email ||
    !session.user.role
  ) {
    redirect("/signin");
  }

  const userInitials =
    session.user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background">
      <BackButton />

      <UserMenuRevisor initials={userInitials} user={session.user} />
    </header>
  );
};
export default HeaderRevisor;
