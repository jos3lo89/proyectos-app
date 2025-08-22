import { auth } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CardContent, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { CalendarDays, Mail, Shield, User } from "lucide-react";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  try {
    const session = await auth();

    if (!session?.user.id) {
      redirect("/signin");
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const userInitials = user.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p.charAt(0).toUpperCase())
      .join("");

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date));
    };

    return (
      <div className="">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Main Profile Card */}
          <div className="w-full">
            <CardHeader className="text-center pb-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-10 w-10 md:h-14 md:w-14">
                  <AvatarFallback className="text-lg md:text-lg font-semibold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-xl md:text-2xl font-semibold">
                    {user.name}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 md:gap-6">
                <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card">
                  <Mail className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Correo electrónico
                    </p>
                    <p className="text-sm md:text-base font-medium break-all">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card">
                  <User className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Nombre completo
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      {user.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card">
                  <Shield className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Rol de usuario
                    </p>
                    <p className="text-sm md:text-base font-medium capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg border bg-card">
                  <CalendarDays className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Registrado desde
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <p>wadafa</p>;
  }
};
export default ProfilePage;
