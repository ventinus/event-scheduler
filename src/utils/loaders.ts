import { fetchEvents, fetchEvent } from "./api/index";

// const wait = () => new Promise((res) => setTimeout(res, 10000));

export async function eventsLoader() {
  const events = await fetchEvents({});
  return { events };
}

export async function eventLoader({ params }: any) {
  const event = await fetchEvent(params.dateStr);
  return { event };
}

export function fromStorageLoader(key: string) {
  return function () {
    const prevData = window.localStorage.getItem(key);
    return prevData || {};
  };
}
