import { API, graphqlOperation } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import {
  DeleteEventInput,
  EventsByDateQuery,
  ListEventsQuery,
  UpdateEventInput,
} from "../../API";
import { eventsByDate, listEvents } from "../../graphql/queries";
import { createEvent, updateEvent, deleteEvent } from "../../graphql/mutations";
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
        input: { ...input, status: "pending" },
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
