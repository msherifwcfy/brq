export function formatMinutesToHoursAndMinutes(minutes: number): { hours: number; minutes: number } {
  const hours = Math.floor(minutes / 60);
  const remainedMinutes = minutes % 60;
  return { hours, minutes: remainedMinutes };
}
