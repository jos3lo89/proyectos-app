"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className="flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden sm:inline">Volver</span>
    </Button>
  );
};
export default BackButton;
