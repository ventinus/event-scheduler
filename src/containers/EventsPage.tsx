import { useMemo } from "react";
import { useTheme, Container } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  useLoaderData,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { EventStatus, type Event } from "../API";
import { paths } from "../utils/routes";
import { useUser } from "../utils/userCtx";

function EventsPage() {
  const { events } = useLoaderData() as { events: Event[] };
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { isManager, isSignedIn } = useUser();

  const cachedEvents = useMemo(
    () =>
      events.map((ev) => ({
        ...ev,
        color:
          ev.status === EventStatus.APPROVED
            ? theme.palette.success.main
            : theme.palette.info.main,
      })),
    [events, theme]
  );

  const goto = (dateStr: string) => {
    const dateHasEvent = Boolean(events.find(({ date }) => date === dateStr));
    let target = "";
    if (dateHasEvent) {
      target = isManager
        ? paths.reviewEvent(dateStr)
        : paths.eventDetail(dateStr);
    } else if (isSignedIn) {
      target = paths.eventDetail(dateStr);
    }

    if (target.length) {
      navigate(target, {
        state: { previousLocation: location },
      });
    }
  };

  const handleDateClick = ({ dateStr }: any) => goto(dateStr);

  const handleEventClick = ({ event }: any) => {
    const dateStr = event.start.toISOString().split("T")[0];
    goto(dateStr);
  };

  const handleMonthChange = ({ startStr, endStr }: any) => {
    console.log("month change", startStr, endStr);
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
        datesSet={handleMonthChange}
      />
      <Outlet />
    </Container>
  );
}

export default EventsPage;
