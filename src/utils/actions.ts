import { ActionFunctionArgs, redirect } from "react-router-dom";
import {
  updateEventRequest,
  createEventRequest,
  destroyEventRequest,
  updateProfileRequest,
} from "./api";
import { CreateEventInput, EventStatus, UpdateProfileInput } from "../API";
import { paths } from "./routes";

const extractFormData = (data: FormData, keys: string[]) =>
  keys.reduce((acc, cur) => ({ ...acc, [cur]: data.get(cur) }), {});

const extractEventFormData = (data: FormData) =>
  extractFormData(data, [
    "title",
    "description",
    "image",
    "date",
  ]) as CreateEventInput;

const extractProfileFormData = (data: FormData) =>
  extractFormData(data, ["name", "description", "image"]) as UpdateProfileInput;

export const createEvent =
  (profileEventsId: string) =>
  async ({ request }: ActionFunctionArgs) => {
    const event = extractEventFormData(await request.formData());
    await createEventRequest({ ...event, profileEventsId });
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
  const status = data.get("status") as EventStatus;
  updateEventRequest({ id, status });
  const target =
    status === EventStatus.APPROVED
      ? paths.eventApproved()
      : paths.eventRejected();
  return redirect(target);
};

export const updateProfile =
  (id: string) =>
  async ({ request }: ActionFunctionArgs) => {
    const profile = extractProfileFormData(await request.formData());
    await updateProfileRequest({ ...profile, id });
    return redirect(paths.profileUpdated());
  };
