import { API, graphqlOperation } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { ListEventsQuery } from "../../API";
import { listEvents } from "../../graphql/queries";
import { createEvent } from "../../graphql/mutations";
// import { NewEventParams, Event } from "./types";
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
      graphqlOperation(listEvents, {}) // TODO: add variables
    );
    return (eventsData.data?.listEvents?.items || []) as Event[];
  } catch (err) {
    console.log("error fetching events", err);
  }
};

export const saveNewEvent = async (input: CreateEventInput) => {
  try {
    // TODO: save image to Storage
    return await API.graphql({
      query: createEvent,
      variables: { input: { ...input, status: "pending" } },
    });
  } catch (err) {
    console.log("error creating an event", err);
  }
};

export const updateEvent = async (eventId?: string, data?: any) => {
  if (!eventId || !data) {
    throw new Error(
      `gotta provide an event id and data to update an event id: ${eventId}, data: ${JSON.stringify(
        data
      )}`
    );
  }
  console.log("updateEvent", eventId, data);
  return { eventId, ...data, status: "pending" };
};
