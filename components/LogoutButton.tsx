"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/signin",
    });
  };

  return <Button onClick={handleClick}>LogOut</Button>;
};

export default LogoutButton;
