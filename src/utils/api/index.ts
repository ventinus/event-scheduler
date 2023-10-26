import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { GraphQLOptions } from "@aws-amplify/api-graphql";
import {
  CreateProfileInput,
  CreateProfileMutation,
  DeleteEventInput,
  EventStatus,
  EventsByDateQuery,
  GetProfileQuery,
  ListEventsQuery,
  ModelEventFilterInput,
  UpdateEventInput,
  UpdateProfileInput,
  UpdateProfileMutation,
} from "../../API";
import { getProfile } from "../../graphql/queries";
import {
  vanillaEventsByDate,
  vanillaListEvents,
} from "../../graphql/customQueries";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  createProfile,
  updateProfile,
} from "../../graphql/mutations";
import { CreateEventInput, Event } from "../../API";

const eventsRangeFilter = (
  startDate?: string,
  endDate?: string
): ModelEventFilterInput => {
  let filter = {} as ModelEventFilterInput;
  if (startDate || endDate) filter.and = [];
  if (startDate) filter.and?.push({ date: { ge: startDate } });
  if (endDate) filter.and?.push({ date: { le: endDate } });
  return filter;
};

const approvedAndPendingFilter = {
  or: [EventStatus.APPROVED, EventStatus.PENDING].map((status) => ({
    status: { eq: status },
  })),
};

export const fetchEvents = async ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}): Promise<Event[]> => {
  const eventsData = await API.graphql<GraphQLQuery<ListEventsQuery>>({
    query: vanillaListEvents,
    variables: {
      filter: eventsRangeFilter(startDate, endDate),
    },
    authMode: "API_KEY",
  });
  return (eventsData.data?.listEvents?.items || []) as Event[];
};

export const fetchCalendarEvents = async ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}): Promise<Event[]> => {
  const eventsData = await API.graphql<GraphQLQuery<ListEventsQuery>>({
    query: vanillaListEvents,
    variables: {
      filter: Object.assign(
        {},
        approvedAndPendingFilter,
        eventsRangeFilter(startDate, endDate)
      ),
    },
    authMode: "API_KEY",
  });
  return (eventsData.data?.listEvents?.items || []) as Event[];
};

export const fetchEvent = async (dateStr: string): Promise<Event> => {
  const data = await API.graphql<GraphQLQuery<EventsByDateQuery>>({
    query: vanillaEventsByDate,
    variables: {
      date: dateStr,
      filter: approvedAndPendingFilter,
    },
    authMode: "API_KEY",
  });
  const events = (data.data?.eventsByDate?.items as Event[]) || [];
  return events[0];
};

export const createEventRequest = (input: CreateEventInput) => {
  return API.graphql({
    query: createEvent,
    variables: {
      input: { ...input, status: EventStatus.PENDING },
    },
  });
};

export const updateEventRequest = (input: UpdateEventInput) => {
  return API.graphql({
    query: updateEvent,
    variables: { input },
  });
};

export const destroyEventRequest = (input: DeleteEventInput) => {
  return API.graphql({
    query: deleteEvent,
    variables: { input },
  });
};

export const fetchProfile = async (
  id: string,
  opts?: { query: GraphQLOptions["query"] }
): Promise<GetProfileQuery["getProfile"]> => {
  const query = opts?.query ?? getProfile;
  const response = await API.graphql<GraphQLQuery<GetProfileQuery>>({
    query,
    variables: { id },
  });
  return response?.data?.getProfile;
};

export const createProfileRequest = (input: CreateProfileInput) => {
  return API.graphql<GraphQLQuery<CreateProfileMutation>>({
    query: createProfile,
    variables: { input },
  });
};

export const updateProfileRequest = (input: UpdateProfileInput) => {
  return API.graphql<GraphQLQuery<UpdateProfileMutation>>({
    query: updateProfile,
    variables: { input },
  });
};
