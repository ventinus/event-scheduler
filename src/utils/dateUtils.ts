export const isoToDate = (isoString: string) => isoString.split("T")[0];

export const todayDate = isoToDate(new Date().toISOString());

// TODO: use date-fns for these kinds of things
export const dateIsInFuture = (dateStr: string) => dateStr >= todayDate;
export const dateIsInPast = (dateStr: string) => dateStr < todayDate;
export const dateIsInNearFuture = (dateStr: string) => {
  const cutoffDate = todayDate + "2 months";
  return dateIsInFuture(dateStr) && dateStr < cutoffDate;
};
