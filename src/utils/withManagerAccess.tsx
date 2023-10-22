import React from "react";
import { Typography } from "@mui/material";
import { Unauthorized } from "../components";
import { useUser } from "./userCtx";

export const withManagerAccess =
  (Component: React.FunctionComponent): React.FunctionComponent =>
  (props: any) => {
    const isManager = useUser();

    // TODO: use a loading spinner
    if (isManager === undefined)
      return <Typography>checking for access</Typography>;

    return isManager ? <Component {...props} /> : <Unauthorized />;
  };
