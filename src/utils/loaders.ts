import { LoaderFunctionArgs } from "react-router-dom";
import { retry } from "@lifeomic/attempt";

import { fetchCalendarEvents, fetchEvent, fetchProfile } from "./api/index";
import { Profile } from "../API";

export async function eventsLoader() {
  const events = await fetchCalendarEvents({});
  return { events };
}

export async function eventLoader({ params }: LoaderFunctionArgs) {
  const event = await fetchEvent(params.dateStr as string);
  return { event };
}

export const profileLoader = (id?: string) => async () => {
  if (!id) return {};
  const profile = await retry(() => fetchProfile(id));
  return { profile } as { profile: Profile };
};

export function fromStorageLoader(key: string) {
  return function () {
    const prevData = window.localStorage.getItem(key);
    return prevData || {};
  };
}
