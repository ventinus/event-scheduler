import {
  Navigate,
  Route,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
} from "react-router-dom";
import {
  Root,
  ErrorPage,
  EventsPage,
  AlertRoute,
  ProfilePage,
} from "../containers";
import { eventAlertVariants } from "../containers/AlertRoute";
import { EventModal, ReviewEventModal } from "../components";
import { eventLoader, eventsLoader, profileLoader } from "./loaders";
import {
  createEvent,
  updateEvent,
  reviewEvent,
  destroyEvent,
  updateProfile,
} from "./actions";
import { useUser } from "./userCtx";
import { Typography } from "@mui/material";

export const paths = {
  home: () => "/",
  profile: () => "/profile",
  updateProfile: () => "/profile/update",
  profileUpdated: () => "/profile/updated",
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

export const routes: RouteObject[] = [];

export const AppRouter = () => {
  const { id } = useUser();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Navigate to={paths.events()} replace />} />
        <Route
          path="signout"
          element={<Navigate to={paths.events()} replace />}
        />
        <Route
          path="events"
          loader={eventsLoader}
          element={<EventsPage />}
          errorElement={<ErrorPage />}
        >
          <Route path="new" action={createEvent(id)} />
          {eventAlertVariants.map((variant) => (
            <Route
              path={variant}
              key={variant}
              element={
                <AlertRoute
                  target={paths.events() as string}
                  variant={variant}
                />
              }
            />
          ))}
          <Route
            path=":dateStr/detail"
            loader={eventLoader}
            action={createEvent(id)}
            element={<EventModal />}
          />
          <Route
            path=":dateStr/review"
            loader={eventLoader}
            action={reviewEvent}
            element={<ReviewEventModal />}
          />
          <Route path=":eventId/update" action={updateEvent} />
          <Route path=":eventId/destroy" action={destroyEvent} />
        </Route>
        <Route
          path="profile"
          loader={profileLoader(id)}
          element={<ProfilePage />}
          action={updateProfile(id)}
        >
          <Route
            path="updated"
            element={<AlertRoute target={paths.profile()} variant="updated" />}
          />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
