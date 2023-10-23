import React from "react";
import { CircularProgress, Box } from "@mui/material";
import { Unauthorized } from "../components";
import { useUser } from "./userCtx";

export const withManagerAccess =
  (Component: React.FunctionComponent): React.FunctionComponent =>
  (props: any) => {
    const isManager = useUser();

    if (isManager === undefined) {
      return (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    return isManager ? <Component {...props} /> : <Unauthorized />;
  };
