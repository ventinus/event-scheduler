import { useQuery } from "@tanstack/react-query";
import { fetchCalendarEvents } from ".";

export const useListEvents = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: ["list-events", startDate, endDate],
    queryFn: () => fetchCalendarEvents({ startDate, endDate }),
  });
};
