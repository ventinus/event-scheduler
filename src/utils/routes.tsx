import { RouteObject } from "react-router-dom";
import { Root, ErrorPage, EventsPage, ReviewEventPage } from "../containers";
import { eventsLoader } from "./loaders";
import { createEvent, updateEvent, reviewEvent } from "./actions";

export const paths = {
  home: () => "/",
  events: () => "/events",
  newEvent: () => "/events/new",
  updateEvent: (eventId = ":eventId") => `/events/${eventId}/update`,
  reviewEvent: (eventId = ":eventId") => `/events/${eventId}/review`,
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "events",
        loader: eventsLoader,
        element: <EventsPage />,
        children: [
          {
            path: "new",
            action: createEvent,
          },
          {
            path: ":eventId/update",
            action: updateEvent,
          },
        ],
      },
      {
        path: "events/:eventId/review",
        element: <ReviewEventPage />,
        action: reviewEvent,
      },
    ],
  },
];
