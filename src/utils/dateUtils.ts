import { addMonths, format } from "date-fns";

export const isoToDate = (isoString: string) => isoString.split("T")[0];

export const todayDate = isoToDate(new Date().toISOString());

export const dateIsInFuture = (dateStr: string) => dateStr >= todayDate;
export const dateIsInPast = (dateStr: string) => dateStr < todayDate;

export const MONTHS_CUTOFF = 2;

export const dateIsInNearFuture = (dateStr: string) => {
  const cutoffDate = format(
    addMonths(new Date(todayDate), MONTHS_CUTOFF),
    "yyyy-MM-dd"
  );
  return dateIsInFuture(dateStr) && dateStr < cutoffDate;
};
