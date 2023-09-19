import { Fragment, useEffect, useState } from "react";
import { withManagerAccess } from "../utils/withManagerAccess";

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
import { Event } from "../API";
import { getStorageObject } from "../utils/fileUtils";

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
    display: 'block',
    mx: 'auto',
    mb: 2
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
  const { event } = useLoaderData() as { event: Event };
  console.log(event?.image?.length ? event : null);

  const fetcher = useFetcher();
  const navigate = useNavigate();
  const location = useLocation();
  const target = location.state?.previousLocation || paths.events();
  const [imgSrc, imgSrcSet] = useState<string>("");

  const onClose = () => navigate(target);

  useEffect(() => {
    getStorageObject({
      dateStr: event.date,
      fileName: event.image as string,
    }).then(imgSrcSet);
  }, [event]);

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
          Interested in performing? Submit a request to perform this date.
        </Typography>
        <dl>
          {eventToDescriptionList(event).map(({ label, value }) => (
            <Fragment key={label}>
              <dt>{label}:</dt>
              <dd>{value}</dd>
            </Fragment>
          ))}
        </dl>
        <img src={imgSrc} />
        <Box
          sx={{
            textAlign: "right",
            "& > *": { display: "inline-block" },
            "& > * + *": {
              ml: (theme: Theme) => `${theme.spacing(2)} !important`,
            },
          }}
        >
          <fetcher.Form method="post" action={paths.reviewEvent(event.id)}>
            <input type="hidden" name="status" value="rejected" />
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
          <fetcher.Form method="post" action={paths.reviewEvent(event.id)}>
            <input type="hidden" name="status" value="approved" />
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

export default withManagerAccess(ReviewEventModal);
