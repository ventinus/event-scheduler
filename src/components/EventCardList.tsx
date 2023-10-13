import {
  Card,
  Chip,
  Typography,
  Box,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import { Event, EventStatus } from "../API";
import EventImg from "./EventImg";

const messages = {
  past: {
    heading: "Past events",
    none: "No past events",
  },
  upcoming: {
    heading: "Upcoming events",
    none: "No upcoming events scheduled",
  },
};

const mapEventStatusToColor = (status: EventStatus) => {
  switch (status) {
    case "APPROVED":
      return "success";
    case "DENIED":
    case "CANCELLED":
      return "error";
    case "PENDING":
    default:
      return "info";
  }
};

function EventCardList({
  events,
  type,
}: {
  events: Event[];
  type: "past" | "upcoming";
}) {
  const { heading, none } = messages[type];
  return (
    <Box>
      <Typography variant="h4" sx={{ textDecoration: "underline", mb: 2 }}>
        {heading}
      </Typography>
      {events.length === 0 ? (
        <Typography variant="body2">{none}</Typography>
      ) : (
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card sx={{ p: 2 }}>
                <Stack
                  spacing={1.5}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Box sx={{ width: "30%" }}>
                    <EventImg image={event.image} date={event.date} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Chip
                      label={event.status}
                      color={mapEventStatusToColor(event.status)}
                    />
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2">{event.date}</Typography>

                    {event.description ? (
                      <>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2">
                          Description: {event.description}
                        </Typography>
                      </>
                    ) : null}
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default EventCardList;
