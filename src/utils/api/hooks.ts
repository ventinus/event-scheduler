import { useQuery } from "@tanstack/react-query";
import { fetchCalendarEvents } from ".";

interface ListEventsParams {
  startDate?: string;
  endDate?: string;
}

export const listEventsQuery = ({ startDate, endDate }: ListEventsParams) => ({
  queryKey: ["list-events", startDate, endDate],
  queryFn: () => fetchCalendarEvents({ startDate, endDate }),
});

export const useListEvents = (params: ListEventsParams) => {
  return useQuery(listEventsQuery(params));
};
