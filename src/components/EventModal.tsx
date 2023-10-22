import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Modal,
  FormControl,
  InputLabel,
  Input,
  Box,
  Typography,
  IconButton,
  Theme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";

import { paths } from "../utils/routes";
import { Event } from "../API";
import { ImageUpload } from "./ImageUpload/ImageUpload";
import { useUser } from "../utils/userCtx";
import EventImg from "./EventImg";

const styles = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EventModal() {
  const { isSignedIn, username } = useUser();
  const { event } = useLoaderData() as { event: Event };
  const isNewEvent = !event;

  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { dateStr } = useParams();
  const location = useLocation();
  const target = location.state?.previousLocation || paths.events();

  const isEventOwner = isNewEvent || username === event?.owner;

  const onClose = () => navigate(target);
  const onWithdrawClick = () => {
    // TODO: add a confirm dialog
    fetcher.submit(
      {},
      { method: "post", action: `/events/${event.id}/destroy` }
    );
  };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="event-modal-title"
      aria-describedby="event-modal-description"
    >
      <Box sx={styles}>
        <Typography variant="h6" id="event-modal-title">
          Event
        </Typography>
        {isNewEvent ? (
          <Typography variant="body2" id="event-modal-description">
            Interested in performing? Submit a request to perform this date.
          </Typography>
        ) : null}
        <fetcher.Form
          method="post"
          action={isNewEvent ? paths.newEvent() : paths.updateEvent(event.id)}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              name="title"
              type="text"
              defaultValue={event?.title}
              readOnly={!isEventOwner}
            />
          </FormControl>

          <input type="hidden" name="date" value={dateStr} />
          <FormControl margin="normal" fullWidth disabled>
            <InputLabel htmlFor="date">Date</InputLabel>
            <Input id="date" type="date" value={dateStr} />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              name="description"
              type="text"
              defaultValue={event?.description}
              readOnly={!isEventOwner}
            />
          </FormControl>

          {isEventOwner ? (
            <ImageUpload
              id="event-image"
              name="image"
              dateStr={dateStr as string}
              fileName={event?.image}
            />
          ) : (
            <EventImg image={event?.image} date={event?.date} />
          )}

          {isSignedIn ? (
            <Box
              sx={{
                textAlign: "right",
                "& > * + *": {
                  ml: (theme: Theme) => `${theme.spacing(2)} !important`,
                },
              }}
            >
              {!isNewEvent ? (
                <LoadingButton
                  color="error"
                  variant="outlined"
                  onClick={onWithdrawClick}
                >
                  Withdraw
                </LoadingButton>
              ) : null}
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                loading={fetcher.state === "submitting"}
              >
                {isNewEvent ? "Create" : "Update"}
              </LoadingButton>
            </Box>
          ) : null}
        </fetcher.Form>
        <IconButton
          aria-label="close"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
}

export default EventModal;
