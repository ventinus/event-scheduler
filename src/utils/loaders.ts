import { fetchEvents } from "./api/index";

// const wait = () => new Promise((res) => setTimeout(res, 10000));

export async function eventsLoader() {
  const events = await fetchEvents({});
  return { events };
}
