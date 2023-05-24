import type { ActionFunctionArgs } from "react-router-dom";
import { updateEvent as modifyEvent, saveNewEvent } from "./api";
import { CreateEventInput } from "../API";

const extractEventFormData = (data: FormData): CreateEventInput => {
  return ["title", "description", "image", "date"].reduce(
    (acc, cur) => ({ ...acc, [cur]: data.get(cur) }),
    {}
  ) as CreateEventInput;
};

export const createEvent = async ({ request }: ActionFunctionArgs) => {
  const event = extractEventFormData(await request.formData());
  return saveNewEvent(event);
};

export const updateEvent = async ({ params, request }: ActionFunctionArgs) => {
  const event = extractEventFormData(await request.formData());
  return modifyEvent(params.eventId, event);
};

export const reviewEvent = async ({ params, request }: ActionFunctionArgs) => {
  let data = await request.formData();
  const status = data.get("status");
  return modifyEvent(params.eventId, { status });
};
