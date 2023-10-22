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
  if (endDate) filter.and?.push({ date: { le: startDate } });
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
}): Promise<Event[] | undefined> => {
  try {
    const eventsData = await API.graphql<GraphQLQuery<ListEventsQuery>>({
      query: vanillaListEvents,
      variables: {
        filter: eventsRangeFilter(startDate, endDate),
      },
      authMode: "API_KEY",
    });
    return (eventsData.data?.listEvents?.items || []) as Event[];
  } catch (err) {
    console.log("error fetching events", err);
  }
};

export const fetchCalendarEvents = async ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}): Promise<Event[] | undefined> => {
  try {
    const eventsData = await API.graphql<GraphQLQuery<ListEventsQuery>>({
      query: vanillaListEvents,
      variables: {
        filter: Object.assign(
          approvedAndPendingFilter,
          eventsRangeFilter(startDate, endDate)
        ),
      },
      authMode: "API_KEY",
    });
    return (eventsData.data?.listEvents?.items || []) as Event[];
  } catch (err) {
    console.log("error fetching events", err);
  }
};

export const fetchEvent = async (
  dateStr: string
): Promise<Event | undefined> => {
  try {
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
  } catch (err) {
    console.log(`error fetching event with id ${dateStr}`, err);
  }
};

export const createEventRequest = async (input: CreateEventInput) => {
  try {
    return await API.graphql({
      query: createEvent,
      variables: {
        input: { ...input, status: EventStatus.PENDING },
      },
    });
  } catch (err) {
    console.log("error creating an event", err);
  }
};

export const updateEventRequest = async (input: UpdateEventInput) => {
  // if (!eventId || !data) {
  //   throw new Error(
  //     `eventId and data required to update an event id: ${eventId}, data: ${JSON.stringify(
  //       data
  //     )}`
  //   );
  // }
  try {
    return await API.graphql({
      query: updateEvent,
      variables: { input },
    });
  } catch (err) {
    console.log("error updating an event", err);
  }
};

export const destroyEventRequest = async (input: DeleteEventInput) => {
  try {
    return await API.graphql({
      query: deleteEvent,
      variables: { input },
    });
  } catch (err) {
    console.log("error destroying an event", err);
  }
};

export const fetchProfile = async (
  id: string,
  opts?: { query: GraphQLOptions["query"] }
): Promise<GetProfileQuery["getProfile"]> => {
  const query = opts?.query ?? getProfile;
  try {
    const response = await API.graphql<GraphQLQuery<GetProfileQuery>>({
      query,
      variables: { id },
    });
    return response?.data?.getProfile;
  } catch (err) {
    console.log(`error getting profile for id ${id}`, err);
  }
};

export const createProfileRequest = async (input: CreateProfileInput) => {
  try {
    return await API.graphql<GraphQLQuery<CreateProfileMutation>>({
      query: createProfile,
      variables: { input },
    });
  } catch (err) {
    console.log("error creating profile", err);
  }
};

export const updateProfileRequest = async (input: UpdateProfileInput) => {
  try {
    return await API.graphql<GraphQLQuery<UpdateProfileMutation>>({
      query: updateProfile,
      variables: { input },
    });
  } catch (err) {
    console.log("error updating profile", err);
  }
};
