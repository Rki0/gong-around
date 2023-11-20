/**
 * return today date
 * @returns "YYYY-MM-DD"
 */
export function getTodayDate(): string {
  const date = new Date();
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
