import { useMemo } from "react";
import { useTheme, Container } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";

import {
  useLoaderData,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import type { Event } from "../API";
import { paths } from "../utils/routes";
import { useUser } from "../utils/userCtx";

function EventsPage() {
  const { events } = useLoaderData() as { events: Event[] };
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const user = useUser();

  const cachedEvents = useMemo(
    () =>
      events.map((ev) => ({
        ...ev,
        color:
          ev.status === "approved"
            ? theme.palette.success.main
            : theme.palette.info.main,
      })),
    [events, theme]
  );

  const goto = (dateStr: string) => {
    const dateHasEvent = Boolean(events.find(({ date }) => date === dateStr));
    const target =
      user.isManager && dateHasEvent
        ? paths.reviewEvent(dateStr)
        : paths.eventDetail(dateStr);
    navigate(target, {
      state: { previousLocation: location },
    });
  };

  const handleDateClick = ({ dateStr }: any) => goto(dateStr);

  const handleEventClick = ({ event }: any) => {
    const dateStr = event.start.toISOString().split("T")[0];
    goto(dateStr);
  };

  return (
    <Container maxWidth="xl">
      <h2>Mendelssohn's Event Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        timeZone="PST"
        events={cachedEvents}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      <Outlet />
    </Container>
  );
}

export default EventsPage;
