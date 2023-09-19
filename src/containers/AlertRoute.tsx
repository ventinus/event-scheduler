import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../utils/alertCtx";

type AlertVariant =
  | "requested"
  | "updated"
  | "destroyed"
  | "approved"
  | "rejected";

export const eventAlertVariants: AlertVariant[] = [
  "requested",
  "updated",
  "destroyed",
  "approved",
  "rejected",
];

const messages: Record<AlertVariant, string> = {
  requested:
    "You're request has been submitted successfully, we will get back to you shortly.",
  updated: "Updates have been applied successfully",
  destroyed: "Event has been cancelled, we're sorry to see you go!",
  approved: "Event has been approved!",
  rejected: "Event has been rejected",
};

function AlertRoute({
  variant,
  target,
}: {
  variant: AlertVariant;
  target: string;
}) {
  const { setSuccess } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    setSuccess(messages[variant]);
    navigate(target, { replace: true });
  }, [navigate, setSuccess, target, variant]);

  return null;
}

export default AlertRoute;
