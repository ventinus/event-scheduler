import { Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as any; // official return type is `unknown`
  console.error(error);
  return (
    <>
      <Typography variant="h1">Opps!</Typography>
      <Typography variant="body1">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body2">
        {error.statusText || error.message}
      </Typography>
    </>
  );
}

export default ErrorPage;
