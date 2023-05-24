import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";

import { useLoaderData } from "react-router-dom";
import { EventModal } from "../components";
import type { Event } from "../API";

function EventsPage() {
  const { events } = useLoaderData() as { events: Event[] };

  const [eventModalProps, eventModalPropsSet] = useState<{
    date: string;
    event?: Event;
  }>({
    date: "",
    event: undefined,
  });

  const findAndSetEvent = (dateStr: string) => {
    const event = events.find(({ date }) => date === dateStr);
    eventModalPropsSet({
      event,
      date: dateStr,
    });
  };

  const handleDateClick = ({ dateStr }: any) => findAndSetEvent(dateStr);

  const handleEventClick = ({ event }: any) => {
    const dateStr = event.start.toISOString().split("T")[0];
    findAndSetEvent(dateStr);
  };

  const handleClose = () => eventModalPropsSet({ date: "", event: undefined });

  return (
    <div>
      <h2>Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        timeZone="PST"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      <EventModal {...eventModalProps} onClose={handleClose} />
    </div>
  );
}

export default EventsPage;
