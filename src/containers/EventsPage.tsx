import { useState, useMemo } from "react";
import { useTheme, Container } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { EventStatus } from "../API";
import { paths } from "../utils/routes";
import { useUser } from "../utils/userCtx";
import { useListEvents } from "../utils/api/hooks";
import {
  dateIsInFuture,
  dateIsInNearFuture,
  isoToDate,
} from "../utils/dateUtils";

function EventsPage() {
  const [dateRange, dateRangeSet] = useState({ startDate: "", endDate: "" });
  const { data: events = [] } = useListEvents(dateRange);
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
    } else if (isSignedIn && dateIsInNearFuture(dateStr)) {
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
    const dateStr = isoToDate(event.start.toISOString());
    goto(dateStr);
  };

  const handleMonthChange = ({ startStr, endStr }: any) => {
    dateRangeSet({
      startDate: isoToDate(startStr),
      endDate: isoToDate(endStr),
    });
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
