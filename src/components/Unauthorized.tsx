import { useLocation, useNavigate } from "react-router";
import NotificationModal from "./NotificationModal";
import { paths } from "../utils/routes";

function Unauthorized({ message }: { message?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const target = location.state?.previousLocation || paths.events();
  return (
    <NotificationModal
      title="Unauthorized"
      message={message ?? "You do not have access to this resource"}
      onClose={() => navigate(target)}
    />
  );
}

export default Unauthorized;
