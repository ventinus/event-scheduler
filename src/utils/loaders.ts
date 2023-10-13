import { LoaderFunctionArgs } from "react-router-dom";
import { fetchEvents, fetchEvent, fetchProfile } from "./api/index";
import { Profile } from "../API";

// const wait = () => new Promise((res) => setTimeout(res, 10000));

export async function eventsLoader() {
  const events = await fetchEvents({});
  return { events };
}

export async function eventLoader({ params }: LoaderFunctionArgs) {
  const event = await fetchEvent(params.dateStr as string);
  return { event };
}

export const profileLoader = (id: string) => async () => {
  const profile = await fetchProfile(id);
  return { profile } as { profile: Profile };
};

export function fromStorageLoader(key: string) {
  return function () {
    const prevData = window.localStorage.getItem(key);
    return prevData || {};
  };
}
