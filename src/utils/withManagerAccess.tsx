import React from "react";
import { Box } from "@mui/material";
import { Unauthorized } from "../components";
import { useUser } from "./userCtx";

export const withManagerAccess =
  (Component: React.FunctionComponent): React.FunctionComponent =>
  (props: any) => {
    const isManager = useUser();

    if (isManager === undefined) return <Box>checking for access</Box>;

    return isManager ? <Component {...props} /> : <Unauthorized />;
  };
