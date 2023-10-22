import { useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface NotificationModalProps {
  title: string;
  message: string;
  onClose?: () => void;
}

export default function NotificationModal({
  title,
  message,
  onClose,
}: NotificationModalProps) {
  const [isOpen, isOpenSet] = useState(true);
  const onDismiss = () => {
    isOpenSet(false);
    if (onClose) onClose();
  };

  return (
    <Modal
      open={isOpen}
      aria-labelledby="notification-modal-title"
      aria-describedby="notification-modal-description"
      onClose={onDismiss}
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
          onClick={onDismiss}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
}
