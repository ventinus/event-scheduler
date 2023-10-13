import { API, graphqlOperation } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import {
  CreateProfileInput,
  CreateProfileMutation,
  DeleteEventInput,
  EventsByDateQuery,
  GetProfileQuery,
  ListEventsQuery,
  UpdateEventInput,
  UpdateProfileInput,
  UpdateProfileMutation,
} from "../../API";
import { eventsByDate, getProfile } from "../../graphql/queries";
import { vanillaListEvents } from "../../graphql/customQueries";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  createProfile,
  updateProfile,
} from "../../graphql/mutations";
import { CreateEventInput, Event } from "../../API";

export const fetchEvents = async ({
  startDate,
  endDate,
}: {
  startDate?: String;
  endDate?: String;
}): Promise<Event[] | undefined> => {
  try {
    const eventsData = await API.graphql<GraphQLQuery<ListEventsQuery>>(
      graphqlOperation(vanillaListEvents, {}) // TODO: add variables
    );
    return (eventsData.data?.listEvents?.items || []) as Event[];
  } catch (err) {
    console.log("error fetching events", err);
  }
};

export const fetchEvent = async (
  dateStr: string
): Promise<Event | undefined> => {
  try {
    const data = await API.graphql<GraphQLQuery<EventsByDateQuery>>(
      graphqlOperation(eventsByDate, { date: dateStr })
    );
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
        input: { ...input, status: "PENDING" },
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
  id: string
): Promise<GetProfileQuery["getProfile"]> => {
  try {
    const response = await API.graphql<GraphQLQuery<GetProfileQuery>>({
      query: getProfile,
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
