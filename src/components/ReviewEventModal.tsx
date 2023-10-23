import { Fragment } from "react";
import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Modal, Box, Typography, IconButton, Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";

import { paths } from "../utils/routes";
import { Event, EventStatus } from "../API";
import EventImg from "./EventImg";
import { useUser } from "../utils/userCtx";
import { dateIsInPast } from "../utils/dateUtils";
import { withManagerAccess } from "../utils/withManagerAccess";

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
  img: {
    maxWidth: "100%",
    maxHeight: "300px",
    display: "block",
    mx: "auto",
    mb: 2,
  },
};

const eventToDescriptionList = ({
  date,
  description,
  image,
  status,
  title,
}: Event) => [
  {
    label: "Title",
    value: title,
  },
  {
    label: "Date",
    value: date,
  },
  {
    label: "Description",
    value: description,
  },
  {
    label: "Status",
    value: status,
  },
  {
    label: "Image",
    value: image,
  },
];

function ReviewEventModal() {
  const { isManager } = useUser();
  const { event } = useLoaderData() as { event: Event };
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const location = useLocation();
  const target = location.state?.previousLocation || paths.events();
  const isEventInPast = dateIsInPast(event.date);

  const onClose = () => navigate(target);

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="review-event-modal-title"
      aria-describedby="review-event-modal-description"
    >
      <Box sx={styles}>
        <Typography variant="h6" id="review-event-modal-title">
          Review Request
        </Typography>
        <Typography variant="body2" id="review-event-modal-description">
          {!isManager
            ? "You do not have access to review events"
            : "Please approve or deny this request"}
        </Typography>
        {!isManager ? null : (
          <>
            <dl>
              {eventToDescriptionList(event).map(({ label, value }) => (
                <Fragment key={label}>
                  <dt>{label}:</dt>
                  <dd>{value}</dd>
                </Fragment>
              ))}
            </dl>
            <EventImg image={event.image} date={event.date} />
            {isEventInPast ? null : (
              <Box
                sx={{
                  textAlign: "right",
                  "& > *": { display: "inline-block" },
                  "& > * + *": {
                    ml: (theme: Theme) => `${theme.spacing(2)} !important`,
                  },
                }}
              >
                <fetcher.Form
                  method="post"
                  action={paths.reviewEvent(event.id)}
                >
                  <input
                    type="hidden"
                    name="status"
                    value={EventStatus.DENIED}
                  />
                  <LoadingButton
                    type="submit"
                    variant="outlined"
                    color="error"
                    disableElevation
                    loading={fetcher.state === "submitting"}
                  >
                    Deny
                  </LoadingButton>
                </fetcher.Form>
                <fetcher.Form
                  method="post"
                  action={paths.reviewEvent(event.id)}
                >
                  <input
                    type="hidden"
                    name="status"
                    value={EventStatus.APPROVED}
                  />
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                    loading={fetcher.state === "submitting"}
                  >
                    Approve
                  </LoadingButton>
                </fetcher.Form>
              </Box>
            )}
            <IconButton
              aria-label="close"
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default withManagerAccess(ReviewEventModal);
