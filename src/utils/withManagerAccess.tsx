import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Unauthorized } from "../components";
import { getUserGroups, isManager } from "./userUtils";
import { Box } from "@mui/material";

export const withManagerAccess =
  (Component: React.FunctionComponent): React.FunctionComponent =>
  (props: any) => {
    const [groups, groupsSet] = useState<string[] | undefined>();

    useEffect(() => {
      Auth.currentAuthenticatedUser().then((user) => {
        groupsSet(getUserGroups(user));
      });
    }, []);

    if (!groups) return <Box>checking for access</Box>;

    return isManager(groups) ? <Component {...props} /> : <Unauthorized />;
  };
