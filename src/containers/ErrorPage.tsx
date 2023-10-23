import { Box, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as any; // official return type is `unknown`
  console.error(error);
  const errorMessage = error.statusText || error.message;
  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h2">Ope!</Typography>
      <Typography variant="body1">
        Sorry, an unexpected error has occurred, please try again later.
      </Typography>
      {errorMessage ? (
        <Typography variant="body2">{errorMessage}</Typography>
      ) : null}
    </Box>
  );
}

export default ErrorPage;
