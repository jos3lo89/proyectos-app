"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/signin",
    });
  };

  return (
    <div
      className="flex items-center w-full mx-auto cursor-pointer"
      onClick={handleClick}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Cerrar Sesión</span>
    </div>
  );
};

export default LogoutButton;
