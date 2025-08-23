export function formatToInputDate(
  date: Date | string | null | undefined
): string {
  if (!date) {
    return "";
  }

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const year = dateObj.getUTCFullYear();

  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");

  const day = dateObj.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getTodayForInput(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
