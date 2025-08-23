import { UserPlus, Home } from "lucide-react";

export const organization = {
  name: "Proyectos",
  description: "Seguimineto de proyectos",
  logo: "/folders.svg",
};

export const navItemsList = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Proyecto",
    url: "#",
    icon: UserPlus,
    isActive: true,
    items: [
      {
        title: "Listar",
        url: "/projects",
      },
      {
        title: "Registrar",
        url: "/projects/create",
      },
    ],
  },

  {
    title: "Usuarios",
    url: "#",
    icon: UserPlus,
    isActive: false,
    items: [
      {
        title: "Listar",
        url: "/users",
      },
      {
        title: "Registrar",
        url: "/signup",
      },
    ],
  },
];
