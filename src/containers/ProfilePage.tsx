import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { Form, Outlet, useLoaderData } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { Event, Profile } from "../API";
import { ImageUpload } from "../components/ImageUpload/ImageUpload";
import EventCardList from "../components/EventCardList";

const underline = { textDecoration: "underline" };

function groupEvents(events: Event[]) {
  const today = new Date().toISOString().split("T")[0];
  return events.reduce(
    (acc, cur) => {
      if (cur.date >= today) {
        acc.upcoming.push(cur);
      } else {
        acc.past.push(cur);
      }
      return acc;
    },
    { past: [], upcoming: [] } as { past: Event[]; upcoming: Event[] }
  );
}

function ProfilePage() {
  const { profile } = useLoaderData() as { profile: Profile };
  const events = (profile.events?.items ?? []) as Event[];

  const { past: pastEvents, upcoming: upcomingEvents } = groupEvents(events);
  console.log("events", upcomingEvents);

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" sx={underline}>
        Profile
      </Typography>

      <Form method="post">
        <Box sx={{ width: "50%" }}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={profile.name}
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              name="description"
              placeholder="Description"
              defaultValue={profile.description ?? undefined}
              type="text"
            />
          </FormControl>
        </Box>

        <ImageUpload
          id="profile-image"
          name="image"
          dateStr={profile.id}
          fileName={profile.image}
        />
        <Box sx={{ textAlign: "right" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Save changes
          </Button>
        </Box>
      </Form>

      <Divider sx={{ my: 3 }} />

      <Stack direction="column" spacing={3}>
        <EventCardList type="upcoming" events={upcomingEvents} />
        <EventCardList type="past" events={pastEvents} />
      </Stack>
      <Outlet />
    </Box>
  );
}

export default withAuthenticator(ProfilePage);
