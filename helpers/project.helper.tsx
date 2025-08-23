"use client";

export const formatDate = (date: string | Date | null) => {
  if (!date) return "No especificado";

  return new Date(date).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

export const formatCurrency = (price: number | string | null) => {
  if (price === null) {
    return "No especificado";
  }

  if (typeof price === "string") {
    price = parseFloat(price);
  }

  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(price);
};
