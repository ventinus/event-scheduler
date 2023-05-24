import React, { useEffect, useState, useRef } from "react";
import { Form } from "react-router-dom";
import {
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Typography,
} from "@mui/material";

import { paths } from "../utils/routes";
import { Event } from "../API";

const styles = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface EventModalProps {
  onClose: () => void;
  date: string;
  event?: Event;
}

function EventModal({ onClose, date, event }: EventModalProps) {
  const isOpen = date.length > 0;
  const isNewEvent = !event;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="event-modal-title"
      aria-describedby="event-modal-description"
    >
      <Box sx={styles}>
        <Typography variant="h6" id="event-modal-title">
          Submit Request
        </Typography>
        <Typography variant="body2" id="event-modal-description">
          Interested in performing? Submit a request to perform this date.
        </Typography>
        <Form
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
            />
          </FormControl>

          <input type="hidden" name="date" value={date} />
          <FormControl margin="normal" fullWidth disabled>
            <InputLabel htmlFor="date">Date</InputLabel>
            <Input id="date" type="date" value={date} />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              name="description"
              type="text"
              defaultValue={event?.description}
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="image" shrink>
              Photo URL
            </InputLabel>
            <Input
              id="image"
              name="image"
              type="file"
              defaultValue={event?.image}
            />
          </FormControl>

          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      </Box>
    </Modal>
  );
}

export default EventModal;
