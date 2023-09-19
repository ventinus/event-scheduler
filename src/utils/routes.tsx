import { RouteObject } from "react-router-dom";
import {
  Root,
  ErrorPage,
  EventsPage,
  AlertRoute,
  ProfilePage,
} from "../containers";
import { eventAlertVariants } from "../containers/AlertRoute";
import { EventModal, ReviewEventModal } from "../components";
import { eventLoader, eventsLoader } from "./loaders";
import { createEvent, updateEvent, reviewEvent, destroyEvent } from "./actions";

export const paths = {
  home: () => "/",
  profile: () => "/profile",
  events: () => "/events",
  eventRequested: () => "/events/requested",
  eventUpdated: () => "/events/updated",
  eventDestroyed: () => "/events/destroyed",
  eventApproved: () => "/events/approved",
  eventRejected: () => "/events/rejected",
  newEvent: () => "/events/new",
  eventDetail: (dateStr = ":dateStr") => `/events/${dateStr}/detail`,
  updateEvent: (eventId = ":eventId") => `/events/${eventId}/update`,
  reviewEvent: (dateStr = ":dateStr") => `/events/${dateStr}/review`,
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
            // loader: fromStorageLoader("new-event.{{date}}"),
            // element: <EventModal />,
          },
          ...eventAlertVariants.map((variant) => ({
            path: variant,
            element: (
              <AlertRoute target={paths.events() as string} variant={variant} />
            ),
          })),
          {
            path: ":dateStr/detail",
            loader: eventLoader,
            action: createEvent,
            element: <EventModal />,
          },
          {
            path: ":dateStr/review",
            loader: eventLoader,
            action: reviewEvent,
            element: <ReviewEventModal />,
          },
          {
            path: ":eventId/update",
            action: updateEvent,
          },
          {
            path: ":eventId/destroy",
            action: destroyEvent,
          },
        ],
      },
      {
        path: 'profile',
        element: <ProfilePage />
      }
    ],
  },
];
