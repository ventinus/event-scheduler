import { Form, useFetcher } from "react-router-dom";
import {
  Button,
  Modal,
  FormControl,
  InputLabel,
  Input,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";

interface NotificationModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

function NotificationModal({
  title,
  message,
  onClose,
}: NotificationModalProps) {
  return (
    <Modal
      open
      aria-labelledby="notification-modal-title"
      aria-describedby="notification-modal-description"
      onClose={onClose}
    >
      <Box>
        <Typography variant="h6" id="notification-modal-title">
          {title}
        </Typography>
        <Typography variant="body2" id="notification-modal-description">
          {message}
        </Typography>
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
