import { ActionFunctionArgs, redirect } from "react-router-dom";
import {
  updateEventRequest,
  createEventRequest,
  destroyEventRequest,
} from "./api";
import { CreateEventInput } from "../API";
import { paths } from "./routes";

const extractEventFormData = (data: FormData): CreateEventInput => {
  return ["title", "description", "image", "date"].reduce(
    (acc, cur) => ({ ...acc, [cur]: data.get(cur) }),
    {}
  ) as CreateEventInput;
};

export const createEvent = async ({ request }: ActionFunctionArgs) => {
  const event = extractEventFormData(await request.formData());
  await createEventRequest(event);
  return redirect(paths.eventRequested());
};

export const updateEvent = async ({ params, request }: ActionFunctionArgs) => {
  const event = extractEventFormData(await request.formData());
  await updateEventRequest({ ...event, id: params.eventId as string });
  return redirect(paths.eventUpdated());
};

export const destroyEvent = async ({ params }: ActionFunctionArgs) => {
  await destroyEventRequest({ id: params.eventId as string });
  return redirect(paths.eventDestroyed());
};

export const reviewEvent = async ({ params, request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const id = params.dateStr as string;
  const status = data.get("status") as string;
  updateEventRequest({ id, status });
  const target =
    status === "approved" ? paths.eventApproved() : paths.eventRejected();
  return redirect(target);
};
