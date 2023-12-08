import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  if (notification === null) {
    return null;
  }

  if (notification.includes("error")) {
    return (
      <Alert severity="error" className="error">
        {notification}
      </Alert>
    );
  }
  return (
    <Alert severity="success" className="added">
      {notification}
    </Alert>
  );
};

export default Notification;
