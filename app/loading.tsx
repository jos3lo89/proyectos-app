// app/loading.tsx

import { Loader2 } from "lucide-react";

export default function Loading() {
  // Puedes añadir cualquier UI de esqueleto (skeleton) o un spinner.
  // Esta UI se mostrará instantáneamente mientras se obtienen los datos de la página.
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
